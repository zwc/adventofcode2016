const fs = require('fs');
const decompress = require('./decompress');
const crunch = fs.readFileSync('./input.txt').toString();
const uncompressed = decompress(crunch);
console.log(uncompressed.length);