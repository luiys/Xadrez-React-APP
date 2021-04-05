var _global = {
	Clicked: false,
	PieceToBeMoved: "",
	SquareOfSelectedPiece: [undefined, undefined],
	PossibleMoviments: [],
	PiecePositions: [[], [], [], [], [], [], [], []],
	enPassant: [undefined, undefined],
	Player: "w",
};

export function MainMovePiece(piece, y, x, piecePositions) {
	if (piece !== undefined) {
		var colorPiece = piece.split("_")[0];
	}

	_global.PiecePositions = piecePositions;

	if (_global.Clicked === false && piece !== undefined) {
		selectPiece(piece, y, x);
	} else {
		if (piece !== undefined && colorPiece === _global.PieceToBeMoved.split("_")[0]) {
			selectPiece(piece, y, x);
		} else {
			doTheMove(y, x);
		}
	}

	return _global.PiecePositions;
}

function selectPiece(piece, y, x) {
	_global.Clicked = true;
	_global.PieceToBeMoved = piece;
	_global.SquareOfSelectedPiece = [y, x];
	_global.PossibleMoviments = switchPiece(piece, y, x);
}

function doTheMove(y, x) {
	try {
		var possible = false;
		for (let i = 0; i < _global.PossibleMoviments.length; i++) {
			if (y === _global.PossibleMoviments[i][0] && x === _global.PossibleMoviments[i][1]) {
				//promoção de peão
				if (_global.PieceToBeMoved.split("_")[1] === "pawn" && (y === 7 || y === 0)) {
					_global.PieceToBeMoved = _global.PieceToBeMoved.split("_")[0] + "_queen";
				}
				_global.PiecePositions[y][x] = _global.PieceToBeMoved;
				_global.PiecePositions[_global.SquareOfSelectedPiece[0]][_global.SquareOfSelectedPiece[1]] = undefined;
				_global.PossibleMoviments = [];
				_global.Clicked = false;
				_global.Player = _global.Player === "w" ? "b" : "W";
				possible = true;
			}
		}

		if (!possible) {
			_global.Clicked = false;
			_global.PieceToBeMoved = "";
			_global.SquareOfSelectedPiece = [undefined, undefined];
			_global.PossibleMoviments = [];
		}
	} catch (e) {}
}

function switchPiece(piece, y, x) {
	var possible_moviments = [];
	var typePiece = piece.split("_")[1];
	var colorPiece = piece.split("_")[0];

	switch (typePiece) {
		case "rook":
			possible_moviments = rook_moviments(y, x, colorPiece);
			break;
		case "knight":
			possible_moviments = knight_moviments(y, x, colorPiece);
			break;
		case "bishop":
			possible_moviments = bishop_moviments(y, x, colorPiece);
			break;
		case "queen":
			possible_moviments = queen_moviments(y, x, colorPiece);
			break;
		case "king":
			possible_moviments = king_moviments(y, x, colorPiece);
			break;
		case "pawn":
			possible_moviments = pawn_moviments(y, x, colorPiece);
			break;
		default:
			console.error("unexpected piece");
	}

	return possible_moviments;
}

function pawn_moviments(y, x, color) {
	var possible_moviments = [];
	var positions = _global.PiecePositions;

	if (color === "white") {
		if (positions[y - 1][x] === undefined) {
			possible_moviments.push([y - 1, x]);
			if (y === 6 && positions[y - 2][x] === undefined) {
				possible_moviments.push([y - 2, x]);
			}
		}
		if (positions[y - 1][x + 1] !== undefined || (y - 1 === _global.enPassant[0] && x + 1 === _global.enPassant[1])) {
			possible_moviments.push([y - 1, x + 1]);
		}
		if (positions[y - 1][x - 1] !== undefined || (y - 1 === _global.enPassant[0] && x - 1 === _global.enPassant[1])) {
			possible_moviments.push([y - 1, x - 1]);
		}
	} else if (color === "black") {
		if (positions[y + 1][x] === undefined) {
			possible_moviments.push([y + 1, x]);
			if (y === 1 && positions[y + 2][x] === undefined) {
				possible_moviments.push([y + 2, x]);
			}
		}
		if (positions[y + 1][x + 1] !== undefined || (y + 1 === _global.enPassant[0] && x + 1 === _global.enPassant[1])) {
			possible_moviments.push([y + 1, x + 1]);
		}
		if (positions[y + 1][x - 1] !== undefined || (y + 1 === _global.enPassant[0] && x - 1 === _global.enPassant[1])) {
			possible_moviments.push([y + 1, x - 1]);
		}
	}

	return possible_moviments;
}

