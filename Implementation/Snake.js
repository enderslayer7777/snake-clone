"use strict";
var SnakeDirection = {
	NONE:"none", UP:"up", DOWN:"down", LEFT:"left", RIGHT:"right" 
}

var Snake = {
	direction:SnakeDirection.UP
};

Snake.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridElementCollection);
	Object.assign(instance, Snake);
	Object.assign(instance, values);
	return instance;
};

Snake.tileInFrontOfHead = function() {
	var headTile = this.gridElements[0];
	var front;
	if (this.direction == SnakeDirection.UP) {
		front = [headTile.rowIndex - 1, headTile.columnIndex];
	} else if (this.direction == SnakeDirection.DOWN) {
		front = [headTile.rowIndex + 1, headTile.columnIndex];
	} else if (this.direction == SnakeDirection.LEFT) {
		front = [headTile.rowIndex, headTile.columnIndex - 1];
	} else if (this.direction == SnakeDirection.RIGHT) {
		front = [headTile.rowIndex, headTile.columnIndex + 1];
	} else if (this.direction != SnakeDirection.NONE) {
		throw "Unexpected direction value encountered " + this.direction;
	};
	return front;
}

Snake.advanceOneTile = function() {
	var front = this.tileInFrontOfHead();
	var tailTile = this.gridElements.pop();
	tailTile.rowIndex = front[0];
	tailTile.columnIndex = front[1];
	this.gridElements.unshift(tailTile);
};

Snake.eat = function(rowIndex, columnIndex) {
	var tile = GridRectangle.createInstance({
		colour:"green", grid:this.grid,
		rowIndex:rowIndex, columnIndex:columnIndex,
      rowTiles:1, columnTiles:1
	});
	this.gridElements.unshift(tile);
};