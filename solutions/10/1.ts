import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(10, false);
const lines = data.split('\n');

type directions = 'U' | 'D' | 'L' | 'R';
type symbols = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';
type coordinatesType = {vert: number, hor: number};

let sum = 0;
let direction: directions = 'D';
let coordinates = { vert:62, hor:61 };
let end = false;
const grid: string[][] = [];

lines.forEach((line) => {
  grid.push(line.split(''));
})

const lookUpTable = (symbol: symbols, direction: directions) => {
  switch (symbol) {
    case 'L':
      if (direction === 'D') return 'R'; else return 'U';
    case 'J':
      if (direction === 'D') return 'L'; else return 'U';
    case '7':
      if (direction === 'U') return 'L'; else return 'D';
    case 'F':
      if (direction === 'U') return 'R'; else return 'D';
    default:
      return direction;
  }
}

const move = (coordinates: coordinatesType, direction: directions) => {
  let vert = coordinates.vert;
  let hor = coordinates.hor;

  switch (direction) {
    case 'D':
      vert += 1;
      break;
    case 'U':
      vert -= 1;
      break;
    case 'L':
      hor -= 1;
      break;
    case 'R':
      hor += 1;
      break;
  }
  return { vert, hor };
}

while (!end) {
  coordinates = move(coordinates, direction);
  direction = lookUpTable(grid[coordinates.vert][coordinates.hor] as symbols, direction);

  sum += 1;

  if (grid[coordinates.vert][coordinates.hor] === 'S') {
    end = true;
  }
}

console.log(sum / 2);
