const R = require('ramda');
const fs = require('fs');
const lines = fs.readFileSync('./input.txt').toString().split('\n');
const getBrackets = (str) => str.match(/\[(.*?)\]/g);

const findABA = (str) => {
	let matches = [];
	for(let char=0; char< str.length; char++) {
		if(str[char] !== str[char+1] && str[char] === str[char+2]) {
			matches.push([str[char], str[char+1], str[char+2]].join(''));
		}
	}
	return matches;
};

const match = lines
	.filter(line => {
		const outside = line.replace(/\[(.*?)\]/g, ' ').split(' ');

		// search for any ABA inside the brackets
		const abaPairs = R.flatten(outside.map(findABA)).filter(x => x.length > 0);
		if(abaPairs.length > 0) {
			// convert all abaPairs to babPairs
			const babPairs = abaPairs.map(x => `${x[1]}${x[0]}${x[1]}`);

			// should see if the inside has any matching babPairs
			const brackets = getBrackets(line);
			const match = R.flatten(brackets.map(findABA)).filter(x => x.length > 0);

			const inter = R.intersection(babPairs, match);
			if(inter.length > 0) {
				//console.log(`SSL: ${line}`, inter);
				return true;
			}
		}

		return false;
	});

console.log(match.length);