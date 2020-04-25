import { Tool } from '../tool';
import fs from 'fs';
import mustache from 'mustache';
import path from 'path';

export const tool = new Tool(
  'vidavidorra-logo',
  'Create the vidavidorra logo as SVG.'
);

interface Point {
  name: string;
  x: number;
  y: number;
}

/**
 * See the logo.md document in this directory for a simplified ASCII
 * representation and description of the logo. That document also contains the
 * calculations for the paths of the logo and the paths themselves. This class
 * simply follows those paths.
 */
export class VidavidorraLogo {
  private svgDataIndentation = 7;
  private svgTemplatePath = path.resolve(__dirname, 'logo.mustache');

  private H: number; // Height.
  private T: number; // Line thickness.
  private HS: number; // Horizontal slice width.
  private VS: number; // Vertical slice height.

  private doubleVPoints: Point[];
  private singleVPoints: Point[];

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

    this.doubleVPoints = [
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
    ];

    this.singleVPoints = [
      { name: 'point 1  (origin)', x: 3 * this.HS, y: 2 * this.T },
      { name: 'point 2', x: this.H / 2, y: this.H - 2 * this.VS },
      { name: 'point 3', x: this.H - 2 * this.HS, y: 0 },
      { name: 'point 4', x: this.H - 3 * this.HS, y: 0 },
      { name: 'point 5', x: this.H / 2, y: this.H - 3 * this.VS },
      { name: 'point 6', x: 4 * this.HS, y: 2 * this.T },
    ];
  }

  createSvg(): void {
    const view = {
      width: this.maximumWidth(),
      height: this.maximumHeight(),
      colour: this.colour,
      doubleVData: this.pointsToSvgPathData(this.doubleVPoints),
      singleVData: this.pointsToSvgPathData(this.singleVPoints),
    };

    const template = fs.readFileSync(this.svgTemplatePath, 'utf8');
    const render = mustache.render(template, view);
    fs.writeFileSync(path.join(this.outputDirectory, 'logo.svg'), render);
  }

  private maximumHeight(): number {
    return Math.max(
      ...[...this.doubleVPoints, ...this.singleVPoints].map((point) => point.y)
    );
  }

  private maximumWidth(): number {
    return Math.max(
      ...[...this.doubleVPoints, ...this.singleVPoints].map((point) => point.x)
    );
  }

  private pointsToSvgPathData(points: Point[]): string {
    const svgPath: string[] = [];
    points.forEach((point, index) => {
      const command = index === 0 ? 'M' : 'L';

      svgPath.push(`${command} ${point.x} ${point.y}`);
    });

    return svgPath.join(`\n${' '.repeat(this.svgDataIndentation)}`);
  }
}
