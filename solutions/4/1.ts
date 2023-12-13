import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(4);
const lines = data.split('\n');

let sum: number = 0;

lines.forEach((line) => {
  let score = 0;

  const removeGame = line.split(':');

  const splitNumbers = removeGame[1].split(' | ');

  const winningNumbers = splitNumbers[0].split(' ');
  const lotteryNumbers = splitNumbers[1].split(' ');

  const filteredWinningNumbers = winningNumbers.filter((element) => element !== '');
  const filteredLotteryNumbers = lotteryNumbers.filter((element) => element !== '');
  
  filteredLotteryNumbers.forEach(number => {
    if (filteredWinningNumbers.includes(number)){
      if (score === 0) {
        score += 1;
      } else {
        score *= 2;
      }
    }
  })

  console.log(score);
  
  sum += score;
  
});


console.log(sum);
