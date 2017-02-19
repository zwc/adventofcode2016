const R = require('ramda');
const input = '^..^^.^^^..^^.^...^^^^^....^.^..^^^.^.^.^^...^.^.^.^.^^.....^.^^.^.^.^.^.^.^^..^^^^^...^.....^....^.';

const rows = 40;
const map = [ input ];
const unsigned = (i) => {
	if (i < 0) { return 0; }
	return i;
};
for(let i=0; i<(rows-1);i++) {
	const nextRow = [];
	const traps = [
		'^^.',
		'.^^',
		'^..',
		'..^'
	];
	for(let x=0; x<100;x++) {
		// left and center is traps, but right tile is not
		let str = map[i].slice(unsigned(x-1), x+2);
		if(x === 0) { str = `.${str}`; }
		if(x === 99) { str = `${str}.`; }
		if(traps.includes(str)) {
			nextRow.push('^');
		} else {
			nextRow.push('.');
		}
	}
	map.push(nextRow.join(''));
}
console.log(map);

let safe = 0;
map.forEach(row => {
	row.split('').forEach(tile => {
		if(tile === '.') safe++;
	});
});
console.log(safe);

// 2068 is too high