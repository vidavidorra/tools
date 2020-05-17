export class Pixel {
  constructor(
    private red: number,
    private green: number,
    private blue: number,
    private alpha = 1.0,
  ) {
    this.validate();
  }

  set(red: number, green: number, blue: number, alpha = 1.0): void {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;

    this.validate();
  }

  RGB(): [number, number, number] {
    return [this.red, this.green, this.blue];
  }

  RGBA(): [number, number, number, number] {
    return [this.red, this.green, this.blue, this.alpha];
  }

  private validate(): void {
    if (
      this.red < 0 ||
      this.red > 255 ||
      this.green < 0 ||
      this.green > 255 ||
      this.blue < 0 ||
      this.blue > 255 ||
      this.alpha < 0.0 ||
      this.alpha > 1.0
    ) {
      throw new Error('Invalid colour value(s)!');
    }
  }
}
