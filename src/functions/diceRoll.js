export const diceRollOptions = {
	"4d6 drop lowest": () => {
		const rolls = Array.from({
			length: 4
		}, () => Math.floor(Math.random() * 6) + 1);
		const lowestRoll = Math.min(...rolls);
		return rolls.reduce((total, roll) => total + roll, 0) - lowestRoll;
	},
	"3d6": () => {
		return Array.from({
			length: 3
		}, () => Math.floor(Math.random() * 6) + 1).reduce((total, roll) => total + roll, 0);
	},
	"2d6 + 6": () => {
		const sum = Array.from({
			length: 2
		}, () => Math.floor(Math.random() * 6) + 1).reduce((total, roll) => total + roll, 0);
		return sum + 6;
	},
	"5d6 drop two lowest": () => {
		const rolls = Array.from({
			length: 5
		}, () => Math.floor(Math.random() * 6) + 1);
		const sortedRolls = rolls.sort((a, b) => a - b);
		return sortedRolls.slice(2).reduce((total, roll) => total + roll, 0);
	},
	"1d20": () => {
		return Math.floor(Math.random() * 20) + 1;
	},
	"3d6 reroll 1s": () => {
		const rolls = Array.from({
			length: 3
		}, () => {
			let roll = Math.floor(Math.random() * 6) + 1;
			while (roll === 1) {
				roll = Math.floor(Math.random() * 6) + 1;
			}
			return roll;
		});
		return rolls.reduce((total, roll) => total + roll, 0);
	}
};
