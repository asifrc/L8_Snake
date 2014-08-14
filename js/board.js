var Board = function(l8, bgcolor) {
	var self = this
	var board = new Array(8);
	for (var i = 0; i < 8; i++) {
		board[i] = new Array(8);

		for (var j = 0; j < 8; j++) {
			board[i][j] = bgcolor;
		}
	}
	self.draw = function() {
		l8.SetRGBMatrix(board)
	}
}