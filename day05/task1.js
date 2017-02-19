const R = require('ramda');
const M = require('most');
const md5 = require('md5-jkmyers');
const input = 'uqwqemis';

function* hash5x0() {
	let i=0;
	while(true) {
		i++;
		const hash = md5(input + i);
		if(hash.startsWith('00000')) {
			yield hash;
		}
	}
}

const password = M.from(hash5x0())
	.map(R.nth(5))
	.take(8)
	.reduce(R.concat, '');

Promise.resolve(password)
	.then(x => console.log(x));