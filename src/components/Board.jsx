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
			activeSquare: [undefined, undefined],
			lastSquare: [undefined, undefined],
			newSquare: [undefined, undefined],
			possible_moviments: [],
		};
	}

	createSquares(numberLine) {
		var line = this.state.positions[numberLine];
		var content;

		for (let i = 0; i < 8; i++) {
			line[i] = line[i] === undefined ? undefined : line[i];
		}

		content = line.map((piece, index) => {
			var color = "";
			if (numberLine % 2 === 0) {
				color = index % 2 === 0 ? "clara" : "escura";
				if (
					(piece !== undefined && numberLine === this.state.activeSquare[0] && index === this.state.activeSquare[1]) ||
					(piece === undefined && numberLine === this.state.lastSquare[0] && index === this.state.lastSquare[1]) ||
					(piece !== undefined && numberLine === this.state.newSquare[0] && index === this.state.newSquare[1])
				) {
					color = "ativa";
				} else {
					for (let i = 0; i < this.state.possible_moviments.length; i++) {
						if (numberLine === this.state.possible_moviments[i][0] && index === this.state.possible_moviments[i][1]) {
							color = ["possible_moviment_square", color];
						}
					}
				}
			} else {
				color = index % 2 !== 0 ? "clara" : "escura";
				if (
					(piece !== undefined && numberLine === this.state.activeSquare[0] && index === this.state.activeSquare[1]) ||
					(piece === undefined && numberLine === this.state.lastSquare[0] && index === this.state.lastSquare[1]) ||
					(piece !== undefined && numberLine === this.state.newSquare[0] && index === this.state.newSquare[1])
				) {
					color = "ativa";
				} else {
					for (let i = 0; i < this.state.possible_moviments.length; i++) {
						if (numberLine === this.state.possible_moviments[i][0] && index === this.state.possible_moviments[i][1]) {
							color = ["possible_moviment_square", color];
						}
					}
				}
			}
			return <Square key={index} color={color} piece={piece} onClick={() => this.handleClick(piece, numberLine, index)} />;
		});

		return content;
	}

	handleClick(piece, numberLine, index) {
		let [activeSquare, lastSquare, newSquare, positions, possible_moviments] = MainMovePiece(piece, numberLine, index, this.state.positions);
		let currentFEN = create_fen(positions);

		this.setState({
			positions: positions,
			currentFen: currentFEN,
			activeSquare: activeSquare,
			newSquare: newSquare,
			lastSquare: lastSquare,
			possible_moviments: possible_moviments,
		});
	}

	componentDidMount() {
		this.setState({ positions: putPiecesOnBoard(this.state.currentFen) });
	}

	render() {
		// console.log(this.state.lastSquare);
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
