import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(9, false);
const lines = data.split('\n');

let sum = 0;

const AllZeros = (numbers: number[]) => {
  for (const number of numbers) {
    if (number !== 0) return false;
  }
  return true;
}

lines.forEach((line) => {
  const numbers: Array<number> = line.split(' ').map(Number);
  const calculations: number[][] = [];
  let solved = false;

  calculations.push(numbers);

  while (!solved) {
    const differenceArray = [];
    const checkArray = calculations[calculations.length - 1];

    for (let index = 0; index < checkArray.length - 1; index++) {
      differenceArray.push(checkArray[index + 1] - checkArray[index]);
    }

    calculations.push(differenceArray);

    if (AllZeros(differenceArray)) {      
      let increment = 0;
      
      calculations.reverse().forEach((array) => {
        increment = array[array.length - 1] + increment;
      });
      
      sum += increment;

      solved = true;
    }
  }
});

console.log(sum);
