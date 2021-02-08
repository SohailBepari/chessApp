let board = null;
let game = new Chess();
let input = document.getElementById("timer"), add;

let globalTime = 300;

function setClock(num){
	let minutes = Math.floor(num/60);
	let seconds = num%60;
	return String(minutes) + ":" + String(seconds.toFixed(1));
}
function start() {
	add = setInterval(function() {
	  globalTime = globalTime-0.1;
	  input.innerHTML = setClock(globalTime);
	  if(globalTime <= 0)
		resign();
	}, 100);
}

function onDrop(source, target, piece, newPos, oldPos, orientation){
	let validMove = game.move({from : source, to : target, promotion: 'q'});
	if(validMove){
		//window.setTimeout(makeRandomMove, 250);
		window.setTimeout(makeAImove, 100);
	}
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

function makeAImove(){
	if(game.turn() == 'b'){
		game.move(calculateBestMove(game));
		board.position(game.fen());
	}
}
function onChange(){
	console.log(game.fen());
	if(game.turn() == 'w' && game.fen() != 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'){
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
		globalTime = 300;
		input.innerHTML = setClock(globalTime);
		clearInterval(add);
	}
	if(game.in_draw()){
		window.alert('The game has been drawn');
		globalTime = 300;
		input.innerHTML = setClock(globalTime);
		clearInterval(add);
	}
}

function resetGame(){
	game.reset();
	board.position('start');
	globalTime = 300;
	input.innerHTML = setClock(globalTime);
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