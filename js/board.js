var Board = function(l8, bgcolor, snake) {
	var self = this
	
	var X = 0;
	var Y = 1;
	var BOARD_LENGTH = 8;
	
	var board = new Array(BOARD_LENGTH);
	var resetBoard = function(color) {
		for (var i = 0; i < BOARD_LENGTH; i++) {
			board[i] = new Array(BOARD_LENGTH);

			for (var j = 0; j < BOARD_LENGTH; j++) {
				board[i][j] = color;
			}
		}
	}
	resetBoard(bgcolor);

	self.draw = function() {
		console.log(snake);
		resetBoard(bgcolor);
		board[snake.head[X]][snake.head[Y]] = snake.marker;
		l8.SetRGBMatrix(board)
	}
}