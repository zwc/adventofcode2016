const lines = require('fs').readFileSync('./input.txt').toString().split('\n');
const emptyStrings = x => x !== '';
const input = lines.map(l => l.split(' ').filter(emptyStrings));

const valid = input.filter(tri => {
	const sides = tri.map(x => parseInt(x));
	const isValid = ((sides[0] + sides[1]) > sides[2] &&
			(sides[0] + sides[2]) > sides[1] &&
			(sides[1] + sides[2]) > sides[0]);
	return isValid;
});

console.log(valid.length);