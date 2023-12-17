import * as data from '../5/conversionTables.ts';

const seeds = [3121711159,166491471,3942191905,154855415,3423756552,210503354,2714499581,312077252,1371898531,165242002,752983293,93023991,3321707304,21275084,949929163,233055973,3626585,170407229,395618482,226312891];

let lowestLocation: undefined | number = undefined;

const numberIsInRange = (rangeLower: number, rangeUpper: number, check: number) => {
  if (check >= rangeLower && check <= rangeUpper) return true;
  return false;
}

const checker = (dataSet: number[][], value: number) => {  
  for (const element of dataSet) {
    if (numberIsInRange(element[1], element[1] + element[2], value)) return element[0] + (value - element[1]);
  };
  return value;
}

seeds.forEach((seed) => {
  const soil = checker(data.seedToSoilMap, seed);
  // console.log('soil', soil);
  const fertilizer = checker(data.soilToFertilizerMap, soil);
  // console.log('fertilizer', fertilizer);
  const water = checker(data.fertilizerToWaterMap, fertilizer);
  // console.log('water', water);
  const light = checker(data.waterToLightMap, water);
  // console.log('light', light);
  const temperature = checker(data.lightToTemperatureMap, light);
  // console.log('temperature', temperature);
  const humidity = checker(data.temperatureToHumidityMap, temperature);
  // console.log('humidity', humidity);
  const location = checker(data.humidityToLocationMap, humidity);
  // console.log('location', location);
  
  if (!lowestLocation || location < lowestLocation) {
    lowestLocation = location;
  }
});

console.log('lowest: ', lowestLocation);
