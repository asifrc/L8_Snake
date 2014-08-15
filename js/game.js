var Game = function(board, snake) {
	var self = this;

	var GAME_SPEED = 350;

	var X = 0;
	var Y = 1;

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
		if (hitTarget()) {
			snake.grow();
			board.newTarget();
		};

		if (lost()) {
			self.stop();
			$('#fail').trigger('click');
		}
		else {
        	board.draw();
		}
	}

	var hitTarget = function() {
		return (snake.head[X] == board.target()[X] && snake.head[Y] == board.target()[Y]);
	}

	var lost = function() {
		return !snake.isAlive(board);
	};
};