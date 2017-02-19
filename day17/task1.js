const md5 = require('md5');
const input = 'njfxhljp'; //'njfxhljp';

// pathfinding algorithm based on custom logic

// 1 means closed, 0 means open
// up, down, left, right
const open = (str) => {
	return md5(str).slice(0, 4).split('').map(x => x.match(/[b-f]/) ? 0 : 1);
};

const map = [
	[ 'DR', 'DLR', 'DLR', 'DL' ],
	[ 'UDR', 'UDLR', 'UDLR', 'UDL' ],
	[ 'UDR', 'UDLR', 'UDLR', 'UDL' ],
	[ 'UR', 'ULR', 'ULR', '' ]
];

//console.log(open('njfxhljp'));

const order = ['U', 'D', 'L', 'R'];
const exits = [];
const traverse = (path) => {
	const pos = [ 0, 0 ];
	path.split('').forEach(p => {
		switch(p) {
			case 'U': pos[1]--; break;
			case 'D': pos[1]++; break;
			case 'L': pos[0]--; break;
			case 'R': pos[0]++; break;
		}
	});
	//console.log('current position', pos);
	if(pos[0] >= 4 || pos[1] >= 4) {
		console.log('out of bounds', path);
	} else {
		const str = input.concat(path);
		//console.log('instructions', str);
		const isOpen = open(str);
		//console.log('is open', isOpen);
		const paths = map[pos[1]][pos[0]].split('').map(x => order.indexOf(x));
		//console.log(`paths available ${map[pos[1]][pos[0]]} from ${pos[0]}:${pos[1]}`);
		if(pos[0] === 3 && pos[1] === 3) {
			//console.log('found exit', path);
			exits.push(path);
		}
		paths.forEach(p => {
			//console.log(`testing path ${order[p]} from ${pos[0]}:${pos[1]}`);
			if(isOpen[p] === 0) {
				//console.log('path is open', order[p]);
				traverse(path.concat(order[p]));
			} else {
				//console.log('path is closed', order[p]);
			}
		});
		//console.log(isOpen, paths);
	}
};

traverse('');
const byLength = (a, b) => { return a.length - b.length; };
console.log(exits.sort(byLength)[0]);