const fs = require('fs');
const R = require('ramda');
const lines = fs.readFileSync('./input.txt').toString().split('\n');

const test = [
	'aaaaa-bbb-z-y-x-123[abxyz]',
	'a-b-c-d-e-f-g-h-987[abcde]',
	'not-a-real-room-404[oarel]',
	'totally-real-room-200[decoy]'
];

const getName = (str) => str.split('-').slice(0, -1);
const getSectorID = (str) => parseInt(str.split('-').pop().split('[').shift());

let sum = 0;

// just shift one up
const shift = (sid) => (letter) => {
	const code = letter.charCodeAt(0) - 97;
	const uncrypted = (code + sid) % 26;
	return String.fromCharCode(97 + uncrypted);
};

lines
	.filter(line => {
		const sId = getSectorID(line);
		const name = getName(line);
		const decrypt =
			name.map(part => {
				return part
					.split('')
					.map(shift(sId))
					.join('');
			});
		 const match = R.equals(decrypt, ['northpole', 'object', 'storage']);
		 if(match) {
		 	console.log(`match at ${sId}`);
		 }
	});
