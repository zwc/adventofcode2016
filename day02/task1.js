const R = require('ramda');

const keypad = [ R.range(1, 4), R.range(4, 7), R.range(7, 10) ];
const fromKeypad = (coords) => keypad[coords.y][coords.x];

const input = require('./input.json');

const max = 2;
const dec = R.ifElse(R.gte(0), R.identity, R.dec);
const inc = R.ifElse(R.lte(max), R.identity, R.inc);

const reducer = (acc, val) => {
	// Can I use evolve or anything else here? switch is so ugly
	switch(val) {
		case 'D': acc.y = inc(acc.y); break;
		case 'U': acc.y = dec(acc.y); break;
		case 'R': acc.x = inc(acc.x); break;
		case 'L': acc.x = dec(acc.x); break;
	}
	return acc;
};

const secret = [];

// mutable, tsk tsk
let origin = { x: 1, y: 1 };

// forEach is also a little dirty; maybe reduce with immutable origin?
input.forEach(code => {
	const coords = code.split('').reduce(reducer, origin);
	secret.push(fromKeypad(coords));
	origin = coords;
});

console.log(secret.join(''));