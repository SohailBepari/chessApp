let calculateBestMove = function(game) {

    let possibleNextMoves = game.moves();
    let bestMove = -9999;
    let bestMoveFound;

    for(let i = 0; i < possibleNextMoves.length; i++) {
        let possibleNextMove = possibleNextMoves[i]
        game.move(possibleNextMove);
        let value = minimax(1, -10000, 10000, false);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = possibleNextMove;
        }
    }
    return bestMoveFound;
};


// minimax with alhpha-beta pruning and search depth d = 3 levels
let minimax = function (depth, alpha, beta, isMaximisingPlayer) {
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }

    let possibleNextMoves = game.moves();
    let numPossibleMoves = possibleNextMoves.length
    let bestmove;

    if (isMaximisingPlayer) {
        bestMove = -9999;
        for (let i = 0; i < numPossibleMoves; i++) {
            game.move(possibleNextMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if(beta <= alpha){
                return bestMove;
            }
        }

    } else {
        bestMove = 9999;
        for (let i = 0; i < numPossibleMoves; i++) {
            game.move(possibleNextMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if(beta <= alpha){
                return bestMove;
            }
        }
    }

    return bestMove;
};


// the evaluation function for minimax
let evaluateBoard = function (board) {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
        }
    }
    return totalEvaluation;
};

let reverseArray = function(array) {
    return array.slice().reverse();
};

let whitePawnEval =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0,  1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

let blackPawnEval = reverseArray(whitePawnEval);

let knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

let whiteBishopEval = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

let blackBishopEval = reverseArray(whiteBishopEval);

let whiteRookEval = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

let blackRookEval = reverseArray(whiteRookEval);

let evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

let whiteKingEval = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

let blackKingEval = reverseArray(whiteKingEval);


let getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }

    let absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);

    if(piece.color === 'w'){
        return absoluteValue;
    } else {
        return -absoluteValue;
    }
};


let getAbsoluteValue = function (piece, isWhite, x ,y) {
    if (piece.type === 'p') {
        return 10 + ( isWhite ? whitePawnEval[y][x] : blackPawnEval[y][x] );
    } else if (piece.type === 'r') {
        return 50 + ( isWhite ? whiteRookEval[y][x] : blackRookEval[y][x] );
    } else if (piece.type === 'n') {
        return 30 + knightEval[y][x];
    } else if (piece.type === 'b') {
        return 30 + ( isWhite ? whiteBishopEval[y][x] : blackBishopEval[y][x] );
    } else if (piece.type === 'q') {
        return 90 + evalQueen[y][x];
    } else if (piece.type === 'k') {
        return 900 + ( isWhite ? whiteKingEval[y][x] : blackKingEval[y][x] );
    }
};