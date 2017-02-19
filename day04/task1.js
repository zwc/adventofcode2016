const R = require('ramda');
const lines = require('fs').readFileSync('./input.txt').toString().split('\n');

const test = [
	'aaaaa-bbb-z-y-x-123[abxyz]',
	'a-b-c-d-e-f-g-h-987[abcde]',
	'not-a-real-room-404[oarel]',
	'totally-real-room-200[decoy]'
];

const getName = (str) => str.split('-').slice(0, -1).join('');
const getChecksum = (str) => str.match(/\[(.*?)\]/g).pop().slice(1, -1);
const getSectorID = (str) => parseInt(str.split('-').pop().split('[').shift());

let sum = 0;
lines
	.filter(x => {
		const cs = getChecksum(x);
		const name = getName(x);
		const hist = R.countBy(R.toLower)(name); // make a histogram of usage of each char in the string

		// the histogram needs to be reduced to top 5 (either by value or by alphabet)
		// first; make it into an array
		const arr = Object.keys(hist).map(key => ({ [key]: hist[key] }));
		const getValue = (obj) => obj[Object.keys(obj)[0]];
		const getCharCode = (obj) => Object.keys(obj)[0].charCodeAt(0);
		// then sort the array by counts and if tied by alphabet
		const arr2 = arr.sort((a, b) => {
			const aVal = getValue(a);
			const bVal = getValue(b);
			if(aVal === bVal) {
				return getCharCode(a) - getCharCode(b);
			}
			return bVal - aVal;
		});
		// then take top 5 of those
		const arr3 = arr2.slice(0, 5);
		// then reduce it back to an object
		const finalHistogram = arr3.reduce((acc, obj) => {
			const prop = Object.keys(obj)[0];
			acc[prop] = obj[prop];
			return acc;
		}, {});

		// map each char in the checksum with the histogram
		const checksum = cs
			.split('')
			.map(x => finalHistogram[x]);

		const diff = (a, b) => { return b - a; };
		const sorted = R.sort(diff, checksum);

		// if all chars in the checksum are found (not undefined) and
		// the sorted version is the same as the current version, it's a valid room
		const isReal =
			!checksum.includes(undefined) &&
			R.equals(checksum, sorted);

		// if it's a valid room, add the sum
		if(isReal) {
			const sId = getSectorID(x);
			sum += sId;
		}
	});

console.log(sum);
