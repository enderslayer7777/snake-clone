"use strict";
var GridRectangle = {
	colour:"black"
};

GridRectangle.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridRectElement);
	Object.assign(instance, GridRectangle);
	Object.assign(instance, values);
	return instance;
};

GridRectangle.draw = function(context) {
	context.fillStyle = this.colour;
	context.fillRect(this.x, this.y, this.width, this.height);
};