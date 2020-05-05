import * as validator from '../helpers/validator';
import { VidavidorraLogo } from './vidavidorra-logo';
import chalk from 'chalk';
import inquirer from 'inquirer';

interface Arguments {
  outputDirectory: string;
  height: number;
  lineThickness: number;
  colour: string;
  pngHeight: number;
  pngSquare: boolean;
}

const questions = [
  {
    type: 'input',
    name: 'outputDirectory',
    message: 'What directory do you want to save the logo in?',
    default: './build',
  },
  {
    type: 'number',
    name: 'height',
    message: 'What should be the height of the logo?',
    validate: validator.positiveInteger,
    default: 100,
  },
  {
    type: 'number',
    name: 'lineThickness',
    message: 'What should be the line thickness of the logo?',
    validate: validator.positiveInteger,
    default: 3,
  },
  {
    type: 'input',
    name: 'colour',
    message: 'What should be the colour of the logo?',
    validate: validator.hexColourCode,
    default: '#f78a1e',
  },
  {
    type: 'number',
    name: 'pngHeight',
    message: 'What should be the height of the logo as PNG output?',
    validate: validator.positiveInteger,
    default: 2160,
  },
  {
    type: 'boolean',
    name: 'pngSquare',
    message: 'Do you want the PNG to be square?',
    default: false,
  },
];

const ui = new inquirer.ui.BottomBar();

ui.log.write(
  chalk.yellow('⚠ Note that these default settings are for the standard logo!'),
);

inquirer.prompt<Arguments>(questions).then((answers) => {
  const vidavidorraLogo = new VidavidorraLogo(
    answers.outputDirectory,
    answers.height,
    answers.lineThickness,
    answers.colour,
    answers.pngHeight,
    answers.pngSquare,
  );

  return vidavidorraLogo.create();
});
