import { Tool } from '../tool';
import chalk from 'chalk';
import clipboardy from 'clipboardy';

export const tool = new Tool(
  'buffer-converter',
  [
    'Convert a buffer (e.g. [55,10,22]) to another format (e.g. hexadecimal',
    'string).',
  ].join(' ')
);

export interface Arguments {
  bufferString: string;
  outputFormat: string;
  copyOutputToClipboard: boolean;
}

export function bufferConverter(args: Arguments): void {
  try {
    const buffer = Buffer.from(JSON.parse(args.bufferString));
    const hexString = buffer.toString('hex');
    const output = hexString;

    console.log(chalk.green(output));
    if (args.copyOutputToClipboard) {
      clipboardy.writeSync(output);
      console.log(chalk.magentaBright('Output copied to clipboard!'));
    }
  } catch (e) {
    console.log(chalk.red(e));
    process.exit(1);
  }
}
