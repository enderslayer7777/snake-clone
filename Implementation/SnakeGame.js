"use strict";
var SnakeGame = {
	grid:undefined, walls:undefined, wallTiles:undefined,
	snake:undefined, floor:undefined, food:undefined,
	topBackgroundArea:undefined, scoreText:undefined,
	titleText:undefined, miniTitleText:undefined,
	subtitleText:undefined, gameOverText:undefined, gameOverSubtitleText:undefined,
	titleState:undefined, playState:undefined, gameOverState:undefined
};

SnakeGame.createInstance = function(values) {
	var instance = Object.create(Game);
	Object.assign(instance, SnakeGame);
	Object.assign(instance, values);
	return instance;
};

SnakeGame.onKeyDown = function(event) {
	if (event.key == "ArrowLeft" || event.key == "ArrowRight" ||
		event.key == "ArrowUp" || event.key == "ArrowDown" ||
		event.key == " " || event.key == "Spacebar") {
		event.preventDefault();
	};
	if (this.state) {this.state.onKeyDown(event)};
};

SnakeGame.initElements = function() {
	this.grid = this.initGrid();
	this.width = this.grid.width;
	this.height = this.grid.height;
	this.walls = this.initWalls();
	this.wallTiles = this.walls.tilesOccupied();
	this.floor = this.initFloor();
	this.topBackgroundArea = this.initTopBackgroundArea();
	this.scoreText = this.initScoreText();
	this.snake = this.initSnake();
	this.food = this.initFood();
	this.titleText = this.initTitleText();
	this.subtitleText = this.initSubtitleText();
	this.miniTitleText = this.initMiniTitleText();
	this.gameOverText = this.initGameOverText();
	this.gameOverSubtitleText = this.initGameOverSubtitleText();
	this.titleState = SnakeTitleState.createInstance({grid:this.grid, parent:this});
	this.playState = SnakePlayState.createInstance({grid:this.grid, parent:this});
	this.gameOverState = SnakeGameOverState.createInstance({grid:this.grid, parent:this});
};

SnakeGame.showTitleScreen = function() {
	this.titleState.recalculateElements();
	this.state = this.titleState;
};

SnakeGame.newGame = function() {
	this.playState.newGame();
	this.playState.recalculateElements();
	this.state = this.playState;
};

SnakeGame.showGameOverScreen = function() {
	this.gameOverState.recalculateElements();
	this.state = this.gameOverState;
};

SnakeGame.initGrid = function() {
	var grid = Grid.createInstance({
   	width:575, height:598, rows:26, columns:25
 	});
 	return grid;
};

SnakeGame.initWalls = function() {
	var topWall = GridRectangle.createInstance({
      grid:this.grid, colour:"black",
      rowIndex:1, columnIndex:0,
      rowTiles:1, columnTiles:25
    });
    var bottomWall = GridRectangle.createInstance({
      grid:this.grid, colour:"black",
      rowIndex:25, columnIndex:0,
      rowTiles:1, columnTiles:25
    });
    var leftWall = GridRectangle.createInstance({
      grid:this.grid, colour:"black",
      rowIndex:1, columnIndex:0,
      rowTiles:25, columnTiles:1
    });
    var rightWall = GridRectangle.createInstance({
      grid:this.grid, colour:"black",
      rowIndex:1, columnIndex:24,
      rowTiles:25, columnTiles:1
    });
    var walls = GridElementCollection.createInstance({
      grid:this.grid, gridElements:[topWall, bottomWall, leftWall, rightWall]
    });
    return walls;
};

SnakeGame.initFloor = function() {
	var floor = GridRectangle.createInstance({
		grid:this.grid, colour:"white",
	   rowIndex:2, columnIndex:1,
	   rowTiles:23, columnTiles:23
	});
   return floor;
};

SnakeGame.initTopBackgroundArea = function() {
	var topBackground = GridRectangle.createInstance({
      grid:this.grid, colour:"lightgray",
      rowIndex:0, columnIndex:0,
      rowTiles:1, columnTiles:25
    });
    return topBackground;
};

