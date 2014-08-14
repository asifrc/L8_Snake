var Snake = function(color) {
	var self = this;

	var X = 0;
	var Y = 1;

	var LEFT = [0,-1];
	var RIGHT = [0,1];
	var UP = [-1, 0];
	var DOWN = [1, 0];

	self.marker = color;
	self.head = [0,0];
	self.tail = [];
	self.direction = RIGHT;
	self.move = function() {
		var newHead = [];
		newHead[X] = self.head[X] + self.direction[X];
		newHead[Y] = self.head[Y] + self.direction[Y];
		self.head = newHead;
		self.tail.unshift(self.head);
		self.tail.pop();
	};
	var changeDirection = function(direction) {
		self.direction = direction;
	}
	self.moveUp = function() { changeDirection(UP); };
	self.moveDown = function() { changeDirection(DOWN); };
	self.moveLeft = function() { changeDirection(LEFT); };
	self.moveRight = function() { changeDirection(RIGHT); };
};

if (typeof module !== "undefined") {
	module.exports = Snake;
}