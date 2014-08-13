var Snake = function(color) {
	var self = this;

	var X = 0;
	var Y = 1;
	self.marker = color;
	self.head = [0,0];
	self.tail = [];
	self.direction = [1,0];
	self.move = function() {
		var newHead = [];
		newHead[X] = self.head[X] + self.direction[X];
		newHead[Y] = self.head[Y] + self.direction[Y];
		self.head = newHead;
		self.tail.unshift(self.head);
		self.tail.pop();
	};
};

if (typeof module !== "undefined") {
	module.exports = Snake;
}