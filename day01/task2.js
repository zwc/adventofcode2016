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

	// Add an array of visits
	for(let step=0;step<steps; step++) {
		acc.position = R.zipWith(R.add, acc.position, R.map(R.multiply(1), directions[acc.direction]));
		acc.visits.push(`${acc.position[0]},${acc.position[1]}`);
	}

	return acc;
};

// Finding the first dupe
const findFirst = ( acc, x ) => R.ifElse( R.compose( R.contains( x ), R.tail ), R.compose( R.reduced, R.head ), R.tail)( acc );

const result = R.reduce(walk, { direction: 0, position: [ 0, 0 ], visits: [] }, input);
const firstDupe = R.reduce( findFirst, result.visits, result.visits );
const distance = R.sum(R.map(Math.abs, firstDupe.split(',')));
console.log(distance);