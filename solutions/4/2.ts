import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(4, false);
const lines = data.split('\n');

let sum: number = 0;

const gamesToPlay = Array(lines.length).fill(1);

lines.forEach((line, index) => {
  let score = 0;

  const removeGame = line.split(':');

  const splitNumbers = removeGame[1].split(' | ');

  const winningNumbers = splitNumbers[0].split(' ');
  const lotteryNumbers = splitNumbers[1].split(' ');

  const filteredWinningNumbers = winningNumbers.filter((element) => element !== '');
  const filteredLotteryNumbers = lotteryNumbers.filter((element) => element !== '');
  
  filteredLotteryNumbers.forEach(number => {
    if (filteredWinningNumbers.includes(number)){
      score += 1
    }
  })

  for (let l = 0; l < gamesToPlay[index]; l++) {
    for (let i = index + 1; i <= index + score; i++) {      
      gamesToPlay[i] += 1;
    }
  }
});

gamesToPlay.forEach(element => {
  sum += parseInt(element)  ;
});

console.log(sum);
