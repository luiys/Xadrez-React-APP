export default class Game {
	currentFen = "";
	piecePositions = [[], [], [], [], [], [], [], []];

	set fen(fen) {
		this.fen = fen;
	}

	get fen() {
		return this.fen;
	}

	set piecePositions(positions) {
		this.positions = positions;
	}

	get piecePositions() {
		return this.positions;
	}
}
