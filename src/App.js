import React from "react";
import Board from "./components/Board";

class App extends React.Component {
	render() {
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
					<Board />
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

export default App;
