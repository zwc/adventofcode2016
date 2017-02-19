const R = require('ramda');

const input = require('fs').readFileSync('./input.txt').toString().split('\n');

let pos = 0;
const register = {
	a: 12,
	b: 0,
	c: 0,
	d: 0
};
let counter = 0;
while(pos < input.length) {
	const code = input[pos].split(' ');
	counter++;
	if(counter % 10000000 === 0) { console.log('10M operations', register.a); }
	//console.log(code, register);
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
				if(code[2].match(/[a-z]/g)) {
					//console.log('jnz', register[code[2]]);
					pos += parseInt(register[code[2]]);
				} else {
					//console.log('jnz', code[2]);
					pos += (parseInt(code[2]));
				}
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
		case 'tgl': {
			const where = pos + register[code[1]];
			console.log(`toggle at ${where} which is ${input[where]} at ${pos}`);
			if(input[where]) {
				const replaces = [
					['dec', 'inc'],
					['inc', 'dec'],
					['tgl', 'inc'],
					['cpy', 'jnz'],
					['jnz', 'cpy']
				];
				const current = replaces.filter(x => input[where].split(' ')[0] === x[0]).pop();
				input[where] = input[where].replace(current[0], current[1]);
				console.log(current);
				console.log(`its now ${input[where]}`);
			}
			pos++;
			break;
		}
	}
	//console.log(register);
}

// 479010625 is correct, after a looooooong while

console.log('I am done', register);