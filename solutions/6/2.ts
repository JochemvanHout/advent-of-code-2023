const boat1 = [53897698, 313109012141201];

const calculate = (time, minDistance) => {
  let wins = 0;
  for (let i = 0; i < time; i++) { 
    if((time - i) * i > minDistance) {
      wins += 1;
    }
  }

  return wins; 
}

const race1 = calculate(boat1[0], boat1[1]);

console.log(race1);