import React from "react";

class Square extends React.Component {
	render() {
		var estilo = {};

		if (this.props.color === "#b5b800") {
			estilo = {
				backgroundColor: "rgba(181, 184, 0, 0.3)",
				// width: "100px",
				// height: "100px",
				width: "60px",
				height: "60px",
				border: "0px solid black",
			};
		} else if (typeof this.props.color === "object") {
			estilo = {
				backgroundColor: this.props.color[1],
				// width: "100px",
				// height: "100px",
				width: "60px",
				height: "60px",
				border: "0px solid black",
				cursor: "pointer",
			};
		} else if (this.props.color === "newSquare") {
			estilo = {
				backgroundColor: "rgb(180, 184, 0)",
				// width: "100px",
				// height: "100px",
				width: "60px",
				height: "60px",
				border: "0px solid black",
				cursor: "pointer",
			};
		} else {
			estilo = {
				backgroundColor: this.props.color,
				// width: "100px",
				// height: "100px",
				width: "60px",
				height: "60px",
				border: "0px solid black",
			};
		}

		let content;

		if (this.props.piece !== undefined && this.props.piece !== 0) {
			content = (
				<div style={estilo} className="Square" onClick={() => this.props.onClick()}>
					<div className="containerImg">
						<img src="./../../public/images/pieces/black_rook.png" alt="description"></img>
					</div>
				</div>
			);
		} else if (this.props.color[0] === "possible_moviment_square") {
			if (this.props.piece !== undefined && this.props.piece !== 0) {
				content = (
					<div style={estilo} className="Square" onClick={() => this.props.onClick()}>
						<img src={"./../../public/images/pieces/" + this.props.piece + ".png"} alt="description"></img>
					</div>
				);
			} else if (this.props.piece === undefined) {
				content = (
					<div style={estilo} className="Square" onClick={() => this.props.onClick()}>
						<div className="PossibleMoviments"></div>
					</div>
				);
			}
		} else {
			content = <div style={estilo} className="Square" onClick={() => this.props.onClick()}></div>;
		}

		return <React.Fragment>{content}</React.Fragment>;
	}
}

export default Square;
