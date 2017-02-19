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

// for every pair turn same (00 and 11) into 1 otherwise 0
const unfold = (str) => {
	return R.splitEvery(2, str).map(x => ['00', '11'].includes(x) ? '1' : '0').join('');
};

const length = 35651584;
let index = input;
H(generator)
	.filter(x => index.length >= length)
	.take(1)
	.done(() => {
		let checksum = index.substr(0, length);
		// repeat process of unfolding until length is uneven (%2 === 1)
		while(checksum.length % 2 === 0) {
			checksum = unfold(checksum);
		}
		console.log('final checksum', checksum);
	});

console.log(unfold('110010110100'));