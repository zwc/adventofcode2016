const input = require('fs')
	.readFileSync('./input.txt')
	.toString()
	.split('\n')
	.map(line => line.split('-')
	.map(i => +i));

input.sort((a, b) => a[0] > b[0] ? 1 : -1);

let lastMax = -1;
let firstAllowed;
for(let i=0; i<input.length; i++) {
	const currentLow = Math.max(0, input[i][0] - lastMax - 1); // lowest value found yet
	if (firstAllowed === undefined && currentLow) firstAllowed = lastMax + 1; // if there's a glitch; save the first value of the glitch
	lastMax = Math.max(lastMax, input[i][1]); // save last highest value
}
console.log(firstAllowed); // first found "glitch" after sorting the array