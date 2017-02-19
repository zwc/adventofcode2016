/**
 Call the data you have at this point "a".
 Make a copy of "a"; call this copy "b".
 Reverse the order of the characters in "b".
 In "b", replace all instances of 0 with 1 and all 1s with 0.
 The resulting data is "a", then a single 0, then "b".
*/

const R = require('ramda');
const H = require('highland');

const fold = (str) => {
	return str.concat(
		0,
		str.split('').map(x => x === '1' ? 0 : 1).reverse().join('')
	);
};

const input = '01110110101001000';

const generator = H((push, next) => {
	push(null, index);
	index = fold(index);
	next();
});

const unfold = (str) => {
	return R.splitEvery(2, str).map(x => ['00', '11'].includes(x) ? '1' : '0').join('');
};

let index = input;
H(generator)
	.filter(x => index.length >= 272)
	.take(1)
	.tap(H.log)
	.done(() => {
		console.log(index);
		let checksum = index.substr(0, 272);
		while(checksum.length % 2 === 0) {
			checksum = unfold(checksum);
		}
		console.log('final checksum', checksum);
	});

console.log(unfold('110010110100'));