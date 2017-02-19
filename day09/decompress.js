const decompress = (str) => {
	// anything left of first ( is just returned as is ...
	// for each instruction, something has to be carried out; the "calculation" overwrites the instruction
	// then it "starts over" from where the calculation ended, if there is still something left in the string

	// one thing is to have a position and then just step left
	// until a instruction comes, then read the entire instruction
	// perform the instruction and then move the pointer to left according to how much that was carried out
	let counter = 0;
	let decompressed = '';
	while(counter < str.length) {
		const current = str[counter];
		if(current.match(/[A-Z]/)) {
			// no instructions, just add to the string
			decompressed = decompressed.concat(str[counter]);
			counter++;
		} else {
			const instructionsLength = str.substring(counter).indexOf(')') + 1;
			const afterInstructionsIndex = counter + instructionsLength;
			const instructions = str.substring(counter, afterInstructionsIndex);
			const split = instructions.slice(1, -1).split('x');
			const length = parseInt(split[0]);
			const times = parseInt(split[1]);
			const padWith = str.substring(afterInstructionsIndex, afterInstructionsIndex + length);
			decompressed = decompressed.concat(Array(times).fill(padWith).join(''));
			counter += length + instructions.length;
		}
	}

	return decompressed;
};

module.exports = decompress;