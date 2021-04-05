var global_variables = {
	Clicked: false,
	PieceToBeMoved: "",
	SquareOfSelectedPiece: [undefined, undefined],
	PossibleMoviments: [],
	PiecePositions: [[], [], [], [], [], [], [], []],
	enPassant: [undefined, undefined],
};

export function MainMovePiece(piece, y, x, piecePositions) {
	if (piece !== undefined) {
		var colorPiece = piece.split("_")[0];
	}

	global_variables.PiecePositions = piecePositions;

	if (global_variables.Clicked === false && piece !== undefined) {
		selectPiece(piece, y, x);
	} else {
		if (piece !== undefined && colorPiece === global_variables.PieceToBeMoved.split("_")[0]) {
			selectPiece(piece, y, x);
		} else {
			doTheMove(piece, y, x);
		}
	}

	return global_variables.PiecePositions;
}

function selectPiece(piece, y, x) {
	global_variables.Clicked = true;
	global_variables.PieceToBeMoved = piece;
	global_variables.SquareOfSelectedPiece = [y, x];
	global_variables.PossibleMoviments = switchPiece(piece, y, x);
}

function doTheMove(piece, y, x) {
	for (let i = 0; i < global_variables.PossibleMoviments.length; i++) {
		if (y === global_variables.PossibleMoviments[i][0] && x === global_variables.PossibleMoviments[i][1]) {
			//promoção de peão
			if (global_variables.PieceToBeMoved.split("_")[1] === "pawn" && (y === 7 || y === 0)) {
				global_variables.PieceToBeMoved = global_variables.PieceToBeMoved.split("_")[0] + "_queen";
			}

			global_variables.PiecePositions[y][x] = global_variables.PieceToBeMoved;
			global_variables.PiecePositions[global_variables.SquareOfSelectedPiece[0]][global_variables.SquareOfSelectedPiece[1]] = undefined;
			global_variables.PossibleMoviments = [];
			global_variables.Clicked = false;
		}
	}
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
	var positions = global_variables.PiecePositions;

	if (color === "white") {
		if (positions[y - 1][x] === undefined) {
			possible_moviments.push([y - 1, x]);
			if (y === 6 && positions[y - 2][x] === undefined) {
				possible_moviments.push([y - 2, x]);
			}
		}
		if (positions[y - 1][x + 1] !== undefined || (y - 1 === global_variables.enPassant[0] && x + 1 === global_variables.enPassant[1])) {
			possible_moviments.push([y - 1, x + 1]);
		}
		if (positions[y - 1][x - 1] !== undefined || (y - 1 === global_variables.enPassant[0] && x - 1 === global_variables.enPassant[1])) {
			possible_moviments.push([y - 1, x - 1]);
		}
	} else if (color === "black") {
		if (positions[y + 1][x] === undefined) {
			possible_moviments.push([y + 1, x]);
			if (y === 1 && positions[y + 2][x] === undefined) {
				possible_moviments.push([y + 2, x]);
			}
		}
		if (positions[y + 1][x + 1] !== undefined || (y + 1 === global_variables.enPassant[0] && x + 1 === global_variables.enPassant[1])) {
			possible_moviments.push([y + 1, x + 1]);
		}
		if (positions[y + 1][x - 1] !== undefined || (y + 1 === global_variables.enPassant[0] && x - 1 === global_variables.enPassant[1])) {
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
	var positions = global_variables.PiecePositions;

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
	var positions = global_variables.PiecePositions;

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
	var positions = global_variables.PiecePositions;

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
	var positions = global_variables.PiecePositions;

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
