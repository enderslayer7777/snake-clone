"use strict";
var ScoreText = {
	score:0
};

ScoreText.createInstance = function(values) {
	var instance = Object.create(GridElement);
	Object.assign(instance, GridRectElement);
	Object.assign(instance, GridText);
	Object.assign(instance, ScoreText);
	Object.assign(instance, values);
	return instance;
};

ScoreText.computeText = function() {
	var prefix = "";
	if (this.score < 10) {
		prefix = "  ";
	} else if (this.score < 100) {
		prefix = " ";
	}
	return "Score: " + prefix + this.score;
}

ScoreText.update = function() {
	this.text = this.computeText(); 
	GridRectElement.update.call(this);
};