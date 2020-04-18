import { Arguments, bufferConverter } from './buffer-converter';
import inquirer from 'inquirer';

function requireBuffer(value: string): true | string {
  if (/^\[?([0-9]+,)+[0-9]+\]?$/.test(value)) {
    return true;
  }
  return 'Value must be a buffer';
}

const questions = [
  {
    type: 'input',
    name: 'bufferString',
    message: 'Enter a buffer',
    validate: requireBuffer,
    default: '[53,55,51,20,51,52,89,6,0,1,0,91]',
  },
  {
    type: 'list',
    name: 'outputFormat',
    message: 'To what do you want to convert the buffer?',
    choices: [{ name: 'Hexadecimal string', value: 'hex-string' }],
    default: 'hex-string',
  },
  {
    type: 'confirm',
    name: 'copyOutputToClipboard',
    message: 'Do you want to copy the output to the clipboard?',
    default: false,
  },
];

inquirer.prompt<Arguments>(questions).then((answers) => {
  bufferConverter(answers);
});
