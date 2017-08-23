"use strict";
var Grid = {
	rows:undefined, columns:undefined,
	x: 0, y: 0, width:undefined, height:undefined
};

Grid.createInstance = function(values) {
	var instance = Object.create(Grid);
	Object.assign(instance, values);
	return instance;
};

Grid.tileWidth = function() {
	return Math.trunc(this.width / this.columns);
};

Grid.tileHeight = function() {
	return Math.trunc(this.height / this.rows);
};