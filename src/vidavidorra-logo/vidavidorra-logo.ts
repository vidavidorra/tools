import { Points } from './points';
import { Tool } from '../tool';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';
import sharp from 'sharp';

export const tool = new Tool(
  'vidavidorra-logo',
  'Create the vidavidorra logo as SVG.'
);

/**
 * See the logo.md document in this directory for a simplified ASCII
 * representation and description of the logo. That document also contains the
 * calculations for the paths of the logo and the paths themselves. This class
 * simply follows those paths.
 */
export class VidavidorraLogo {
  private svgPathDataIndentation = 7;
  private svgTemplatePath = path.resolve(__dirname, 'logo.mustache');
  private svg: string;

  private H: number; // Height.
  private T: number; // Line thickness.
  private PT: number; // Perpendicular distance of thickness.
  private HS: number; // Horizontal slice width.
  private VS: number; // Vertical slice height.

  private border = 1;

  private doubleVPoints: Points;
  private singleVPoints: Points;

  constructor(
    private outputDirectory: string,
    height: number, // H in this class.
    lineThickness: number, // T in this class.
    private colour: string,
    private pngHeight: number,
    private pngSquare: boolean
  ) {
    this.H = height;
    this.T = lineThickness;
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
      this.border
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
      this.border
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
      colour: this.colour,
      doubleVData: this.singleVPoints.toSvgPathData(
        this.svgPathDataIndentation
      ),
      singleVData: this.doubleVPoints.toSvgPathData(
        this.svgPathDataIndentation
      ),
    };

    const template = fs.readFileSync(this.svgTemplatePath, 'utf8');
    this.svg = mustache.render(template, view);

    fs.writeFileSync(path.join(this.outputDirectory, 'logo.svg'), this.svg);
    console.log();
  }

  private createPng(): Promise<void> {
    const svgHeight = Math.ceil(this.maximumHeight());

    const resizeOptions: sharp.ResizeOptions = {
      height: this.pngHeight,
    };
    if (this.pngSquare) {
      resizeOptions.width = this.pngHeight;
      resizeOptions.fit = 'contain';
      resizeOptions.background = { r: 0, g: 0, b: 0, alpha: 0 };
    }

    /**
     * The default density is 72 DPI. In order to resize the image while
     * maintaining the same DPI, the image is constructed with the DPI scaled up
     * in order to get at least 72 DPI in the resized image.
     */
    const defaultDensity = 72; // DPI

    return sharp(Buffer.from(this.svg), {
      density: Math.ceil((defaultDensity * this.pngHeight) / svgHeight),
    })
      .resize(resizeOptions)
      .png()
      .toFile(path.join(this.outputDirectory, 'logo.png'))
      .then((info) => {
        console.log(info);
      })
      .catch((err) => {
        console.log(err);
        //
      });
  }

  private maximumHeight(): number {
    return Math.max(
      this.singleVPoints.maximumHeight(),
      this.doubleVPoints.maximumHeight()
    );
  }

  private maximumWidth(): number {
    return Math.max(
      this.singleVPoints.maximumWidth(),
      this.doubleVPoints.maximumWidth()
    );
  }
}
