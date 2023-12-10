import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(2, false);
const lines = data.split('\n');

let sum: number = 0;

lines.forEach((line, index) => {
  const noGame = line.split(':');
  const games = noGame[1].split(';')

  let minimumRed: number = 0;
  let minimumGreen: number = 0;
  let minimumBlue: number = 0;

  games.forEach(game => {
    const cubes = game.split(' ');
        
    cubes.forEach((item, index) => {            
      if (item.includes('red') && minimumRed < parseInt(cubes[index - 1])) minimumRed = cubes[index - 1];
      if (item.includes('green') && minimumGreen < parseInt(cubes[index - 1])) minimumGreen = cubes[index - 1];
      if (item.includes('blue') && minimumBlue < parseInt(cubes[index - 1])) minimumBlue = cubes[index - 1];
    });
  });
  
  sum += minimumRed * minimumGreen * minimumBlue;  
});

console.log(sum);
