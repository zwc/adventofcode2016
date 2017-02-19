const input = require('fs')
	.readFileSync('./input.txt')
	.toString()
	.split('\n')
	.map(line => line.split('-')
	.map(i => +i));

const MAX = 4294967295;

input.sort((a, b) => a[0] > b[0] ? 1 : -1);

let lastMax = -1;
let allowedCount = 0;
for(let i=0; i<input.length; i++) {
	const glitches = Math.max(0, input[i][0] - lastMax - 1); // lowest value found yet
	allowedCount += glitches;
	lastMax = Math.max(lastMax, input[i][1]); // save last highest value
}
allowedCount += Math.max(0, MAX - lastMax);
console.log(allowedCount); // sum of all glitches