const R = require('ramda');

const input = require('fs').readFileSync('./input.txt').toString().split('\n');

let pos = 0;
const register = {
	a: 0,
	b: 0,
	c: 0,
	d: 0
};
while(pos < input.length) {
	const code = input[pos].split(' ');
	//console.log(code);
	switch(code[0]) {
		case 'cpy':
			if(code[1].match(/[a-z]/g)) {
				register[code[2]] = parseInt(register[code[1]]);
			} else {
				register[code[2]] = parseInt(code[1]);
			}
			pos++;
			break;
		case 'jnz':
			if(register[code[1]] !== 0) {
				//console.log('prev pos', pos);
				pos += (parseInt(code[2]));
				//console.log('new pos', pos);
				// 2 would be same as ++, -1 would do the previous instruction
			} else {
				pos++;
			}
			break;
		case 'inc':
			register[code[1]] += 1;
			pos++;
			break;
		case 'dec':
			register[code[1]] -= 1;
			pos++;
			break;
	}
	//console.log(register);
}

console.log('I am done', register);