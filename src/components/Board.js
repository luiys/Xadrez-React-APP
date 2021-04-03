import React from "react";
import Square from "./Squares";

import "./style.css";

class Board extends React.Component {
	constructor() {
		super();

		this.state = {
			positions: [[], [], [], [], [], [], [], []],
		};
	}

	callColor(y, x, color) {
		return "white";
	}

	createSquares() {
		var content;

		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if (i % 2 === 0) {
					var color;

					if (j % 2 === 0) {
						color = "white";
					} else {
						color = "green";
					}
				}
			}
		}
	}

	render() {
		const content = [
			<Square color={"blue"} id="a8" piece={this.state.positions[0][0]} onClick={() => this.movePiece(this.state.positions[0][0], 0, 0)}></Square>,
			<Square color={this.callColor(0, 1, "g")} id="b8" piece={this.state.positions[0][1]} onClick={() => this.movePiece(this.state.positions[0][1], 0, 1)}></Square>,
			<Square color={this.callColor(0, 2, "w")} id="c8" piece={this.state.positions[0][2]} onClick={() => this.movePiece(this.state.positions[0][2], 0, 2)}></Square>,
			<Square color={this.callColor(0, 3, "g")} id="d8" piece={this.state.positions[0][3]} onClick={() => this.movePiece(this.state.positions[0][3], 0, 3)}></Square>,
			<Square color={this.callColor(0, 4, "w")} id="e8" piece={this.state.positions[0][4]} onClick={() => this.movePiece(this.state.positions[0][4], 0, 4)}></Square>,
			<Square color={this.callColor(0, 5, "g")} id="f8" piece={this.state.positions[0][5]} onClick={() => this.movePiece(this.state.positions[0][5], 0, 5)}></Square>,
			<Square color={this.callColor(0, 6, "w")} id="g8" piece={this.state.positions[0][6]} onClick={() => this.movePiece(this.state.positions[0][6], 0, 6)}></Square>,
			<Square color={this.callColor(0, 7, "g")} id="h8" piece={this.state.positions[0][7]} onClick={() => this.movePiece(this.state.positions[0][7], 0, 7)}></Square>,
		];

		return (
			<div>
				<div className="container">
					<div className="container_checkMate">
						<div className="checkMate">
							<h1>Xeque Mate</h1>
							<div className="btn_reset">
								<a href="/" className="btn" onClick={() => this.reset_board()}>
									<span className="text">RESET</span>
									<span className="flip-front">RESET ?</span>
									<span className="flip-back">RESET !</span>
								</a>
							</div>
						</div>
					</div>
					<div className="board">
						<div className="line">{content[0]}</div>
						<div className="line">
							<Square color={this.callColor(1, 0, "g")} id="a7" piece={this.state.positions[1][0]} onClick={() => this.movePiece(this.state.positions[1][0], 1, 0)}></Square>
							<Square color={this.callColor(1, 1, "w")} id="b7" piece={this.state.positions[1][1]} onClick={() => this.movePiece(this.state.positions[1][1], 1, 1)}></Square>
							<Square color={this.callColor(1, 2, "g")} id="c7" piece={this.state.positions[1][2]} onClick={() => this.movePiece(this.state.positions[1][2], 1, 2)}></Square>
							<Square color={this.callColor(1, 3, "w")} id="d7" piece={this.state.positions[1][3]} onClick={() => this.movePiece(this.state.positions[1][3], 1, 3)}></Square>
							<Square color={this.callColor(1, 4, "g")} id="e7" piece={this.state.positions[1][4]} onClick={() => this.movePiece(this.state.positions[1][4], 1, 4)}></Square>
							<Square color={this.callColor(1, 5, "w")} id="f7" piece={this.state.positions[1][5]} onClick={() => this.movePiece(this.state.positions[1][5], 1, 5)}></Square>
							<Square color={this.callColor(1, 6, "g")} id="g7" piece={this.state.positions[1][6]} onClick={() => this.movePiece(this.state.positions[1][6], 1, 6)}></Square>
							<Square color={this.callColor(1, 7, "w")} id="h7" piece={this.state.positions[1][7]} onClick={() => this.movePiece(this.state.positions[1][7], 1, 7)}></Square>
						</div>
						<div className="line">
							<Square color={this.callColor(2, 0, "w")} id="a6" piece={this.state.positions[2][0]} onClick={() => this.movePiece(this.state.positions[2][0], 2, 0)}></Square>
							<Square color={this.callColor(2, 1, "g")} id="b6" piece={this.state.positions[2][1]} onClick={() => this.movePiece(this.state.positions[2][1], 2, 1)}></Square>
							<Square color={this.callColor(2, 2, "w")} id="c6" piece={this.state.positions[2][2]} onClick={() => this.movePiece(this.state.positions[2][2], 2, 2)}></Square>
							<Square color={this.callColor(2, 3, "g")} id="d6" piece={this.state.positions[2][3]} onClick={() => this.movePiece(this.state.positions[2][3], 2, 3)}></Square>
							<Square color={this.callColor(2, 4, "w")} id="e6" piece={this.state.positions[2][4]} onClick={() => this.movePiece(this.state.positions[2][4], 2, 4)}></Square>
							<Square color={this.callColor(2, 5, "g")} id="f6" piece={this.state.positions[2][5]} onClick={() => this.movePiece(this.state.positions[2][5], 2, 5)}></Square>
							<Square color={this.callColor(2, 6, "w")} id="g6" piece={this.state.positions[2][6]} onClick={() => this.movePiece(this.state.positions[2][6], 2, 6)}></Square>
							<Square color={this.callColor(2, 7, "g")} id="h6" piece={this.state.positions[2][7]} onClick={() => this.movePiece(this.state.positions[2][7], 2, 7)}></Square>
						</div>
						<div className="line">
							<Square color={this.callColor(3, 0, "g")} id="a5" piece={this.state.positions[3][0]} onClick={() => this.movePiece(this.state.positions[3][0], 3, 0)}></Square>
							<Square color={this.callColor(3, 1, "w")} id="b5" piece={this.state.positions[3][1]} onClick={() => this.movePiece(this.state.positions[3][1], 3, 1)}></Square>
							<Square color={this.callColor(3, 2, "g")} id="c5" piece={this.state.positions[3][2]} onClick={() => this.movePiece(this.state.positions[3][2], 3, 2)}></Square>
							<Square color={this.callColor(3, 3, "w")} id="d5" piece={this.state.positions[3][3]} onClick={() => this.movePiece(this.state.positions[3][3], 3, 3)}></Square>
							<Square color={this.callColor(3, 4, "g")} id="e5" piece={this.state.positions[3][4]} onClick={() => this.movePiece(this.state.positions[3][4], 3, 4)}></Square>
							<Square color={this.callColor(3, 5, "w")} id="f5" piece={this.state.positions[3][5]} onClick={() => this.movePiece(this.state.positions[3][5], 3, 5)}></Square>
							<Square color={this.callColor(3, 6, "g")} id="g5" piece={this.state.positions[3][6]} onClick={() => this.movePiece(this.state.positions[3][6], 3, 6)}></Square>
							<Square color={this.callColor(3, 7, "w")} id="h5" piece={this.state.positions[3][7]} onClick={() => this.movePiece(this.state.positions[3][7], 3, 7)}></Square>
						</div>
						<div className="line">
							<Square color={this.callColor(4, 0, "w")} id="a4" piece={this.state.positions[4][0]} onClick={() => this.movePiece(this.state.positions[4][0], 4, 0)}></Square>
							<Square color={this.callColor(4, 1, "g")} id="b4" piece={this.state.positions[4][1]} onClick={() => this.movePiece(this.state.positions[4][1], 4, 1)}></Square>
							<Square color={this.callColor(4, 2, "w")} id="c4" piece={this.state.positions[4][2]} onClick={() => this.movePiece(this.state.positions[4][2], 4, 2)}></Square>
							<Square color={this.callColor(4, 3, "g")} id="d4" piece={this.state.positions[4][3]} onClick={() => this.movePiece(this.state.positions[4][3], 4, 3)}></Square>
							<Square color={this.callColor(4, 4, "w")} id="e4" piece={this.state.positions[4][4]} onClick={() => this.movePiece(this.state.positions[4][4], 4, 4)}></Square>
							<Square color={this.callColor(4, 5, "g")} id="f4" piece={this.state.positions[4][5]} onClick={() => this.movePiece(this.state.positions[4][5], 4, 5)}></Square>
							<Square color={this.callColor(4, 6, "w")} id="g4" piece={this.state.positions[4][6]} onClick={() => this.movePiece(this.state.positions[4][6], 4, 6)}></Square>
							<Square color={this.callColor(4, 7, "g")} id="h4" piece={this.state.positions[4][7]} onClick={() => this.movePiece(this.state.positions[4][7], 4, 7)}></Square>
						</div>
						<div className="line">
							<Square color={this.callColor(5, 0, "g")} id="a3" piece={this.state.positions[5][0]} onClick={() => this.movePiece(this.state.positions[5][0], 5, 0)}></Square>
							<Square color={this.callColor(5, 1, "w")} id="b3" piece={this.state.positions[5][1]} onClick={() => this.movePiece(this.state.positions[5][1], 5, 1)}></Square>
							<Square color={this.callColor(5, 2, "g")} id="c3" piece={this.state.positions[5][2]} onClick={() => this.movePiece(this.state.positions[5][2], 5, 2)}></Square>
							<Square color={this.callColor(5, 3, "w")} id="d3" piece={this.state.positions[5][3]} onClick={() => this.movePiece(this.state.positions[5][3], 5, 3)}></Square>
							<Square color={this.callColor(5, 4, "g")} id="e3" piece={this.state.positions[5][4]} onClick={() => this.movePiece(this.state.positions[5][4], 5, 4)}></Square>
							<Square color={this.callColor(5, 5, "w")} id="f3" piece={this.state.positions[5][5]} onClick={() => this.movePiece(this.state.positions[5][5], 5, 5)}></Square>
							<Square color={this.callColor(5, 6, "g")} id="g3" piece={this.state.positions[5][6]} onClick={() => this.movePiece(this.state.positions[5][6], 5, 6)}></Square>
							<Square color={this.callColor(5, 7, "w")} id="h3" piece={this.state.positions[5][7]} onClick={() => this.movePiece(this.state.positions[5][7], 5, 7)}></Square>
						</div>
						<div className="line">
							<Square color={this.callColor(6, 0, "w")} id="a2" piece={this.state.positions[6][0]} onClick={() => this.movePiece(this.state.positions[6][0], 6, 0)}></Square>
							<Square color={this.callColor(6, 1, "g")} id="b2" piece={this.state.positions[6][1]} onClick={() => this.movePiece(this.state.positions[6][1], 6, 1)}></Square>
							<Square color={this.callColor(6, 2, "w")} id="c2" piece={this.state.positions[6][2]} onClick={() => this.movePiece(this.state.positions[6][2], 6, 2)}></Square>
							<Square color={this.callColor(6, 3, "g")} id="d2" piece={this.state.positions[6][3]} onClick={() => this.movePiece(this.state.positions[6][3], 6, 3)}></Square>
							<Square color={this.callColor(6, 4, "w")} id="e2" piece={this.state.positions[6][4]} onClick={() => this.movePiece(this.state.positions[6][4], 6, 4)}></Square>
							<Square color={this.callColor(6, 5, "g")} id="f2" piece={this.state.positions[6][5]} onClick={() => this.movePiece(this.state.positions[6][5], 6, 5)}></Square>
							<Square color={this.callColor(6, 6, "w")} id="g2" piece={this.state.positions[6][6]} onClick={() => this.movePiece(this.state.positions[6][6], 6, 6)}></Square>
							<Square color={this.callColor(6, 7, "g")} id="h2" piece={this.state.positions[6][7]} onClick={() => this.movePiece(this.state.positions[6][7], 6, 7)}></Square>
						</div>
						<div className="line">
							<Square color={this.callColor(7, 0, "g")} id="a1" piece={this.state.positions[7][0]} onClick={() => this.movePiece(this.state.positions[7][0], 7, 0)}></Square>
							<Square color={this.callColor(7, 1, "w")} id="b1" piece={this.state.positions[7][1]} onClick={() => this.movePiece(this.state.positions[7][1], 7, 1)}></Square>
							<Square color={this.callColor(7, 2, "g")} id="c1" piece={this.state.positions[7][2]} onClick={() => this.movePiece(this.state.positions[7][2], 7, 2)}></Square>
							<Square color={this.callColor(7, 3, "w")} id="d1" piece={this.state.positions[7][3]} onClick={() => this.movePiece(this.state.positions[7][3], 7, 3)}></Square>
							<Square color={this.callColor(7, 4, "g")} id="e1" piece={this.state.positions[7][4]} onClick={() => this.movePiece(this.state.positions[7][4], 7, 4)}></Square>
							<Square color={this.callColor(7, 5, "w")} id="f1" piece={this.state.positions[7][5]} onClick={() => this.movePiece(this.state.positions[7][5], 7, 5)}></Square>
							<Square color={this.callColor(7, 6, "g")} id="g1" piece={this.state.positions[7][6]} onClick={() => this.movePiece(this.state.positions[7][6], 7, 6)}></Square>
							<Square color={this.callColor(7, 7, "w")} id="h1" piece={this.state.positions[7][7]} onClick={() => this.movePiece(this.state.positions[7][7], 7, 7)}></Square>
						</div>
					</div>
					<div className="btn_reset">
						<a href="/" className="btn" onClick={() => this.reset_board()}>
							<span className="text">RESET</span>
							<span className="flip-front">RESET ?</span>
							<span className="flip-back">RESET !</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Board;
