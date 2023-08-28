// dndMath.js
import classesData from "../backend/data/classes.json";
import classesPrestigeData from "../backend/data/classesPrestige.json";


const sizeMap = {
  Fine: 0,
  Diminutive: 1,
  Tiny: 2,
  Small: 3,
  Medium: 4,
  Large: 5,
  Huge: 6,
  Gargantuan: 7,
  Colossal: 8,
};
const sizeDiceMap = {
  0: "1d2",
  1: "1d3",
  2: "1d4",
  3: "1d6",
  4: "1d8",
  5: "2d6",
  6: "3d6",
  7: "4d6",
  8: "5d6",
};

const rollDice = (diceString) => {
  const [numDice, numSides] = diceString.split("d").map(Number);
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += Math.floor(Math.random() * numSides) + 1;
  }
  return total;
};

const getDiceProgression = (size) => {
  const sizeIndex = sizeMap[size];
  const diceString = sizeDiceMap[sizeIndex];
  return diceString;
};

const calculateNewDamage = (oldSize, oldDamage, newSize) => {
  const oldSizeIndex = sizeMap[oldSize];
  const newSizeIndex = sizeMap[newSize];

  if (oldSizeIndex === undefined || newSizeIndex === undefined) {
    throw new Error("Invalid size value");
  }

  const oldDice = sizeDiceMap[oldSizeIndex];
  const newDice = sizeDiceMap[newSizeIndex];

  const [oldDiceNum, oldDiceSides] = oldDice.split("d").map(Number);
  const [newDiceNum, newDiceSides] = newDice.split("d").map(Number);

  if (
    isNaN(oldDiceNum) ||
    isNaN(oldDiceSides) ||
    isNaN(newDiceNum) ||
    isNaN(newDiceSides)
  ) {
    throw new Error("Invalid dice string format");
  }

  return `${oldDiceNum * oldDiceSides} to ${newDiceNum * newDiceSides} damage`;
};


const calculateModifier = (attribute) => {
  return Math.floor((attribute - 10) / 2);
};

const getClassBaseAttackBonus = (baseAttackBonusType) => {
  const baseAttackBonuses = {
    High: 1,
    Medium: 0.75,
    Low: 0.5,
  };

  return baseAttackBonuses[baseAttackBonusType];
};


const calculateBaseAttackBonus = (classes) => {
  let totalBAB = 0;

  for (const classInfo of classes) {
    let classData = classesData.find(
      (data) => data.name === classInfo.class
    );

    if (classData === undefined) {
      classData = classesPrestigeData.find(
        (data) => data.name === classInfo.class
      );
    }

    if (classData && classData.baseAttackBonus !== undefined) {
      const classBAB = getClassBaseAttackBonus(classData.baseAttackBonus);
      let babToAdd = classBAB * classInfo.level;
      babToAdd = Math.floor(babToAdd);
      totalBAB += babToAdd;
    }
  }

  return totalBAB;
};




export { rollDice, calculateNewDamage, sizeMap,calculateModifier, calculateBaseAttackBonus, getDiceProgression, getClassBaseAttackBonus };
