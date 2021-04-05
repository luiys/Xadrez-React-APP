import React from "react";
import black_pawn_png from "./../images/pieces/black_pawn.png";
import black_rook_png from "./../images/pieces/black_rook.png";
import black_knight_png from "./../images/pieces/black_knight.png";
import black_bishop_png from "./../images/pieces/black_bishop.png";
import black_queen_png from "./../images/pieces/black_queen.png";
import black_king_png from "./../images/pieces/black_king.png";
import white_pawn_png from "./../images/pieces/white_pawn.png";
import white_rook_png from "./../images/pieces/white_rook.png";
import white_knight_png from "./../images/pieces/white_knight.png";
import white_bishop_png from "./../images/pieces/white_bishop.png";
import white_queen_png from "./../images/pieces/white_queen.png";
import white_king_png from "./../images/pieces/white_king.png";

class Square extends React.Component {
	render() {
		var SquareColor = "black";
		var cursor = "default";

		if (typeof this.props.color === "object") {
			SquareColor = this.props.color[1];
			cursor = "pointer";
		} else {
			switch (this.props.color) {
				case "escura":
					SquareColor = "#769656";
					break;
				case "clara":
					SquareColor = "#EEEED2";
					break;
				case "ativa":
					SquareColor = "rgb(180, 184, 0)";
					cursor = "pointer";
					break;
				case "newSquare":
					SquareColor = "rgb(180, 184, 0)";
					cursor = "pointer";
					break;
				default:
					console.error("unexpected square color value");
			}
		}

		var estilo = {
			backgroundColor: SquareColor,
			width: "60px",
			height: "60px",
			border: "0px solid black",
			cursor: cursor,
		};

		var content;

		var piece = this.imageToPiece(this.props.piece);

		if (this.props.color[0] === "possible_moviment_square") {
			if (this.props.piece !== undefined && this.props.piece !== 0) {
				content = (
					<div style={estilo} className="Square" onClick={() => this.props.onClick()}>
						<img src={piece} alt={this.props.piece}></img>
					</div>
				);
			} else if (this.props.piece === undefined) {
				content = (
					<div style={estilo} className="Square" onClick={() => this.props.onClick()}>
						<div className="PossibleMoviments"></div>
					</div>
				);
			}
		} else if (this.props.piece !== undefined && this.props.piece !== 0) {
			content = (
				<div style={estilo} className="Square" onClick={() => this.props.onClick()}>
					<div className="containerImg">
						<img src={piece} alt={this.props.piece}></img>
					</div>
				</div>
			);
		} else {
			content = <div style={estilo} className="Square" onClick={() => this.props.onClick()}></div>;
		}

		return <React.Fragment>{content}</React.Fragment>;
	}

	imageToPiece(piece) {
		switch (piece) {
			case "black_pawn":
				piece = black_pawn_png;
				break;
			case "black_rook":
				piece = black_rook_png;
				break;
			case "black_knight":
				piece = black_knight_png;
				break;
			case "black_bishop":
				piece = black_bishop_png;
				break;
			case "black_queen":
				piece = black_queen_png;
				break;
			case "black_king":
				piece = black_king_png;
				break;
			case "white_pawn":
				piece = white_pawn_png;
				break;
			case "white_rook":
				piece = white_rook_png;
				break;
			case "white_knight":
				piece = white_knight_png;
				break;
			case "white_bishop":
				piece = white_bishop_png;
				break;
			case "white_queen":
				piece = white_queen_png;
				break;
			case "white_king":
				piece = white_king_png;
				break;
			default:
				piece = undefined;
		}

		return piece;
	}
}

export default Square;
