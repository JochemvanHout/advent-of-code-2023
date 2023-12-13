import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(3);
const lines = data.split('\n');

let grid = [];

let sum: number = 0;

const checkIfSymbol = (input: string) => {
  if (input === '.') return false;
  if (!isNaN(input)) return false;
  return true;
}

const checkIfNumber = (input: string) => {
  if (!isNaN(input)) return true;
  return false;
}

const findCompleteNumber = (y, x) => {
  let numbers = [];

  numbers.push(grid[y][x]);
  grid[y][x] = '.';

  let newX = x - 1;
  while (true) {
    if (checkIfNumber(grid[y][newX])) {
      numbers.unshift(grid[y][newX]);
      grid[y][newX] = '.';
      newX -= 1;
    } else {
      break;
    }
  }

  newX = x + 1;
  while (true) {
    if (checkIfNumber(grid[y][newX])) {
      numbers.push(grid[y][newX]);
      grid[y][newX] = '.';
      newX += 1;
    } else {
      break;
    }
  }

  let actualString = '';

  numbers.forEach(element => {
    actualString += element;
  });
    
  sum += parseInt(actualString);
}

const checkForAdjacentNumbers = (x: number, y: number) => {
  for (let yL = y - 1; yL < y + 2; yL += 1){
    for (let xL = x - 1; xL < x + 2; xL += 1){
      if(checkIfNumber(grid[yL][xL])) {
        findCompleteNumber(yL, xL);
      }
    }
  }
}

// create grid
lines.forEach((line) => {
  const splitLine = line.split('');

  grid.push(splitLine);
});


grid.forEach((line, y) => {
  line.forEach((char, x) => {
    if (checkIfSymbol(char)) {
      checkForAdjacentNumbers(x, y);
    }
  });
});

console.log(sum);
