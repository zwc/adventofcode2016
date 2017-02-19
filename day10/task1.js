// quick and dirty
// just give all values to all bots
// run through the list from top to bottom

// first see if the instructions give more than 2 to any bot
const fs = require('fs');
const instructions = fs.readFileSync('./input.txt').toString().split('\n');

let bots = {};
instructions.forEach(instruction => {
	const x = instruction.split(' ');
	if(x[0] === 'value') {
		const value = parseInt(x[1]);
		const botId = parseInt(x[5]);
		console.log(`${botId} receives ${value}`);
		if(!bots[botId]) bots[botId] = [];
		bots[botId].push(value);
		if(bots[botId].length > 2) {
			console.log(`${botId} received more than 2 tokens`);
		}
	}
});
let outputs = {};

// So, after giving out all tokens, there is one bot with a double token
// So that bot should perform it's instructions and then the next bot should perform it's instructions
// Until we know WHO compared 61 with 17

doInstruction = (botId) => {
	const values = bots[botId];
	console.log(`giving out`, values);
	bots[botId] = []; // give away tokens
	instructions.forEach(line => {
		const x = line.split(' ');
		if(x[1] === botId) {
			console.log(`found instructions`);
			if(x[5] === 'bot') {
				const low = parseInt(x[6]);
				console.log(`low goes to bot ${low}`);
				if(!bots[low]) bots[low] = [];
				bots[low].push(Math.min(values[0], values[1]));
			}
			if(x[10] === 'bot') {
				const high = parseInt(x[11]);
				console.log(`high goes to bot ${high}`);
				if(!bots[high]) bots[high] = [];
				bots[high].push(Math.max(values[0], values[1]));
			}
			if(x[5] === 'output') {
				const low = parseInt(x[6]);
				console.log(`low goes to output ${low}`);
				if(!outputs[low]) outputs[low] = [];
				outputs[low].push(Math.min(values[0], values[1]));
			}
			if(x[10] === 'output') {
				const high = parseInt(x[11]);
				console.log(`high goes to output ${high}`);
				if(!outputs[high]) outputs[high] = [];
				outputs[high].push(Math.max(values[0], values[1]));
			}
		}
	});
};

let currentBot = Object.keys(bots).filter(key => bots[key].length === 2).pop();
while(currentBot) {
	console.log(`currentBot is ${currentBot}`);
	doInstruction(currentBot);
	currentBot = Object.keys(bots).filter(key => bots[key].length === 2).pop();
}

console.log(outputs);
