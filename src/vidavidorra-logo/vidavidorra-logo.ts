import { Tool } from '../tool';

export const tool = new Tool(
  'vidavidorra-logo',
  'Create the vidavidorra logo as SVG.'
);

interface Point {
  name: string;
  x: number;
  y: number;
}

const height = 100;
const lineThickness = 3;
const horizontalSliceWidth = Math.sqrt(
  lineThickness ** 2 + (0.5 * lineThickness) ** 2
);
const verticalSliceHeight = horizontalSliceWidth * 2;

const H = height;
const T = lineThickness;
const HS = horizontalSliceWidth;
const VS = verticalSliceHeight;

const doubleVPoints: Point[] = [
  { name: 'step 1 (origin)', x: 0, y: 0 },
  { name: 'step 2', x: H / 2, y: H },
  { name: 'step 3', x: H - T / 2, y: T },
  { name: 'step 4', x: H - T / 2 + HS, y: T },
  { name: 'step 5', x: H / 2 + HS, y: H },
  { name: 'step 6', x: H / 2 + 2 * HS, y: H },
  { name: 'step 7', x: H + 2 * HS, y: 0 },
  { name: 'step 8', x: H - HS, y: 0 },
  { name: 'step 9', x: H / 2, y: H - VS },
  { name: 'step 10', x: T / 2 + HS, y: T },
  { name: 'step 11', x: T / 2 + 4 * HS, y: T },
  { name: 'step 12', x: H / 2, y: H - 4 * VS },
  { name: 'step 13', x: H / 2, y: H - 5 * VS },
  { name: 'step 14', x: 5 * HS, y: 0 },
];

// doubleVPoints.forEach((point): void => {
//   console.log(`  L ${point.x + 1}, ${point.y + 1}`);
// });

const singleVPoints: Point[] = [
  { name: 'step 1  (origin)', x: 3 * HS, y: 2 * T },
  { name: 'step 2', x: H / 2, y: H - 2 * VS },
  { name: 'step 3', x: H - 2 * HS, y: 0 },
  { name: 'step 4', x: H - 3 * HS, y: 0 },
  { name: 'step 5', x: H / 2, y: H - 3 * VS },
  { name: 'step 6', x: 4 * HS, y: 2 * T },
];

// console.log('singleVPoints:');
// singleVPoints.forEach((point): void => {
//   console.log(`  L ${point.x + 1}, ${point.y + 1}`);
// });
