"use strict";
var SnakePlayState = {
	parent:undefined, score:0, secondsPerTick:0.1,
	lastTick:new Date(), movementTick:true, gameOver:false
};

SnakePlayState.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridElementCollection);
	Object.assign(instance, SnakePlayState);
	Object.assign(instance, values);
	return instance;
};

SnakePlayState.newGame = function() {
	this.parent.snake = this.parent.initSnake();
	this.parent.food = this.parent.initFood();
	this.lastTick = new Date();
	this.score = 0;
	this.movementTick = true;
	this.gameOver = false;
};

SnakePlayState.recalculateElements = function() {
	this.gridElements = [
		this.parent.walls, this.parent.floor, this.parent.topBackgroundArea,
		this.parent.snake, this.parent.food, this.parent.scoreText,
		this.parent.miniTitleText
	];
};

SnakePlayState.update = function() {
	if (this.gameOver) {this.parent.showGameOverScreen(); return;}
	var currentTime = new Date();
	if (Math.trunc(currentTime - this.lastTick) / 1000 >= this.secondsPerTick) {
		var tileInFrontOfHead = this.parent.snake.tileInFrontOfHead();
		var rowIndex = tileInFrontOfHead[0];
		var columnIndex = tileInFrontOfHead[1];
		var tileHash = GridElement.tileOccupiedHash(rowIndex, columnIndex);
		var snakeTiles = this.parent.snake.tilesOccupied();
		if (rowIndex == this.parent.food.rowIndex && columnIndex == this.parent.food.columnIndex) {
			this.parent.snake.eat(rowIndex, columnIndex);
			this.parent.food = this.parent.initFood();
			this.recalculateElements();
			this.score += 1;
		} else {
			this.parent.snake.advanceOneTile();
			if (this.parent.wallTiles.has(tileHash) || snakeTiles.has(tileHash)) {
				this.gameOver = true;
			};
		}
		this.lastTick = currentTime;
		this.movementTick = true;
	};
	this.parent.scoreText.score = this.score;
	GridElementCollection.update.call(this);
};

SnakePlayState.onKeyDown = function(event) {
	if (!this.movementTick) {
   	return;
   } else if (event.key == "ArrowLeft" && this.parent.snake.direction != SnakeDirection.RIGHT) {
       this.parent.snake.direction = SnakeDirection.LEFT;
       this.movementTick = false;
   }
   else if (event.key == "ArrowUp" && this.parent.snake.direction != SnakeDirection.DOWN) {
       this.parent.snake.direction = SnakeDirection.UP;
       this.movementTick = false;
   }
   else if (event.key == "ArrowRight" && this.parent.snake.direction != SnakeDirection.LEFT) {
       this.parent.snake.direction = SnakeDirection.RIGHT;
       this.movementTick = false;
   }
   else if (event.key == "ArrowDown" && this.parent.snake.direction != SnakeDirection.UP) {
       this.parent.snake.direction = SnakeDirection.DOWN;
       this.movementTick = false;
   };
};