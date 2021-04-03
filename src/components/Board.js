import React from "react";
import Square from "./Squares";

import "./style.css";

class Board extends React.Component {
	constructor() {
		super();

		this.state = {
			positions: [["black_rook", "black_knight", "black_bishop", "black_queen", "black_king", "black_bishop", "black_knight", "black_rook"], [], [], [], [], [], [], []],
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
				return <Square key={index} color={color} piece={piece} onClick={() => this.movePiece(this.state.positions[2][7], 2, 7)} />;
			});
		} else {
			content = line.map((piece, index) => {
				var color = index % 2 !== 0 ? "#EEEED2" : "#769656";
				return <Square key={index} color={color} piece={piece} onClick={() => this.movePiece(this.state.positions[2][7], 2, 7)} />;
			});
		}

		return content;
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
