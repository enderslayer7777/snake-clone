"use strict";
var GridText = {
	colour:"black", font:"bold 16px Arial",
	text:"", verticalAlign:"middle", horizontalAlign:"left",
	TOP:"top", MIDDLE:"middle", BOTTOM:"bottom",
	LEFT:"left", CENTRE:"centre", RIGHT:"right"
};

GridText.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridRectElement);
	Object.assign(instance, GridText);
	Object.assign(instance, values);
	return instance;
};

GridText.draw = function(context) {
	context.fillStyle = this.colour;
	context.font = this.font;
	context.textBaseline = this.verticalAlign;
	var fillTextX = this.x;
	var fillTextY = this.y;
	var textWidth = context.measureText(this.text).width;
	if (this.horizontalAlign == GridText.CENTRE) {
		fillTextX = this.x + (this.width - textWidth) / 2;
	} else if (this.horizontalAlign == GridText.RIGHT) {
		fillTextX = this.x + this.width - textWidth;
	};
	if (this.verticalAlign == GridText.MIDDLE) {
		fillTextY = this.y + this.height / 2;
	} else if (this.verticalAlign == GridText.BOTTOM) {
		fillTextY = this.y + this.height;
	};
	context.fillText(this.text, fillTextX, fillTextY);
};