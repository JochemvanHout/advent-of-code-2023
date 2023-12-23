import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(7, false);
const lines = data.split('\n');

const values = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const sets = {
  highCard: [],
  onePair: [],
  twoPair: [],
  threeOfAkind: [],
  fullHouse: [],
  fourOfAKind: [],
  fiveOfAKind: [],
}

const sortHandToType = (hand: string, score: number) => {
  const individualCards = hand.split('');

  const countCards = new Object();

  individualCards.forEach(char => {
    if (Object.keys(countCards).find(key => key === char)) {
      countCards[char] += 1;
    } else
    countCards[char] = 1;
  });

  let max = Math.max(...Object.values(countCards));
  let jokers = countCards['J'] ?? 0;
  let combined = max + jokers;
  
  if (countCards['J'] === max && max >= 2) {
    const { J, ...rest } = countCards;
    
    let newMax = Math.max(...Object.values(rest));
    
    if (newMax === -Infinity) newMax = 0;
    combined = newMax + jokers;    
  }
  
  switch (combined) {
    case 5:
      sets.fiveOfAKind.push({ cards: individualCards, score});
      break;
    case 4:
      sets.fourOfAKind.push({ cards: individualCards, score});
      break;
    case 3:
      if (Object.keys(countCards).length === 2 || (Object.keys(countCards).length === 3 && countCards['J'])) {
        sets.fullHouse.push({ cards: individualCards, score});
      } else {
        sets.threeOfAkind.push({ cards: individualCards, score});
      }
      break;
    case 2:
      if (Object.keys(countCards).length === 3) {
        sets.twoPair.push({ cards: individualCards, score});
      } else {
        sets.onePair.push({ cards: individualCards, score});
      }
      break;
    case 1:
      sets.highCard.push({cards: individualCards, score});
      break;
    default:
      console.error('nothing found', individualCards);
      break;
    
  }
}

lines.forEach((line) => {
  const [hand, score] = line.split(' ');

  sortHandToType(hand, parseInt(score));
});

const compareCards = (card1, card2) => {
  for (let i = 0; i < Math.min(card1.length, card2.length); i++) {
    const value1 = values.indexOf(card1[i]);
    const value2 = values.indexOf(card2[i]);

    if (value1 !== value2) {
      return value2 - value1;
    }
  }

  return card2.length - card1.length;
}

for (let type in sets) {
  sets[type].sort((a, b) => compareCards(a.cards, b.cards));
}

let rank = 1;
let score = 0;

for (let type in sets) {
  sets[type].forEach(set => {
    score += set.score * rank;
    rank += 1;
  }); 
}

console.log(score, rank);
