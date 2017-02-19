const input = 3004953;

const remainder = (value) => parseInt(value.toString(2).slice(1), 2); // this is the L
const solution = (input) => remainder(input) * 2 + 1;

// even simplier solution is to "take" the binary from the start and place it on the end
// and that should be the "winner"

console.log(solution(input));