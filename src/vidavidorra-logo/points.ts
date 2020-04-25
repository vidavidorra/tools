export interface Point {
  name: string;
  x: number;
  y: number;
}

export class Points {
  constructor(private points: Point[]) {}

  toSvgPathData(indentation: number): string {
    const svgPath: string[] = [];

    this.points.forEach((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      svgPath.push(`${command} ${point.x} ${point.y}`);
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
    return Math.max(...this.points.map((point) => point.x));
  }

  maximumY(): number {
    return Math.max(...this.points.map((point) => point.y));
  }
}
