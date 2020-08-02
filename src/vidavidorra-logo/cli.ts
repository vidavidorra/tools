import * as validator from '../helpers/validator';
import VidavidorraLogo, { Options } from './vidavidorra-logo';
import chalk from 'chalk';
import inquirer from 'inquirer';

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
    type: 'list',
    name: 'pngFormat',
    message: 'What should the format of the PNG output be?',
    choices: [
      { name: 'Rectangle', value: 'rectangle' },
      { name: 'Square', value: 'square' },
      {
        name: 'Square with inscribed circle fitting the logo',
        short: 'Square inscribed circle',
        value: 'square-inscribed-circle',
      },
    ],
    default: 'rectangle',
  },
];

const ui = new inquirer.ui.BottomBar();

ui.log.write(
  chalk.yellow('⚠ Note that these default settings are for the standard logo!'),
);

inquirer.prompt<Options>(questions).then((answers) => {
  const vidavidorraLogo = new VidavidorraLogo(answers);

  return vidavidorraLogo.create();
});
