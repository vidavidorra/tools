import { Tool } from '../tool';
import chalk from 'chalk';
import clipboardy from 'clipboardy';

export const tool = new Tool(
  'hex-string-converter',
  [
    'Convert a hexadecimal string (e.g. 0123456789abcdef) to another format',
    '(e.g. a C++ vector).',
  ].join(' ')
);

export interface Arguments {
  hexString: string;
  outputFormat: 'c-array' | 'cpp-vector' | 'cpp-list';
  bytesPerLine: number;
  copyOutputToClipboard: boolean;
}

function bufferToHexElements(buffer: Buffer, bytesPerLine: number): string {
  const hexPrefix = '0x';
  const padding = '0';
  const paddingLength = 2;

  let output = '';
  buffer.forEach((e, i) => {
    if (i % bytesPerLine === 0) {
      if (i > 0) {
        output += '\n';
      }

      output += `  ${hexPrefix}${e
        .toString(16)
        .padStart(paddingLength, padding)},`;
    } else {
      output += ` ${hexPrefix}${e
        .toString(16)
        .padStart(paddingLength, padding)},`;
    }
  });

  return output;
}

const elementsPrefix = new Map([
  ['c-array', 'uint8_t data[]'],
  ['cpp-vector', 'std::vector<std::uint8_t> data'],
  ['cpp-list', 'std::list<std::uint8_t> data'],
]);

export function hexStringConverter(args: Arguments): void {
  const buffer = Buffer.from(args.hexString, 'hex');
  const hexElements = bufferToHexElements(buffer, args.bytesPerLine);

  const output = [
    `${elementsPrefix.get(args.outputFormat)} = {`,
    hexElements,
    '};',
  ].join('\n');

  console.log(chalk.green(output));
  if (args.copyOutputToClipboard) {
    clipboardy.writeSync(output);
    console.log(chalk.magentaBright('Output copied to clipboard!'));
  }
}
