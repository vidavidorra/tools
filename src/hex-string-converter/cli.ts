import * as validator from '../helpers/validator';
import { Arguments, hexStringConverter } from './hex-string-converter';
import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'hexString',
    message: 'Enter a hexadecimal string',
    validate: validator.hexString,
    default: '0123456789abcdef',
  },
  {
    type: 'list',
    name: 'outputFormat',
    message: 'To what do you want to convert the hexadecimal string?',
    choices: [
      { name: 'C-sytle array', value: 'c-array' },
      { name: 'C++ vector', value: 'cpp-vector' },
      { name: 'C++ list', value: 'cpp-list' },
    ],
    default: 'cpp-list',
  },
  {
    type: 'input',
    name: 'bytesPerLine',
    message: 'How many bytes per line do you want?',
    default: 10,
    validate: validator.positiveInteger,
  },
  {
    type: 'confirm',
    name: 'copyOutputToClipboard',
    message: 'Do you want to copy the output to the clipboard?',
    default: false,
  },
];

inquirer.prompt<Arguments>(questions).then((answers) => {
  hexStringConverter(answers);
});
