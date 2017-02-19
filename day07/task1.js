const fs = require('fs');
const lines = fs.readFileSync('./input.txt').toString().split('\n');
const getBrackets = (str) => str.match(/\[(.*?)\]/g);

const findAbba = (str) => {
	for(let char=0; char< str.length; char++) {
		if(str[char] !== str[char+1] && str[char] === str[char+3] && str[char+1] == str[char+2]) {
			return true;
		}
	}
	return false;
};

const match = lines
	.filter(line => {
		// find all contents within brackets
		const brackets = getBrackets(line);

		// there must NOT be abba in any brackets
		if(brackets.map(findAbba).includes(true)) return false;

		// and there has to be one outside the brackets
		const inside = line.replace(/\[(.*?)\]/g, ' ').split(' ');
		if(inside.map(findAbba).includes(true)) return true;
		return false;
	});

console.log(match.length);