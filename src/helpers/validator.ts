import fs from 'fs';
import path from 'path';

export function hexString(value: string): true | string {
  if (/^[0-9a-fA-F]+$/.test(value)) {
    return true;
  }

  return 'Value must be hexadecimal (e.g. `ff`)';
}

export function positiveInteger(value: string): true | string {
  if (/^[1-9]\d*$/.test(value)) {
    return true;
  }

  return 'Value must be a positive integer (e.g. `1`)';
}

export function isHexColourCode(value: string): boolean {
  console.log(`validator '${value}'`, /^#[0-9a-fA-F]{6}$/.test(value));

  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function hexColourCode(value: string): true | string {
  if (isHexColourCode(value)) {
    return true;
  }

  return 'Value must be a hex colour code (e.g. `#ff55aa`)';
}

export function existingFile(value: string): true | string {
  const absolutePath = path.resolve(process.cwd(), value);
  if (fs.existsSync(absolutePath)) {
    return true;
  }

  return "Path doesn't exist on the filesystem";
}

export function integerBuffer(value: string): true | string {
  if (/^\[?([0-9]+,)+[0-9]+\]?$/.test(value)) {
    return true;
  }

  return 'Value must be an integer buffer (e.g. `[1, 1, 2, 3]`)';
}
