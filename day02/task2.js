const keypad2 = [
	[ null, null, 1, null, null ],
	[ null, 2, 3, 4, null ],
	[ 5, 6, 7, 8, 9 ],
	[ null, 'A', 'B', 'C', null ],
	[ null, null, 'D', null, null ]
];

const input = require('./input.json');

const max = 4;
const reducer = (acc, val) => {
	switch(val) {
		case 'D': if(acc.y < max && keypad2[acc.y + 1][acc.x] !== null) acc.y++; break;
		case 'U': if(acc.y > 0 && keypad2[acc.y - 1][acc.x] !== null) acc.y--; break;
		case 'R': if(acc.x < max && keypad2[acc.y][acc.x + 1] !== null) acc.x++; break;
		case 'L': if(acc.x > 0 && keypad2[acc.y][acc.x - 1] !== null) acc.x--; break;
	}
	return acc;
};

const fromKeypad = (coords) => {
	return keypad2[coords.y][coords.x];
};

let origin = { x: 0, y: 2 };
const pass = [];
input.forEach(code => {
	const coords = code.split('').reduce(reducer, origin);
	pass.push(fromKeypad(coords));
	origin = coords;
});

console.log(pass.join(''));