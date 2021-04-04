import Game from "./Game";

const game = new Game();

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

	// this.state.player = board[7].split(" ")[1] === undefined ? "w" : board[7].split(" ")[1];

	// if (board[7].split(" ")[2] !== undefined) {
	// 	this.state.castling = board[7].split(" ")[2].split("");
	// } else {
	// 	this.state.castling = "-";
	// }

	// this.analiseCheckMate();

	game.piecePositions = piecePositions;

	return piecePositions;
}

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

function changeNames(array) {
	for (let i = 0; i < array.length; i++) {
		switch (array[i]) {
			case "r":
				array[i] = "black_rook";
				break;
			case "n":
				array[i] = "black_knight";
				break;
			case "b":
				array[i] = "black_bishop";
				break;
			case "q":
				array[i] = "black_queen";
				break;
			case "k":
				array[i] = "black_king";
				break;
			case "p":
				array[i] = "black_pawn";
				break;
			case "R":
				array[i] = "white_rook";
				break;
			case "N":
				array[i] = "white_knight";
				break;
			case "B":
				array[i] = "white_bishop";
				break;
			case "Q":
				array[i] = "white_queen";
				break;
			case "K":
				array[i] = "white_king";
				break;
			case "P":
				array[i] = "white_pawn";
				break;
			default:
				throw new "unexpected value in FEN"();
		}
	}

	return array;
}
