import React from "react";
import Board from "./components/Board.jsx";
import GithubCorner from "react-github-corner";

class App extends React.Component {
	render() {
		const buttonDiv = (
			<div className="btn_reset">
				<a href="/" className="btn">
					<span className="text">RESET</span>
					<span className="flip-front">RESET ?</span>
					<span className="flip-back">RESET !</span>
				</a>
			</div>
		);

		return (
			<div>
				<div className="container">
					<div className="container_checkMate">
						<div className="checkMate">
							<h1>Xeque Mate</h1>
							{buttonDiv}
						</div>
					</div>
					<Board />
					{buttonDiv}
					<GithubCorner href="https://github.com/luiys/Xadrez-React-APP" bannerColor="#EEEED2" octoColor="#769656" size={80} direction="right" />
				</div>
			</div>
		);
	}
}

export default App;
