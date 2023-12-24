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

let positions: Array<string> = [];

for (const key in map) {
  if (key.split('')[2] === 'A') {
    positions.push(key);
  }
} 

let stepsToZ: Array<number> = [];

positions.forEach((pos) => {

let currentPos = pos;
let found = false;
let sum = 0;

  while (!found) {
    for (const direction of instructions) {
      sum += 1;
      currentPos = map[currentPos][direction];

      if (currentPos.split('')[2] === 'Z') {
        stepsToZ.push(sum);
        found = true;
        return;
      }
    }
  }  
});

// 'borrowed' code 😔
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

console.log(lcm(...stepsToZ));
 