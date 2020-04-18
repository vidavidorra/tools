import chalk from 'chalk';

export class Tool {
  constructor(public name: string, public description: string) {}

  print(): void {
    const message = [
      chalk.green(this.name),
      `  ${chalk.blue(this.description)}`,
    ].join('\n');

    console.log(message);
  }
}
