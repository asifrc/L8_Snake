var should = require('should');

var Snake = require('../js/snake');

var X = 0;
var Y = 1;

var compareXY = function(actual, expected) {
	actual[X].should.equal(expected[X]);
	actual[Y].should.equal(expected[Y]);
}

describe("Snake", function() {
	describe("move", function(done) {
		it("should move the head from [0,0], to [1,0]", function() {
			var snake = new Snake();
			compareXY(snake.head, [0,0]);
			snake.move();
			compareXY(snake.head, [1,0]);
		})
	})
});