const R = require('ramda');
const combinations = require('combinations');

// final input
/*const floors = [
	[ 'pg', 'tg', 'tm', 'xg', 'rg', 'rm', 'cg', 'cm' ],
	[ 'pm', 'xm' ],
	[ ],
	[ ],
];*/

// more simple input
const floors = [
	[ 'hm', 'lm' ],
	[ 'hg' ],
	[ 'lg' ],
	[]
];

const currentFloor = 0;

// You start on first floor
// Everything should go to 4th floor (3)
// Any P-C that does not have it's generator and another generator destroys the sequence
// You can bring up to 2 equipment each time
// You can only go 1 floor at at time
// You must have 1 item with out everytime you move the elevator; this makes you not able just to dump pairs on top floor

// Analysis of the problem

// Optimisations to reduce the search tree
// If floor 0 is empty; never move anything down to floor 0
// If floor 0 && 1 is empty; never move anything down to floor 1 ... etc
// If you can move 2 things upstairs, don't even try moving 1
// If you can move 1 item downstairs, don't even try moving 2

// Even more EASIER WAY
// Any complete pairs on floor 1 add 12 steps to the solution
// Complete pairs on floor 2 add 8 steps
// Complete pairs on floor 3 add 4 steps

// Implement: Possible moves

const isValid = (pieces) => {
	// any microchip that is alone (without its master) and there is a another "free" generator
	const chips = pieces.filter(f => f.match(/m/));
	const soloChips = chips.filter(t => !pieces.includes(`${t[0]}g`));

	const generators = pieces.filter(f => f.match(/g/));
	const soloGenerators = generators.filter(t => !pieces.includes(`${t[0]}g`));

	// If there are any solo chips and solo generators, the sequence is INVALID
	console.log(`solo chips, ${soloChips.length} solo gen ${soloGenerators.length}`);
	return !(soloChips.length > 0 && soloGenerators.length > 0)
};

// state is floors and currentFloor
const possibleMoves = (state) => {

	// try each individual piece and then each combination piece
	const combos = combinations(floors[0]).filter(x => x.length <= 2);
	console.log(`there are ${combos.length} combinations`);

	// first see if they can move up
	const currentFloor = state.floors[state.currentFloor];
	const valid = combos.filter(
		pieces => {
			console.log('looking at ', pieces);
			return isValid(R.without(pieces, currentFloor));
		}
		// would current floor fry any circuit?

		// would the next floor fry any circuits?
	);

	return valid;
};

const state = {
	floors,
	currentFloor
};

const moves = possibleMoves(state);
console.log(`there are ${moves.length} possible moves`);