export default class Game {
	constructor() {
		this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq";
		this.piecePositions = [[], [], [], [], [], [], [], []];
	}

	set currentFen(newCurrentFen) {
		this.fen = newCurrentFen;
	}

	get currentFen() {
		return this.fen;
	}

	/**
	 * @param {any[][]} newPositions
	 */
	set piecePositions(newPositions) {
		this.positions = newPositions;
	}

	get PiecePositions() {
		return this.positions;
	}
}
