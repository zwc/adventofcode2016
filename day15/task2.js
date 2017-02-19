const H = require('highland');
const R = require('ramda');

const discs = [
	{ size: 5, pos: 2, idx: 0 },
	{ size: 13, pos: 7, idx: 1 },
	{ size: 17, pos: 10, idx: 2 },
	{ size: 3, pos: 2, idx: 3 },
	{ size: 19, pos: 9, idx: 4 },
	{ size: 7, pos: 0, idx: 5 },
	{ size: 11, pos: 0, idx: 6 }
];

/*const discs = [
	{ size: 5, pos: 4, idx: 0 },
	{ size: 2, pos: 1, idx: 1 }
];*/

let index = 0;
const generator = H((push, next) => {
	push(null, index);
	index++;
	next();
});

H(generator)
	.map(pos => discs.map(d => (d.pos + index + d.idx) % d.size))
	.map(slots => R.sum(slots))
	.filter(x => x === 0)
	.take(1)
	.done(() => {
		console.log(index - 1);
	});
