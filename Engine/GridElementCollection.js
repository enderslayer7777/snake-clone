"use strict";
var GridElementCollection = {
	gridElements:undefined
};

GridElementCollection.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridElementCollection);
	Object.assign(instance, values);
	return instance;
};

GridElementCollection.draw = function(context) {
	for (var element of this.gridElements) {element.draw(context);};
};

GridElementCollection.update = function() {
	for (var element of this.gridElements) {
		element.grid = this.grid;
		element.update();
	};
};

GridElementCollection.tilesOccupied = function() {
	var set = new Set();
	for (var element of this.gridElements) {
		for (var tile of element.tilesOccupied()) {
			set.add(tile);
		}
	}
	return set;
};