import React from "react";
import Square from "./Squares";
import { fen_analyzer as putPiecesOnBoard, create_fen } from "./js/Fen";
import { MainMovePiece } from "./js/MovePiece";
import Game from "./js/Game";
import "./style.css";

const game = new Game();

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			positions: [[], [], [], [], [], [], [], []],
			currentFen: game.currentFen,
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
				return <Square key={index} color={color} piece={piece} onClick={() => this.handleClick(piece, numberLine, index)} />;
			});
		} else {
			content = line.map((piece, index) => {
				var color = index % 2 !== 0 ? "#EEEED2" : "#769656";
				return <Square key={index} color={color} piece={piece} onClick={() => this.handleClick(piece, numberLine, index)} />;
			});
		}

		return content;
	}

	handleClick(piece, numberLine, index) {
		let positions = MainMovePiece(piece, numberLine, index, this.state.positions);
		let currentFEN = create_fen(positions);

		this.setState({ positions: positions });
		this.setState({ currentFen: currentFEN });
	}

	componentDidMount() {
		this.setState({ positions: putPiecesOnBoard(this.state.currentFen) });
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