SnakeGame.initScoreText = function() {
	var scoreText = ScoreText.createInstance({
      grid:this.grid, colour:"black", 
      font:"18px Helvetica", verticalAlign:GridText.MIDDLE,
      rowIndex:0, columnIndex:20,
      rowTiles:1, columnTiles:4
    });
    return scoreText;
};

SnakeGame.initSnake = function() {
	var snake = Snake.createInstance({
		grid:this.grid, gridElements:[],
		direction:SnakeDirection.LEFT
	});

	var rowIndex = Math.trunc(this.floor.rowIndex + this.floor.rowTiles / 2);
	var columnIndex = this.floor.columnIndex + this.floor.columnTiles - 1;
	var numberOfTiles = 5;
	for (var i = 0; i < numberOfTiles; i++) {
		snake.eat(rowIndex, columnIndex - i);
	};

   return snake;
};

SnakeGame.initFood = function() {
	var snakeTiles = this.snake.tilesOccupied();

	var rowIndex = Math.trunc(Math.random() * (this.floor.rowTiles)) + this.floor.rowIndex;
	var columnIndex = Math.trunc(Math.random() * (this.floor.columnTiles)) + this.floor.columnIndex;
	var tileHash = GridElement.tileOccupiedHash(rowIndex, columnIndex);
	while (snakeTiles.has(tileHash)) {
		rowIndex = Math.trunc(Math.random() * this.floor.rowTiles) + this.floor.rowIndex;
		columnIndex = Math.trunc(Math.random() * this.floor.columnTiles) + this.floor.columnIndex;
		tileHash = GridElement.tileOccupiedHash(rowIndex, columnIndex);
	};
	
	var food = GridRectangle.createInstance({
		colour:"blue", grid:this.grid,
		rowIndex:rowIndex, columnIndex:columnIndex,
      rowTiles:1, columnTiles:1
	});
	return food;
};

SnakeGame.initTitleText = function() {
	var titleText = GridText.createInstance({
      grid:this.grid, colour:"black",
      font:"100px bold Helvetica", text:"SNAKE",
      horizontalAlign:GridText.CENTRE, verticalAlign:GridText.MIDDLE,
      rowIndex:8, columnIndex:6,
      rowTiles:4, columnTiles:12
    });
    return titleText;
};

SnakeGame.initSubtitleText = function() {
	var titleText = GridText.createInstance({
      grid:this.grid, colour:"black",
      font:"40px Arial", text:"Press Spacebar to start.",
      horizontalAlign:GridText.CENTRE, verticalAlign:GridText.MIDDLE,
      rowIndex:12, columnIndex:5,
      rowTiles:3, columnTiles:15
    });
    return titleText;
};

SnakeGame.initMiniTitleText = function() {
	var miniTitleText = GridText.createInstance({
	   grid:this.grid, colour:"black", verticalAlign:GridText.MIDDLE,
	   font:"bold 21px Helvetica", text:"Snake",
	   rowIndex:0, columnIndex:1,
	   rowTiles:1, columnTiles:3
	 });
	 return miniTitleText;
};

SnakeGame.initGameOverText = function() {
	var gameOverText = GridText.createInstance({
	   grid:this.grid, colour:"black", verticalAlign:GridText.MIDDLE,
	   font:"bold 21px Helvetica", text:"Game Over:",
	   rowIndex:0, columnIndex:1,
	   rowTiles:1, columnTiles:6
	 });
	 return gameOverText;
};

SnakeGame.initGameOverSubtitleText = function() {
	var gameOverSubtitleText = GridText.createInstance({
	   grid:this.grid, colour:"black", verticalAlign:GridText.MIDDLE,
	   font:"19px Arial", text:"Press spacebar to play again.",
	   rowIndex:0, columnIndex:7,
	   rowTiles:1, columnTiles:10
	 });
	 return gameOverSubtitleText;
};