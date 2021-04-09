import React from "react";
import Square from "./Squares";
import { fen_analyzer as putPiecesOnBoard, create_fen } from "./js/Fen";
import { MainMovePiece } from "./js/MovePiece";
import Game from "./js/Game";
import "./style.css";
import _ from "underscore";

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
			var isActive = piece !== undefined && _.isEqual(activeSquare, [numberLine, index]);
			var isNewSquare = piece !== undefined && _.isEqual(newSquare, [numberLine, index]);
			var isLastSquare = piece === undefined && _.isEqual(lastSquare, [numberLine, index]);

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
		let [activeSquare, lastSquare, newSquare, positions, possible_moviments] = MainMovePiece(piece, numberLine, index, this.state.positions, this.state.currentFen);
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
		const content = Array(8)
			.fill(undefined)
			.map((_, index) => {
				return (
					<div className="line" key={index}>
						{this.createSquares(index)}
					</div>
				);
			});

		return <div className="board">{content}</div>;
	}
}

export default Board;
