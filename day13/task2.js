const favorite = 1364;
const formula = (x, y) => (x*x) + (3*x) + (2*x*y) + y + (y*y) + favorite;

const isWall = (x) => !!((parseInt(x).toString(2).match(/1/g) || []).length % 2);

const maxY = 40;
const maxX = 40;
const maze = [];
for(let y=0; y<=maxY; y++) {
	const line = [];
	for(let x=0; x<maxX; x++) {
		const node = isWall(formula(x, y)) ? 1 : 0;
		line.push(node);
	}
	//console.log(line.join(''));
	maze.push(line);
}

// Y => 0 -> 49, 1 => 48, 2 => 47 ... <Y = 49 - Y>
let hits = 0;
for(let y=0; y<=maxY; y++) {
	for(let x=0; x<maxX; x++) {
		try {
			const result = snake.solve({
				maze,
				start: [1, 39],
				end: [x, y],
				heuristic: 'breadthFirst'
			});
			if(result.cost > 0 && result.cost <= 50) {
				hits++;
				//snake.paint(result);
			}
		} catch(e) {
			// invalid input
		}
	}
}
console.log(hits);

//snake.paint(result);