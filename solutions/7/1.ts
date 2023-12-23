import { readFromFile } from "../../utils/read-from-file.ts";

const data = await readFromFile(7, false);
const lines = data.split('\n');

const values = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

let fiveOfAKind = [];
let fourOfAKind = [];
let fullHouse = [];
let threeOfAkind = [];
let twoPair = [];
let onePair = [];
let highCard = [];

const sortHandToType = (hand: string, score: number) => {
  const individualCards = hand.split('');

  let countCards = new Object();

  individualCards.forEach(char => {
    if (Object.keys(countCards).find(key => key === char)) {
      countCards[char] += 1;
    } else
    countCards[char] = 1;
  });

  if (Object.keys(countCards).length === 1) {
    fiveOfAKind.push({ cards: individualCards, score});
  }
  
  if (Object.keys(countCards).length === 2) {
    if (Object.values(countCards).includes(4)) {
      fourOfAKind.push({ cards: individualCards, score});
    } else {
      fullHouse.push({ cards: individualCards, score});
    }
  }
  
  if (Object.keys(countCards).length === 3) {
    if (Object.values(countCards).includes(3)) {
      threeOfAkind.push({ cards: individualCards, score});
    } else {
      twoPair.push({ cards: individualCards, score});
    }
  }

  if (Object.keys(countCards).length === 4) {
    onePair.push({ cards: individualCards, score});
  }
  
  if (Object.keys(countCards).length === 5) {
    highCard.push({ cards: individualCards, score});
  }
}

lines.forEach((line) => {
  const split = line.split(' ');

  sortHandToType(split[0], parseInt(split[1]));
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

fiveOfAKind.sort((a, b) => compareCards(a.cards, b.cards));
fourOfAKind.sort((a, b) => compareCards(a.cards, b.cards));
fullHouse.sort((a, b) => compareCards(a.cards, b.cards));
threeOfAkind.sort((a, b) => compareCards(a.cards, b.cards));
twoPair.sort((a, b) => compareCards(a.cards, b.cards));
onePair.sort((a, b) => compareCards(a.cards, b.cards));
highCard.sort((a, b) => compareCards(a.cards, b.cards));

let rank = 1;
let score = 0;

highCard.forEach(set => {
  score += set.score * rank;
  rank += 1;
});

onePair.forEach(set => {
  score += set.score * rank;
  rank += 1;
});

twoPair.forEach(set => {
  score += set.score * rank;
  rank += 1;
});

threeOfAkind.forEach(set => {
  score += set.score * rank;
  rank += 1;
});

fullHouse.forEach(set => {
  score += set.score * rank;
  rank += 1;
});

fourOfAKind.forEach(set => {
  score += set.score * rank;
  rank += 1;
});

fiveOfAKind.forEach(set => {
  score += set.score * rank;
  rank += 1;
});

console.log(score, rank);

