import { Tool } from '../tool';
import chalk from 'chalk';
import fs from 'fs';

export const tool = new Tool(
  'map-gnu-symbol',
  'Map a GNU symbol to in a symbol file.',
);

export interface Arguments {
  symbolsPath: string;
  symbol: string;
}

class SysvSymbol {
  public constructor(
    name: string,
    value: string,
    sysvClass: string,
    type: string,
    size: string,
    line: string,
    section: string,
    symbolFile: string,
    symbolLine: number,
  ) {
    if (!name || !value) {
      throw new Error('Required field(s) missing');
    }

    this.name = name;
    this.value = value;
    this.sysvClass = sysvClass || null;
    this.type = type || null;
    this.size = size || null;
    this.line = line || null;
    this.section = section;
    this.symbolFile = symbolFile;
    this.symbolLine = symbolLine;
  }

  public name: string;
  public value: string;
  public sysvClass: string;
  public type: string;
  public size: string;
  public line: string;
  public section: string;
  public symbolFile: string;
  public symbolLine: number;
}

function exists(path: string): true | string {
  let absolutePath = path;
  if (!path.startsWith('/') && !path.startsWith('\\')) {
    absolutePath = process.cwd() + '/' + path;
  }

  if (fs.existsSync(absolutePath)) {
    return true;
  }
  return "Path doesn't exists on the filesystem";
}

export class SysvSymbols {
  public constructor(args: Arguments) {
    this.symbols = [];
    if (!exists(args.symbolsPath)) {
      throw new Error('No path...');
    }

    fs.readFile(args.symbolsPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      const lines = data.toString().split('\n');

      lines.forEach((line) => {
        /*
             @todo Add note about using System V conventions and reference it.
             @todo Trim all values.
             @todo Parse all values based on what they MAY contain.
             @todo Section MAY be followed by the file and line if the -l option was
                   used... GOT DAMN
          */
        try {
          /* This will skip the lines with other content, which will normally be
             at the beginning of the file. Additionally this will skip blank
             lines that can be present in the file, most likely at the end of
             the file.
           */
          if (this.elementsInLine(line) !== 7) {
            return;
          }

          const s = this.parseLine(line);
          this.symbols.push(s);
        } catch (e) {
          console.log(e);
          process.exit(1);
        }
      });

      this.sort();
      this.map(args.symbol);
    });
  }

  private elementsInLine(line: string): number {
    return line.split('|').length;
  }

  private parseLine(line: string): SysvSymbol {
    try {
      const elementsInLine = this.elementsInLine(line);
      if (elementsInLine !== 7) {
        throw new Error(
          'Invalid amount of elements in line (${elementsInLine})',
        );
      }

      const elements = line.split('|');
      const sysvName = elements[0].trim(); // Required field.
      const sysvValue = elements[1].trim(); // Required field.
      const symbolClass = elements[2].trim();
      const symbolType = elements[3].trim();
      const symbolSize = elements[4].trim();
      const symbolLine = elements[5].trim();
      const symbolSection = elements[6].trim();

      let sysvSection = null;
      let symbolFile = null;
      let symbolLineNumber = null;
      if (symbolSection) {
        const sectionParts = symbolSection.split('\t');
        if (sectionParts.length > 2) {
          throw new Error('not matching length');
        }

        const [a, b] = sectionParts;
        if (a) {
          sysvSection = a;
        }
        if (b) {
          [symbolFile, symbolLineNumber] = b.split(':');
        }
      }

      const s = new SysvSymbol(
        sysvName,
        sysvValue,
        symbolClass,
        symbolType,
        symbolSize,
        symbolLine,
        sysvSection,
        symbolFile,
        symbolLineNumber,
      );

      return s;
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }

  private map(symbol: string): void {
    const target = parseInt(symbol, 16);
    let closestValue = Number.MAX_SAFE_INTEGER;
    let index = 0;

    this.symbols.forEach((e, i) => {
      const distance = Math.abs(target - parseInt(e.value, 16));
      if (distance < closestValue) {
        index = i;
        closestValue = distance;
      }
    });

    if (parseInt(this.symbols[index].value, 16) > target) {
      index -= 1;
    }

    console.log(chalk.green(JSON.stringify(this.symbols[index], null, 2)));
  }

  private sort(): void {
    this.symbols.sort((lhs, rhs): number => {
      return parseInt(lhs.value, 16) - parseInt(rhs.value, 16);
    });
  }

  private symbols: SysvSymbol[] = [];
}
