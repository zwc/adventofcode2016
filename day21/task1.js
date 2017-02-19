const H = require('highland');
let code = 'abcdefgh';

const input = require('fs')
	.readFileSync('./input.txt')
	.toString()
	.split('\n')
	.map(line => line.split(' '));

H(input)
	.tap(ic => {
		switch(ic[0]) {
			case 'move': {
				console.log('move');
				const moveFrom = +ic[2];
				const moveTo = +ic[5];
				const save = code[moveFrom];
				code = code.replace(save, '');
				code = code.slice(0, moveTo).concat(save, code.slice(moveTo));
			}
			break;
			case 'swap': {
				console.log('swap');
				const moveFrom = +ic[2];
				const moveTo = +ic[5];
				const save = code[moveTo];
				code[moveTo] = code[moveFrom];
				code[moveFrom] = save;
			}
			break;
			case 'reverse':
				const start = +ic[2];
				const end = +ic[4];
				//console.log(`reverse ${start}-${end} ${code}`);
				const rev =
						code.slice(0, start).concat(
							code.slice(start, end).split('').reverse().join(''),
							code.slice(end)
						)
					code = rev;
				console.log('reversed', code);
				break;
			case 'rotate':
				// either by steps left/right
				// or by something else
				console.log('')
				break;
		}
	})
	.tap(() => {
		console.log(code);
	})
	.take(10)
	.done(result => {
		console.log(code);
	});