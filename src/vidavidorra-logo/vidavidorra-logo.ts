import { Points } from './points';
import { Tool } from '../tool';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';

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

  private H: number; // Height.
  private T: number; // Line thickness.
  private HS: number; // Horizontal slice width.
  private VS: number; // Vertical slice height.

  private doubleVPoints: Points;
  private singleVPoints: Points;

  constructor(
    height: number, // H in this class.
    lineThickness: number, // T in this class.
    private colour: string,
    private outputDirectory: string
  ) {
    this.H = height;
    this.T = lineThickness;
    this.HS = Math.sqrt(this.T ** 2 + (0.5 * this.T) ** 2);
    this.VS = this.HS * 2;

    this.doubleVPoints = new Points([
      { name: 'point 1 (origin)', x: 0, y: 0 },
      { name: 'point 2', x: this.H / 2, y: this.H },
      { name: 'point 3', x: this.H - this.T / 2, y: this.T },
      { name: 'point 4', x: this.H - this.T / 2 + this.HS, y: this.T },
      { name: 'point 5', x: this.H / 2 + this.HS, y: this.H },
      { name: 'point 6', x: this.H / 2 + 2 * this.HS, y: this.H },
      { name: 'point 7', x: this.H + 2 * this.HS, y: 0 },
      { name: 'point 8', x: this.H - this.HS, y: 0 },
      { name: 'point 9', x: this.H / 2, y: this.H - this.VS },
      { name: 'point 10', x: this.T / 2 + this.HS, y: this.T },
      { name: 'point 11', x: this.T / 2 + 4 * this.HS, y: this.T },
      { name: 'point 12', x: this.H / 2, y: this.H - 4 * this.VS },
      { name: 'point 13', x: this.H / 2, y: this.H - 5 * this.VS },
      { name: 'point 14', x: 5 * this.HS, y: 0 },
    ]);

    this.singleVPoints = new Points([
      { name: 'point 1  (origin)', x: 3 * this.HS, y: 2 * this.T },
      { name: 'point 2', x: this.H / 2, y: this.H - 2 * this.VS },
      { name: 'point 3', x: this.H - 2 * this.HS, y: 0 },
      { name: 'point 4', x: this.H - 3 * this.HS, y: 0 },
      { name: 'point 5', x: this.H / 2, y: this.H - 3 * this.VS },
      { name: 'point 6', x: 4 * this.HS, y: 2 * this.T },
    ]);
  }

  createSvg(): void {
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
    const render = mustache.render(template, view);
    fs.writeFileSync(path.join(this.outputDirectory, 'logo.svg'), render);
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
