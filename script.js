const graphFactory = (size) => {
	const chessBoard = new Map();
	const s = size;
	const addNodes = (size = s) => {
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				chessBoard.set(`${[i, j]}`, []);
			}
		}
		return chessBoard;
	};

	const addEdges = (board = chessBoard) => {
		for (let [node] of board) {
			const nodeArr = node.split(",");
			const x = parseInt(nodeArr[0]);
			const y = parseInt(nodeArr[1]);
			const direction = {
				1: [x + 1, y + 2],
				2: [x + 2, y + 1],
				4: [x + 2, y - 1],
				5: [x + 1, y - 2],
				7: [x - 1, y - 2],
				8: [x - 2, y - 1],
				10: [x - 2, y + 1],
				11: [x - 1, y + 2],
			};
			for (let clock in direction) {
				const move = direction[clock].toString();
				if (board.has(move) && !board.get(node).includes(move)) {
					chessBoard.get(node).push(move);
				}
			}
		}
		return chessBoard;
	};

	const knightMoves = (start, end) => {
		const paths = [];
		const visited = new Set();
		const queue = [];
		queue.push([start, [start]]);
		while (queue.length > 0) {
			let [current, path] = queue.shift();
			visited.add(current);
			if (current === end) {
				paths.push(path);
			}
			const moves = chessBoard.get(current);
			for (let move of moves) {
				if (!visited.has(move)) {
					queue.push([move, [...path, move]]);
				}
			}
		}
		console.log(`To Get from ${start} to ${end}`);
		paths.forEach((item) => console.log(item));
		console.log(`This took ${paths[0].length - 1} moves!`);
		console.log(`There are ${paths.length} different ways to arrives`);
	};

	return { addNodes, addEdges, knightMoves };
};

const g = graphFactory(8);
g.addNodes();
g.addEdges();
g.knightMoves("0,0", "1,2");
g.knightMoves("0,0", "3,3");
g.knightMoves("3,3", "0,0");
