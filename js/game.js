var Game = function(board, snake) {
	var self = this;

	var GAME_SPEED = 500;

	self.interval = null;

	self.start = function() {
		board.draw();
		self.interval = setInterval(self.loop, GAME_SPEED);
	}

	self.stop = function() {
		clearInterval(self.interval);
	}

	self.loop = function() {
		snake.move();
		if (lost()) {
			self.stop();
			$('#fail').trigger('click');
		}
		else {
        	board.draw();
		}
	}

	var lost = function() {
		return !snake.isAlive(board);
	};
};