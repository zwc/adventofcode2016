const R = require('ramda');
const fs = require('fs');
const lines = fs.readFileSync('./input.txt').toString().split('\n');
const columns = [];

for(let col=0; col<lines[0].length; col++) {
	columns.push(lines.map(x => x[col]));
}

const solution = columns
	.map(chars => {
		const hist = R.countBy(R.toLower, chars);
		const arr = Object.keys(hist).map(key => ({ [key]: hist[key] }));
		const getValue = (obj) => obj[Object.keys(obj)[0]];
		const arr2 = arr.sort((a, b) => {
			const aVal = getValue(a);
			const bVal = getValue(b);
			return bVal - aVal;
		});
		return Object.keys(arr2.shift())[0];
	});

console.log(solution.join(''));