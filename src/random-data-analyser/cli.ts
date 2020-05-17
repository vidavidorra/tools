import * as validator from '../helpers/validator';
import { Arguments, randomDataAnalyser, tool } from './random-data-analyser';
import inquirer from 'inquirer';
import path from 'path';

const questions = [
  {
    type: 'input',
    name: 'dataPath',
    message: [
      'What is the path of the data to analyse?',
      'Data MUST be a JSON array containing random bytes (0-255).',
    ].join('\n  '),
    validate: validator.existingFile,
    default: './data/random.json',
  },
  {
    type: 'input',
    name: 'outputDirectory',
    message: 'What directory do you want to save the analysed data in?',
    default: path.join('./build', tool.name),
  },
];

inquirer.prompt<Arguments>(questions).then((answers) => {
  randomDataAnalyser(answers);
});
