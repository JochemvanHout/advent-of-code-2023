import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(1);
const lines = data.split('\n');

let sum: number = 0;

enum numbers {
  one = '1',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
}

const regex = /([0-9]|(one|two|three|four|five|six|seven|eight|nine))/;
const reverseRegex = /([0-9]|(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin))/;

const toNumber = (input: string, reverse: boolean) => {
  if(!isNaN(input)) {
    return input;
  }

  let stringInput = '';

  if(reverse) {
    stringInput = input.split('').reverse().join('');
  } else {
    stringInput = input;
  }

  return numbers[stringInput];
}

for (const line of lines) {
  const reverseLine = line.split('').reverse().join('');
  
  const firstFound = line.match(regex);
  const secondFound = reverseLine.match(reverseRegex);
  
  let firstNumber = toNumber(firstFound[0]); 
  let secondNumber = toNumber(secondFound[0], true);

  const combinedNumber = firstNumber + secondNumber;  
  sum += parseInt(combinedNumber)
}

console.log(sum);
