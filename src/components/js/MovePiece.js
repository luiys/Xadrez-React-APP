import _ from "underscore";

var _global = {
	Clicked: false,
	PieceToBeMoved: "",
	SquareOfSelectedPiece: [undefined, undefined],
	PossibleMoviments: [],
	PiecePositions: [[], [], [], [], [], [], [], []],
	enPassant: [undefined, undefined],
	Player: "w",
	lastSquare: [undefined, undefined],
	newSquare: [undefined, undefined],
};

export function MainMovePiece(piece, y, x, piecePositions) {
	_global.PiecePositions = piecePositions;

	if (_global.Clicked === false && piece !== undefined && piece.split("")[0] === _global.Player) {
		selectPiece(piece, y, x);
	} else {
		if (piece !== undefined && piece.split("_")[0] === _global.PieceToBeMoved.split("_")[0] && piece.split("")[0] === _global.Player) {
			selectPiece(piece, y, x);
		} else {
			doTheMove(y, x);
		}
	}

	return [_global.SquareOfSelectedPiece, _global.lastSquare, _global.newSquare, _global.PiecePositions, _global.PossibleMoviments];
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
			if (_.isEqual(_global.PossibleMoviments[i], [y, x])) {
				//promoção de peão
				if (_global.PieceToBeMoved.split("_")[1] === "pawn" && (y === 7 || y === 0)) {
					_global.PieceToBeMoved = _global.PieceToBeMoved.split("_")[0] + "_queen";
				}
				_global.PiecePositions[y][x] = _global.PieceToBeMoved;
				_global.PiecePositions[_global.SquareOfSelectedPiece[0]][_global.SquareOfSelectedPiece[1]] = undefined;
				_global.PossibleMoviments = [];
				_global.Clicked = false;
				_global.Player = _global.Player === "w" ? "b" : "w";
				_global.lastSquare = _global.SquareOfSelectedPiece;
				_global.newSquare = [y, x];
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
	var colorPiece = piece.split("_")[0];
	const functions = {
		pawn: pawn_moviments(y, x, colorPiece),
		rook: rook_moviments(y, x, colorPiece),
		knight: knight_moviments(y, x, colorPiece),
		bishop: bishop_moviments(y, x, colorPiece),
		queen: queen_moviments(y, x, colorPiece),
		king: king_moviments(y, x, colorPiece),
	};

	return functions[piece.split("_")[1]];
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
	return param.filter((moviment) => {
		return moviment[0] <= 7 && moviment[0] >= 0 && moviment[1] <= 7 && moviment[1] >= 0;
	});
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
	return filterPossibleMovimets(possible_moviments);
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
	return filterPossibleMovimets(possible_moviments);
}

function queen_moviments(y, x, color) {
	var straightMoviments = rook_moviments(y, x, color);
	var diagonalMoviments = bishop_moviments(y, x, color);
	return straightMoviments.concat(diagonalMoviments);
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
	return filterPossibleMovimets(possible_moviments);
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
	return filterPossibleMovimets(possible_moviments);
}
