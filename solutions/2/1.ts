import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(2, false);
const lines = data.split('\n');

let sum: number = 0;

const gameIsImpossible = (red: number, green: number, blue: number) => {
  if (red > 12) return true;
  if (green > 13) return true;
  if (blue > 14) return true;
  
  return false;
}

lines.forEach((line, index) => {
  const noGame = line.split(':');
  const games = noGame[1].split(';')

  let impossible = false;  

  games.forEach(game => {
    const cubes = game.split(' ');

    let red = 0;
    let green = 0;
    let blue = 0;
    
    cubes.forEach((item, index) => {            
      if (item.includes('red')) red = cubes[index - 1];
      if (item.includes('green')) green = cubes[index - 1];
      if (item.includes('blue')) blue = cubes[index - 1];
    });
    
    if (gameIsImpossible(red, green, blue)) impossible = true;
  });

  if (!impossible) sum += index + 1;
  
  console.log('Is game ', index + 1, ' Impossible? ', impossible);
  
});

console.log(sum);
