const fs = require('fs');
const lines = fs.readFileSync('./input.txt').toString().split('\n');
const emptyStrings = x => x !== '';
const input = lines.map(l => l.split(' ').filter(emptyStrings));

let triangles = 0;
for(let row=0; row<3; row++) {
	const numbers = input.map(line => parseInt(line[row]));
	for(let group=0; group<numbers.length / 3; group++) {
		const sides = [
			numbers[group * 3 + 0],
			numbers[group * 3 + 1],
			numbers[group * 3 + 2]
		];
		const isValid = ((sides[0] + sides[1]) > sides[2] &&
			(sides[0] + sides[2]) > sides[1] &&
			(sides[1] + sides[2]) > sides[0]);
		if(isValid) {
			triangles++;
		}
	}
}

console.log(triangles);