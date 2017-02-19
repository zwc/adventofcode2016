const H = require('highland');
const R = require('ramda');

const input = require('fs').readFileSync('./input.txt').toString().split('\n').splice(2);
const notEmptyString = str => str !== '';
const numberT = (str) => +str.slice(0, -1);

const readLine = arr => ({
	id: arr[0],
	size: numberT(arr[1]),
	used: numberT(arr[2]),
	avail: numberT(arr[3])
});

const splitData = R.compose(R.filter(notEmptyString), R.split(' '));

const findEmpty = (nodes) => ({
	empty: nodes.filter(node => node.used === 0),
	notEmpty: nodes.filter(node => node.used !== 0)
});

const matchEmpty = (nodes) => nodes.notEmpty.filter(node => R.head(nodes.empty).avail >= node.used);

H(input)
	.map(splitData)
	.map(readLine)
	.collect()
	.map(findEmpty)
	.map(matchEmpty)
	.apply(nodes => {
		console.log(nodes.length);
	});

// 924 is the correct answer
