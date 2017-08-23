"use strict";
var SnakeGameOverState = {
	parent:undefined
};

SnakeGameOverState.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridElementCollection);
	Object.assign(instance, SnakeGameOverState);
	Object.assign(instance, values);
	return instance;
};

SnakeGameOverState.recalculateElements = function() {
	this.gridElements = [
		this.parent.walls, this.parent.floor, this.parent.topBackgroundArea,
		this.parent.snake, this.parent.food, this.parent.scoreText,
		this.parent.gameOverText, this.parent.gameOverSubtitleText
	];
};

SnakeGameOverState.onKeyDown = function(event) {
	if (event.key == " " || event.key == "Spacebar") {
       this.parent.newGame();
   }
};