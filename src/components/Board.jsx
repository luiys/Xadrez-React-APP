import React from "react";
import Square from "./Squares";
import { fen_analyzer as putPiecesOnBoard } from "./Fen";

import "./style.css";

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// random_pos: "qq4n1/2QNqq2/N1Q1pqPn/1rrNpRP1/1rbNR1P1/kQ1RB1P1/2Q1K1P1/8 w - - 0 1",
			inicial_pos: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq",
			positions: [[], [], [], [], [], [], [], []],
			currentFen: "",
		};
	}

	createSquares(numberLine) {
		var line = this.state.positions[numberLine];
		var content;

		for (let i = 0; i < 8; i++) {
			line[i] = line[i] === undefined ? undefined : line[i];
		}

		if (numberLine % 2 === 0) {
			content = line.map((piece, index) => {
				var color = index % 2 === 0 ? "#EEEED2" : "#769656";
				return <Square key={index} color={color} piece={piece} onClick={() => this.movePiece(piece, numberLine, index)} />;
			});
		} else {
			content = line.map((piece, index) => {
				var color = index % 2 !== 0 ? "#EEEED2" : "#769656";
				return <Square key={index} color={color} piece={piece} onClick={() => this.movePiece(piece, numberLine, index)} />;
			});
		}

		return content;
	}

	componentDidMount() {
		this.setState({ positions: putPiecesOnBoard(this.state.inicial_pos) });
	}

	render() {
		return (
			<div className="board">
				<div className="line">{this.createSquares(0)}</div>
				<div className="line">{this.createSquares(1)}</div>
				<div className="line">{this.createSquares(2)}</div>
				<div className="line">{this.createSquares(3)}</div>
				<div className="line">{this.createSquares(4)}</div>
				<div className="line">{this.createSquares(5)}</div>
				<div className="line">{this.createSquares(6)}</div>
				<div className="line">{this.createSquares(7)}</div>
			</div>
		);
	}
}

export default Board;
