import { Arguments, SysvSymbols } from './map-gnu-symbol';
import fs from 'fs';
import inquirer from 'inquirer';

function requireHexString(value: string): true | string {
  if (/^(0x)?[0-9a-fA-F]+$/.test(value)) {
    return true;
  }
  return 'Value must be hexadecimal';
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

const questions = [
  {
    type: 'input',
    name: 'symbolsPath',
    message: 'Enter the path of the symbols file',
    validate: exists,
    default: 'example.symbols',
  },
  {
    type: 'input',
    name: 'symbol',
    message: 'What symbol do you want to map?',
    validate: requireHexString,
    default: '08059349',
  },
];

inquirer.prompt<Arguments>(questions).then((answers) => {
  new SysvSymbols(answers);
});
