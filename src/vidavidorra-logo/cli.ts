import * as validator from '../helpers/validator';
import { VidavidorraLogo } from './vidavidorra-logo';
import inquirer from 'inquirer';

interface Arguments {
  outputDirectory: string;
  height: number;
  lineThickness: number;
  colour: string;
}

const questions = [
  {
    type: 'input',
    name: 'outputDirectory',
    message: 'What directory do you want to save the logo in?',
    default: '.',
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
];

inquirer.prompt<Arguments>(questions).then((answers) => {
  console.log(answers);
  const vidavidorraLogo = new VidavidorraLogo(
    answers.height,
    answers.lineThickness,
    answers.colour,
    answers.outputDirectory
  );

  vidavidorraLogo.createSvg();
});
