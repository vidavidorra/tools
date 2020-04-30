export interface Point {
  name: string;
  x: number;
  y: number;
}

export class Points {
  constructor(private points: Point[], private border: number) {}

  toSvgPathData(indentation: number): string {
    const svgPath: string[] = [];

    this.points.forEach((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      svgPath.push(
        `${command} ${point.x + this.border} ${point.y + this.border}`
      );
    });

    return svgPath.join(`\n${' '.repeat(indentation)}`);
  }

  maximumWidth(): number {
    return this.maximumX();
  }

  maximumHeight(): number {
    return this.maximumY();
  }

  maximumX(): number {
    /**
     * This needs two times the border to account for both sides of the
     * imaginary rectangle that is around the points.
     */
    return Math.max(...this.points.map((point) => point.x)) + 2 * this.border;
  }

  maximumY(): number {
    /**
     * This needs two times the border to account for both sides of the
     * imaginary rectangle that is around the points.
     */
    return Math.max(...this.points.map((point) => point.y)) + 2 * this.border;
  }
}
