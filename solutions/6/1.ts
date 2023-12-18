const boat1 = [53, 313];
const boat2 = [89, 1090];
const boat3 = [76, 1214];
const boat4 = [98, 1201];

const calculate = (time, minDistance) => {
  let wins = 0;
  // to calculate how far the boat will travel
  // (total seconds - seconds held) * seconds held
  for (let i = 0; i < time; i++) { 
    console.log(`Holding the button for ${i} miliseconds`);
    console.log(`It wil travel for ${(time - i) * i} milimeters`);
    if((time - i) * i > minDistance) {
      wins += 1;
    }
  }

  return wins; 
}

const race1 = calculate(boat1[0], boat1[1]);
const race2 = calculate(boat2[0], boat2[1]);
const race3 = calculate(boat3[0], boat3[1]);
const race4 = calculate(boat4[0], boat4[1]);

console.log(race1 * race2 * race3 * race4);