function filterPossibleMovimets(param) {
	param = param.filter((moviment) => {
		return moviment[0] <= 7 && moviment[0] >= 0 && moviment[1] <= 7 && moviment[1] >= 0;
	});

	return param;
}

function rook_moviments(y, x, color) {
	var possible_moviments = [];
	var positions = _global.PiecePositions;

	// analise dos movimentos possiveis para tras
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y + i][x] === undefined) {
				possible_moviments.push([y + i, x]);
			} else if (positions[y + i][x].split("_")[0] !== color) {
				possible_moviments.push([y + i, x]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	// analise dos movimentos possiveis para frente
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y - i][x] === undefined) {
				possible_moviments.push([y - i, x]);
			} else if (positions[y - i][x].split("_")[0] !== color) {
				possible_moviments.push([y - i, x]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	// analise dos movimentos possiveis para a direita
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y][x + i] === undefined) {
				possible_moviments.push([y, x + i]);
			} else if (positions[y][x + i].split("_")[0] !== color) {
				possible_moviments.push([y, x + i]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	// analise dos movimentos possiveis para a esquerda
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y][x - i] === undefined) {
				possible_moviments.push([y, x - i]);
			} else if (positions[y][x - i].split("_")[0] !== color) {
				possible_moviments.push([y, x - i]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	//limpeza parar tirar casas que não existem (bug)
	possible_moviments = filterPossibleMovimets(possible_moviments);

	return possible_moviments;
}

function bishop_moviments(y, x, color) {
	var possible_moviments = [];
	var positions = _global.PiecePositions;

	//analise de movimentos na diagonal frente-direita
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y - i][x + i] === undefined) {
				possible_moviments.push([y - i, x + i]);
			} else if (positions[y - i][x + i].split("_")[0] !== color) {
				possible_moviments.push([y - i, x + i]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	//analise de movimentos na diagonal frente-esquerda
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y - i][x - i] === undefined) {
				possible_moviments.push([y - i, x - i]);
			} else if (positions[y - i][x - i].split("_")[0] !== color) {
				possible_moviments.push([y - i, x - i]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	//analise de movimentos na diagonal de atras-direita
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y + i][x + i] === undefined) {
				possible_moviments.push([y + i, x + i]);
			} else if (positions[y + i][x + i].split("_")[0] !== color) {
				possible_moviments.push([y + i, x + i]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	//analise de movimentos na diagonal de atras-esquerda
	try {
		for (let i = 1; i < 8; i++) {
			if (positions[y + i][x - i] === undefined) {
				possible_moviments.push([y + i, x - i]);
			} else if (positions[y + i][x - i].split("_")[0] !== color) {
				possible_moviments.push([y + i, x - i]);
				break;
			} else {
				break;
			}
		}
	} catch (e) {}

	//limpeza parar tirar casas que não existem (bug)
	possible_moviments = filterPossibleMovimets(possible_moviments);

	return possible_moviments;
}

function queen_moviments(y, x, color) {
	var straightMoviments = rook_moviments(y, x, color);
	var diagonalMoviments = bishop_moviments(y, x, color);

	var possible_moviments = straightMoviments.concat(diagonalMoviments);

	return possible_moviments;
}

function knight_moviments(y, x, color) {
	var possible_moviments = [];
	var positions = _global.PiecePositions;

	try {
		if (positions[y - 2][x + 1] === undefined || positions[y - 2][x + 1].split("_")[0] !== color) {
			possible_moviments.push([y - 2, x + 1]);
		}
	} catch (e) {}

	try {
		if (positions[y - 1][x + 2] === undefined || positions[y - 1][x + 2].split("_")[0] !== color) {
			possible_moviments.push([y - 1, x + 2]);
		}
	} catch (e) {}

	try {
		if (positions[y + 1][x + 2] === undefined || positions[y + 1][x + 2].split("_")[0] !== color) {
			possible_moviments.push([y + 1, x + 2]);
		}
	} catch (e) {}

	try {
		if (positions[y + 2][x + 1] === undefined || positions[y + 2][x + 1].split("_")[0] !== color) {
			possible_moviments.push([y + 2, x + 1]);
		}
	} catch (e) {}

	try {
		if (positions[y + 2][x - 1] === undefined || positions[y + 2][x - 1].split("_")[0] !== color) {
			possible_moviments.push([y + 2, x - 1]);
		}
	} catch (e) {}

	try {
		if (positions[y + 1][x - 2] === undefined || positions[y + 1][x - 2].split("_")[0] !== color) {
			possible_moviments.push([y + 1, x - 2]);
		}
	} catch (e) {}

	try {
		if (positions[y - 1][x - 2] === undefined || positions[y - 1][x - 2].split("_")[0] !== color) {
			possible_moviments.push([y - 1, x - 2]);
		}
	} catch (e) {}

	try {
		if (positions[y - 2][x - 1] === undefined || positions[y - 2][x - 1].split("_")[0] !== color) {
			possible_moviments.push([y - 2, x - 1]);
		}
	} catch (e) {}

	//limpeza parar tirar casas que não existem (bug)
	possible_moviments = filterPossibleMovimets(possible_moviments);

	return possible_moviments;
}

function king_moviments(y, x, color) {
	var possible_moviments = [];
	var positions = _global.PiecePositions;

	try {
		//frente
		if (positions[y - 1][x] === undefined || positions[y - 1][x].split("_")[0] !== color) {
			possible_moviments.push([y - 1, x]);
		}
	} catch (e) {}

	try {
		//frente-direita
		if (positions[y - 1][x + 1] === undefined || positions[y - 1][x + 1].split("_")[0] !== color) {
			possible_moviments.push([y - 1, x + 1]);
		}
	} catch (e) {}

	try {
		//frente-esquerda
		if (positions[y - 1][x - 1] === undefined || positions[y - 1][x - 1].split("_")[0] !== color) {
			possible_moviments.push([y - 1, x - 1]);
		}
	} catch (e) {}

	try {
		//direita
		if (positions[y][x + 1] === undefined || positions[y][x + 1].split("_")[0] !== color) {
			possible_moviments.push([y, x + 1]);
		}
	} catch (e) {}

	try {
		//esquerda
		if (positions[y][x - 1] === undefined || positions[y][x - 1].split("_")[0] !== color) {
			possible_moviments.push([y, x - 1]);
		}
	} catch (e) {}

	try {
		//atras
		if (positions[y + 1][x] === undefined || positions[y + 1][x].split("_")[0] !== color) {
			possible_moviments.push([y + 1, x]);
		}
	} catch (e) {}

	try {
		//atras-direita
		if (positions[y + 1][x + 1] === undefined || positions[y + 1][x + 1].split("_")[0] !== color) {
			possible_moviments.push([y + 1, x + 1]);
		}
	} catch (e) {}

	try {
		//atras-esquerda
		if (positions[y + 1][x - 1] === undefined || positions[y + 1][x - 1].split("_")[0] !== color) {
			possible_moviments.push([y + 1, x - 1]);
		}
	} catch (e) {}

	//limpeza parar tirar casas que não existem (bug)
	possible_moviments = filterPossibleMovimets(possible_moviments);

	return possible_moviments;
}
