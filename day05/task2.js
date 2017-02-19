const H = require('highland');
const md5 = require('spark-md5');
const input = 'uqwqemis';

let index = 0;
let filled = [];
const generator = H((push, next) => {
	push(null, md5.hash(input + index));
	index++;
	next();
});

generator
	.filter(x => x.slice(0, 5) === '00000')
	.filter(x => x[5] <= 7)
	.reject(x => filled.includes(x[5]))
	.map(x => {
		filled.push(x[5]);
		return { position: x[5], letter: x[6] };
	})
	.tap(H.log)
	.take(8)
	.sortBy((a, b) => {
		return a.position - b.position;
	})
	.collect()
	.apply((password) => {
		console.log(password.map(x => x.letter).join(''));
	});