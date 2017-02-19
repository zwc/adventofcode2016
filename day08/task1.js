const screen = [
	Array(50).fill(false),
	Array(50).fill(false),
	Array(50).fill(false),
	Array(50).fill(false),
	Array(50).fill(false),
	Array(50).fill(false)
];

const fs = require('fs');
const lines = fs.readFileSync('./input.txt').toString().split('\n');

function shiftArrayToRight(arr, places) {
	for (var i = 0; i < places; i++) {
		arr.unshift(arr.pop());
	}
}

const final = lines.reduce((acc, line) => {
	const instr = line.split(' ');
	if(instr[0] === 'rect') {
		const area = instr[1].split('x').map(x => parseInt(x));
		for(y=0;y<area[1];y++) {
			for(x=0;x<area[0];x++) {
				acc[y][x] = true;
			}
		}
	}
	if(instr[0] === 'rotate') {
		if(instr[1] === 'column') {
			// push column X to the down Y pixels
			const col = instr[2].split('=')[1];
			const amount = instr.pop();
			console.log(`column ${col} push by ${amount}`);
			for(let times=0; times<amount; times++) {
				const save = acc[5][col];
				for(let row=5; row>=1; row--) {
					console.log(`shifting ${row}:${col} to be ${row-1}:${col}`);
					acc[row][col] = acc[row-1][col];
				}
				console.log(`setting ${col}:0 to be ${col}:5`);
				acc[0][col] = save;
			}
		}
		if(instr[1] === 'row') {
			// push row X to the right Y pixels
			const row = instr[2].split('=')[1];
			const amount = parseInt(instr.pop());
			console.log(`row ${row} push by ${amount}`);
			shiftArrayToRight(acc[row], amount)
		}
	}
	return acc;
}, screen);

// visual represenation
console.log(final.map(l => {
	return l.map(x => x ? '#' : '.').join('')
}));

let sum = 0;
for(let i=0; i<6; i++) {
	sum += final[i].filter(x => x === true).length;
}