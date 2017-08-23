"use strict";
var GridRectElement = {
	rowIndex:undefined, columnIndex:undefined,
	rowTiles:1, columnTiles:1,
	x:0, y:0, width:undefined,height:undefined
};

GridRectElement.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridRectElement);
	Object.assign(instance, values);
	return instance;
};

GridRectElement.update = function() {
	this.x = this.grid.x + this.columnIndex * this.grid.tileWidth();
	this.y = this.grid.y + this.rowIndex * this.grid.tileHeight();
	this.width = this.columnTiles * this.grid.tileWidth();
	this.height = this.rowTiles * this.grid.tileHeight();
};

GridRectElement.tilesOccupied = function() {
	var set = new Set();
	for (var r = this.rowIndex; r < this.rowIndex + this.rowTiles; r++) {
		for (var c = this.columnIndex; c < this.columnIndex + this.columnTiles; c++) {
			set.add(GridElement.tileOccupiedHash(r, c));
		};
	};
	return set;
};