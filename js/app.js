let board = null;
let game = new Chess();
let Msgdiv = document.getElementById('gameMsg');
let input = document.getElementById("timer"), add;

function start() {
	add = setInterval(function() {
	  input.innerHTML = String((Number(input.innerHTML)-0.1).toFixed(2));
	  if(Number(input.innerHTML) <= 0)
		resign();
	}, 100);
}

function onDrop(source, target, piece, newPos, oldPos, orientation){
	let validMove = game.move({from : source, to : target, promotion: 'q'});
	if(validMove)
		window.setTimeout(makeRandomMove, 250);
	else
		return 'snapback';
}

function onDragStart (source, piece, position, orientation) {
    if (piece[0] === "b" || game.game_over()) //the piece is black
      return false
}

function onSnapEnd () {
	board.position(game.fen())
}

function makeRandomMove(){
	if(game.turn() == 'b'){
		let validMoves = game.moves();
		let n = validMoves.length;
		if(n > 0){
			game.move(validMoves[Math.floor(Math.random()*n)]);
			board.position(game.fen());
		}
	}
}

function onChange(){
	if(game.turn() == 'w'){
		start();
	}
	else
		clearInterval(add);
	if(game.in_checkmate()){
		let loser='Black', winner='White';
		if(game.turn() == 'w'){
			winner = 'Black';
			loser = 'White';
		}
		window.alert(winner + ' has won');
		input.innerHTML = '30';
		clearInterval(add);
	}
	if(game.in_draw()){
		window.alert('The game has been drawn');
		input.innerHTML = '30';
		clearInterval(add);
	}
}
function resetGame(){
	game.reset();
	board.position('start');
	input.innerHTML = '30';
	clearInterval(add);
}
function resign(){
	if(game.game_over())
		return;
	window.alert('Black has won');
	resetGame();
}
let config = {
    position : 'start',
    draggable : true,
    onDragStart: onDragStart,
	onDrop : onDrop,
	onSnapEnd: onSnapEnd,
	onChange : onChange
}

board = Chessboard('myBoard', config);