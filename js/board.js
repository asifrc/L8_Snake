var Board = function(l8, bgcolor, snake) {
	var self = this
	
	var X = 0;
	var Y = 1;
	var BOARD_LENGTH = 8;
	var TARGET_COLOR = new Color(15, 0, 15);

	self.size = function() { return BOARD_LENGTH; };
	
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

	var mark = function(coordinates, color) {
		board[coordinates[X]][coordinates[Y]] = color;
	};

	var target = [];

	var rand = function() {
		return Math.floor(Math.random() * BOARD_LENGTH);
	}
	self.target = function() { return target; };
	self.newTarget = function() {
		target = [rand(), rand()];
	};

	self.newTarget();

	self.draw = function() {
		resetBoard(bgcolor);

		mark(target, TARGET_COLOR);

		mark(snake.head, snake.marker)
		snake.tail.map(function(tail) {
			mark(tail, snake.marker);
		});
		
		l8.SetRGBMatrix(board)
	}
}