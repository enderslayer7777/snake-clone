"use strict";
var SnakeTitleState = {
	parent:undefined
};

SnakeTitleState.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridElementCollection);
	Object.assign(instance, SnakeTitleState);
	Object.assign(instance, values);
	return instance;
};

SnakeTitleState.recalculateElements = function() {
	this.gridElements = [
		this.parent.walls, this.parent.floor, this.parent.topBackgroundArea,
		this.parent.titleText, this.parent.subtitleText
	];
};

SnakeTitleState.onKeyDown = function(event) {
	if (event.key == " " || event.key == "Spacebar") {
       this.parent.newGame();
   }
};