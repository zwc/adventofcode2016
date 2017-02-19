const R = require('ramda');

const input = R.compose( R.split(', '), R.toString, require('fs').readFileSync )('./input.txt');
const directions = [ [0, 1], [1, 0], [0, -1], [-1, 0] ];

const turn = (x, mod) => ((x +mod) + directions.length) % directions.length;
const turnLeft = (x) => turn(x, -1);
const turnRight = (x) => turn(x, 1);

const walk = (acc, value) => {
	const [ direction, steps ] = [ R.head(R.match(/[LR]/, value)), R.head(R.match(/[0-9]+/g, value)) ];
	if(direction === 'L') acc.direction = turnLeft(acc.direction);
	if(direction === 'R') acc.direction = turnRight(acc.direction);

	acc.position = R.zipWith(R.add, acc.position, R.map(R.multiply(steps), directions[acc.direction]));
	return acc;
};

const result = R.reduce(walk, { direction: 0, position: [ 0, 0 ] }, input);
const distance = R.sum(R.map(Math.abs, result.position));
console.log(distance);