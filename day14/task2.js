const H = require('highland');
const md5 = require('md5');
const input = 'qzyelonm';
const R = require('ramda');

const memoize = {};

const megaHash = (str) => {
	let hash = str;
	if(memoize[str]) return memoize[str];
	for(let i=0;i<=2016;i++) {
		hash = md5(hash);
	}
	memoize[str] = hash;
	return hash;
};

let index = 0;
const generator = H((push, next) => {
	push(null, megaHash(input + index));
	index++;
	next();
});

const triplet = (str) => {
	let found = false;
	for(let i=0;i<str.length; i++) {
		if(str[i] === str[i+1] && str[i] === str[i+2] && !found) {
			found = true;
			for(x=index+1; x<=index+1000;x++) {
				if(five(megaHash(input + x), str[i])) {
					console.log(`found triplet ${str[i]} in ${str} with matching five at ${index} vs ${x}`);
					return true;
				}
			}
		}
	}
	return false;
};

const five = (str, char) => {
	const compare = Array(5).fill(char).join('');
	for(let i=0;i<str.length; i++) {
		if(str.slice(i, i+5) === compare) {
			console.log(`found five of ${char} vs ${str}`);
			return true;
		}
	}
};

generator
	.filter(triplet)
	.take(64)
	.done(() => {
		console.log(index);
	});

// guess 20736 (too high)
// guess 10565 (too low)
// guess 14741 (too low)
// guess 15189 (blah)
// guess 15168 (because I missed out on the criteria of it had to be the first triplet)

// 2nd task
// 40680 first guess
// 20864 second guess, correct :D