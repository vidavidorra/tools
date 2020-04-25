import * as validator from '../helpers/validator';
import { Arguments, SysvSymbols } from './map-gnu-symbol';
import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'symbolsPath',
    message: 'Enter the path of the symbols file',
    validate: validator.existingFile,
    default: 'example.symbols',
  },
  {
    type: 'input',
    name: 'symbol',
    message: 'What symbol do you want to map?',
    validate: validator.hexString,
    default: '08059349',
  },
];

inquirer.prompt<Arguments>(questions).then((answers) => {
  new SysvSymbols(answers);
});
