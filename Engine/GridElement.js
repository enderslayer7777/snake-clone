"use strict";
var GridElement = {
	grid:undefined
};

GridElement.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, values);
	return instance;
};

GridElement.draw = function(context) {
	
};

GridElement.update = function() {
	
};

GridElement.tilesOccupied = function() {
	
};

GridElement.tileOccupiedHash = function(rowIndex, columnIndex) {
	return rowIndex.toString() + "," + columnIndex.toString();
}