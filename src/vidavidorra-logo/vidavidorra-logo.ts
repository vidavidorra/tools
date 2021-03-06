import { Points } from './points';
import { Tool } from '../tool';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';
import sharp from 'sharp';

const tool = new Tool(
  'vidavidorra-logo',
  'Create the vidavidorra logo as SVG.',
);

interface Options {
  outputDirectory: string;
  height: number;
  lineThickness: number;
  colour: string;
  pngHeight: number;
  pngFormat: 'rectangle' | 'square' | 'square-inscribed-circle';
}

/**
 * See the logo.md document in this directory for a simplified ASCII
 * representation and description of the logo. That document also contains the
 * calculations for the paths of the logo and the paths themselves. This class
 * simply follows those paths.
 */
export class VidavidorraLogo {
  private border = 1;
  private name = tool.name;

  private svgPathDataIndentation = 7;
  private svgTemplatePath = path.resolve(__dirname, `${this.name}.mustache`);
  private svg: string;

  private H: number; // Height.
  private T: number; // Line thickness.
  private PT: number; // Perpendicular distance of thickness.
  private HS: number; // Horizontal slice width.
  private VS: number; // Vertical slice height.

  private doubleVPoints: Points;
  private singleVPoints: Points;

  constructor(private options: Options) {
    this.H = this.options.height;
    this.T = this.options.lineThickness;
    this.PT = this.T / 2;
    this.HS = Math.sqrt(this.T ** 2 + (0.5 * this.T) ** 2);
    this.VS = this.HS * 2;

    this.doubleVPoints = new Points(
      [
        { name: 'point 1 (initial)', x: 0, y: 0 },
        { name: 'point 2', x: 0.5 * this.H, y: this.H },
        { name: 'point 3', x: this.H - this.PT, y: this.T },
        { name: 'point 4', x: this.H - this.PT + this.HS, y: this.T },
        { name: 'point 5', x: 0.5 * this.H + this.HS, y: this.H },
        { name: 'point 6', x: 0.5 * this.H + 2 * this.HS, y: this.H },
        { name: 'point 7', x: this.H + 2 * this.HS, y: 0 },
        { name: 'point 8', x: this.H - this.HS, y: 0 },
        { name: 'point 9', x: 0.5 * this.H, y: this.H - this.VS },
        { name: 'point 10', x: this.PT + this.HS, y: this.T },
        { name: 'point 11', x: this.PT + 4 * this.HS, y: this.T },
        { name: 'point 12', x: 0.5 * this.H, y: this.H - 4 * this.VS },
        {
          name: 'point 13',
          x: 0.5 * this.H + 0.25 * this.VS,
          y: this.H - 4.5 * this.VS,
        },
        { name: 'point 14', x: 5 * this.HS, y: 0 },
      ],
      this.border,
    );

    this.singleVPoints = new Points(
      [
        {
          name: 'point 1 (initial)',
          x: 2 * this.PT + 2 * this.HS,
          y: 2 * this.T,
        },
        { name: 'point 2', x: 0.5 * this.H, y: this.H - 2 * this.VS },
        { name: 'point 3', x: this.H - 2 * this.HS, y: 0 },
        { name: 'point 4', x: this.H - 3 * this.HS, y: 0 },
        { name: 'point 5', x: 0.5 * this.H, y: this.H - 3 * this.VS },
        { name: 'point 6', x: 2 * this.PT + 3 * this.HS, y: 2 * this.T },
      ],
      this.border,
    );
  }

  create(): Promise<void> {
    this.createSvg();

    return this.createPng();
  }

  private createSvg(): void {
    const view = {
      width: this.maximumWidth(),
      height: this.maximumHeight(),
      colour: this.options.colour,
      doubleVData: this.singleVPoints.toSvgPathData(
        this.svgPathDataIndentation,
      ),
      singleVData: this.doubleVPoints.toSvgPathData(
        this.svgPathDataIndentation,
      ),
    };

    const template = fs.readFileSync(this.svgTemplatePath, 'utf8');
    this.svg = mustache.render(template, view);

    fs.writeFileSync(
      path.join(this.options.outputDirectory, `${this.name}.svg`),
      this.svg,
    );
  }

  private createPng(): Promise<void> {
    const background: sharp.Color = { r: 0, g: 0, b: 0, alpha: 0 };
    const svgHeight = Math.ceil(this.maximumHeight());
    const resizeOptions: sharp.ResizeOptions = {
      height: this.options.pngHeight,
      background,
    };
    const extendOptions: sharp.ExtendOptions = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background,
    };

    if (
      this.options.pngFormat === 'square' ||
      this.options.pngFormat === 'square-inscribed-circle'
    ) {
      resizeOptions.width = this.options.pngHeight;
      resizeOptions.fit = 'contain';
    }

    if (this.options.pngFormat === 'square-inscribed-circle') {
      /**
       * Imagine the given size, which is a square, has an inscribed circle. The
       * diameter of the circle is be the same as the diagonal of the square.
       * Imagine that circle would have an inscribed square, lets call this the
       * inner square, which is of course smaller than the outter square.
       * Using the Pythagorean theorem, we know that the each side's length of
       * the inner square is $r \sqrt{2}$. Putting that together for the inner
       * square means that each side's length is $r \sqrt{2}$ where $r$ is half
       * of the outer square's side length.
       *
       */
      const inscribedCircleRadius = this.options.pngHeight / 2;
      const innerSquareSideLength = Math.floor(
        inscribedCircleRadius * Math.sqrt(2),
      );
      resizeOptions.width = innerSquareSideLength;
      resizeOptions.height = innerSquareSideLength;

      const sideLengthDifference =
        this.options.pngHeight - innerSquareSideLength;
      extendOptions.top = Math.ceil(sideLengthDifference / 2);
      extendOptions.bottom = Math.floor(sideLengthDifference / 2);
      extendOptions.left = Math.floor(sideLengthDifference / 2);
      extendOptions.right = Math.ceil(sideLengthDifference / 2);
    }

    /**
     * The default density is 72 DPI. In order to resize the image while
     * maintaining the same DPI, the image is constructed with the DPI scaled up
     * in order to get at least 72 DPI in the resized image.
     */
    const defaultDensity = 72; // DPI

    return new Promise((resolve) => {
      try {
        sharp(Buffer.from(this.svg), {
          density: Math.ceil(
            (defaultDensity * this.options.pngHeight) / svgHeight,
          ),
        })
          .resize(resizeOptions)
          .extend(extendOptions)
          .png()
          .toBuffer({ resolveWithObject: true })
          .then(({ data, info }) => {
            let suffix = '';
            if (this.options.pngFormat === 'square-inscribed-circle') {
              suffix = '-inscribed-circle';
            }
            fs.writeFileSync(
              path.join(
                this.options.outputDirectory,
                `${this.name}-${info.width}x${info.height}${suffix}.png`,
              ),
              data,
            );

            resolve();
          });
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    });
  }

  private maximumHeight(): number {
    return Math.max(
      this.singleVPoints.maximumHeight(),
      this.doubleVPoints.maximumHeight(),
    );
  }

  private maximumWidth(): number {
    return Math.max(
      this.singleVPoints.maximumWidth(),
      this.doubleVPoints.maximumWidth(),
    );
  }
}

export default VidavidorraLogo;
export { tool, Options };
