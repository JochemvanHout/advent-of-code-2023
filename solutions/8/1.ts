import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(8, false);
const lines = data.split('\n');

const input = 'LLRLRRRLLRRRLRRLRRLRLRRRLRRRLRLLRLRRLRRLRLLRRLRRRLRRLRLRLRLRRRLRRLRLLLRRLRRRLLLRLRRRLRRRLLRRLRRRLRLRRRLLLRRLLRRLRRLLLRRRLRRRLRRRLRRLLRLRLRLRRRLRLRLRRLRRLRLRRRLRRLRRRLRRRLLLRLRRLRRLRLLRRLLRRLRRLLRLRRLRRLRLRLLLRLLRRLRRLRRRLLRRLLRRRLRRLRRRLRRRLLRRRLRRRLLRRRLRLRLLRRLRLRLRRRR';
const instructions: Array<'L' | 'R'> = input.split('');

type map = {
  [index: string] : {L: string, R: string}
}

const map: map = {};

lines.forEach((line) => {
  const [key, left, right] = line.split(' ');
  map[key] = {L: left, R: right};
})

let currentPosition = 'AAA';
let sum = 0;

while (currentPosition !== 'ZZZ') {
  for (const direction of instructions) {
    currentPosition = map[currentPosition][direction];
    sum += 1;

    if (currentPosition === 'ZZZ') {
      console.log(sum);
      break;
    }
  }
}
