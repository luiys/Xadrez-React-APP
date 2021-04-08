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

		for (let i = 0; i < 8; i++) {
			line[i] = line[i] === undefined ? undefined : line[i];
		}

		function setSquareColor(color, piece, numberLine, index, activeSquare, lastSquare, newSquare, possibleMoviments) {
			var isActive = piece !== undefined && numberLine === activeSquare[0] && index === activeSquare[1];
			var isLastSquare = piece === undefined && numberLine === lastSquare[0] && index === lastSquare[1];
			var isNewSquare = piece !== undefined && numberLine === newSquare[0] && index === newSquare[1];

			if (isActive || isLastSquare || isNewSquare) {
				for (let i = 0; i < possibleMoviments.length; i++) {
					if (numberLine === possibleMoviments[i][0] && index === possibleMoviments[i][1]) {
						return ["possible_moviment_square", "rgb(180, 184, 0)"];
					}
				}

				return "ativa";
			} else {
				for (let i = 0; i < possibleMoviments.length; i++) {
					if (numberLine === possibleMoviments[i][0] && index === possibleMoviments[i][1]) {
						return ["possible_moviment_square", color];
					}
				}
				return color;
			}
		}

		return line.map((piece, index) => {
			var color = "";

			if (numberLine % 2 === 0) {
				color = index % 2 === 0 ? "clara" : "escura";
				color = setSquareColor(color, piece, numberLine, index, this.state.activeSquare, this.state.lastSquare, this.state.newSquare, this.state.possible_moviments);
			} else {
				color = index % 2 !== 0 ? "clara" : "escura";
				color = setSquareColor(color, piece, numberLine, index, this.state.activeSquare, this.state.lastSquare, this.state.newSquare, this.state.possible_moviments);
			}

			return <Square key={index} color={color} piece={piece} onClick={() => this.handleClick(piece, numberLine, index)} />;
		});
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
