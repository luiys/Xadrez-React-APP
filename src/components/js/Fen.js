import Game from "./Game";

const game = new Game();

var _global = {
	currentFEN: "",
	player: "w",
};

export function fen_analyzer(param) {
	let board = param.split("/");
	let lines = [];

	var piecePositions = [[], [], [], [], [], [], [], []];

	for (let i = 0; i < 7; i++) {
		lines.push(board[i].split(""));
		changeNames(lines[i]);
		piecePositions = createPiecesPosition(lines[i], i, piecePositions);
	}

	lines.push(board[7].split(" ")[0].split(""));
	changeNames(lines[7]);
	createPiecesPosition(lines[7], 7, piecePositions);

	function createPiecesPosition(line, numberLine, piecePositions) {
		var numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
		var lastPosition = 0;
		for (let i = 0; i < line.length; i++) {
			if (numbers.includes(line[i])) {
				line[i] = parseInt(line[i]);
				lastPosition = lastPosition + line[i];
			} else {
				piecePositions[numberLine][lastPosition] = line[i];
				lastPosition = lastPosition + 1;
			}
		}

		return piecePositions;
	}

	game.piecePositions = piecePositions;

	return piecePositions;
}

export function create_fen(positions) {
	let line = [];

	for (let i = 0; i < 8; i++) {
		line.push(line_fen(i).join(""));
	}

	function line_fen(line) {
		var final_line = [];
		var count = 0;

		for (var i = 0; i < 8; i++) {
			if (positions[line][i] === undefined) {
				count++;
				if (i === 7) {
					final_line.push(count);
				}
			} else if (positions[line][i] !== undefined) {
				if (count !== 0) {
					final_line.push(count);
				}
				final_line.push(positions[line][i]);
				count = 0;
			}
		}

		return inverseChangeNames(final_line);
	}

	_global.currentFEN = line.join("/");

	return line.join("/");
}

function changeNames(array) {
	for (let i = 0; i < array.length; i++) {
		const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
		if (!numbers.includes(array[i])) {
			let color = array[i] === array[i].toLowerCase() ? "black" : "white";

			const pieces = {
				r: "rook",
				n: "knight",
				b: "bishop",
				q: "queen",
				k: "king",
				p: "pawn",
			};

			array[i] = `${color}_${pieces[array[i].toLowerCase()]}`;
		}
	}
}

function inverseChangeNames(array) {
	for (let i = 0; i < array.length; i++) {
		switch (array[i]) {
			case "black_rook":
				array[i] = "r";
				break;
			case "black_knight":
				array[i] = "n";
				break;
			case "black_bishop":
				array[i] = "b";
				break;
			case "black_queen":
				array[i] = "q";
				break;
			case "black_king":
				array[i] = "k";
				break;
			case "black_pawn":
				array[i] = "p";
				break;
			case "white_rook":
				array[i] = "R";
				break;
			case "white_knight":
				array[i] = "N";
				break;
			case "white_bishop":
				array[i] = "B";
				break;
			case "white_queen":
				array[i] = "Q";
				break;
			case "white_king":
				array[i] = "K";
				break;
			case "white_pawn":
				array[i] = "P";
				break;
			default:
			//ok
		}
	}

	return array;
}
