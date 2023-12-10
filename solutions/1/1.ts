import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(1);
const lines = data.split('\n');

let sum: number = 0;

for (const line of lines) {
  
  let firstNumber: string | undefined;
  let secondNumber: string | undefined;
  
  for (const character of line) {

    if(!isNaN(character)) {
      if (!firstNumber) {
        firstNumber = character;
      }
      secondNumber = character;
    }
    
  }

  const combinedNumber = firstNumber + secondNumber;  
  sum += parseInt(combinedNumber)
}

console.log(sum);
