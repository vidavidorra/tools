import { Pixel } from './pixel';
import { Tool } from '../tool';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const tool = new Tool(
  'random-data-analyser',
  'Analyse random data by creating an black-and-white pixel image with it.',
);

export interface Arguments {
  dataPath: string;
  outputDirectory: string;
}

export function randomDataAnalyser(args: Arguments): Promise<void> {
  return new Promise((resolve) => {
    try {
      const randomData = JSON.parse(fs.readFileSync(args.dataPath, 'utf-8'));

      const data: number[] = [];
      const size = Math.floor(Math.sqrt(randomData.length));

      randomData.forEach((e) => {
        const pixel = new Pixel(0, 0, 0);
        if (e % 2 === 0) {
          pixel.set(255, 255, 255);
        }

        data.push(...pixel.RGB());
      });

      const image = sharp(Buffer.from(data), {
        raw: { width: size, height: size, channels: 3 },
      });

      image
        .toFile(path.join(args.outputDirectory, `random-${size}x${size}.png`))
        .then(() => {
          resolve();
        })
        .catch((e) => {
          console.log(chalk.red(e));
          process.exit(1);
        });
    } catch (e) {
      console.log(chalk.red(e));
      process.exit(1);
    }
  });
}
