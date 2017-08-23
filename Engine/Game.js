"use strict";
var Game = {
	canvas:undefined,
	width:800, height:600,
	timeout:1000 / 60, colour:"black",
	elements:[], state:undefined
};

Game.createInstance = function(values) {
	var instance = Object.create(Game);
	Object.assign(instance, values);
	return instance;
};

Game.getCanvasContext = function() {
	return this.canvas.getContext("2d");
};

Game.fillBackground = function() {
	var context = this.getCanvasContext();
	context.fillStyle = this.colour;
	context.fillRect(0, 0, this.width, this.height);
};

Game.draw = function() {
	var context = this.getCanvasContext();
	this.fillBackground();
	for (var e of this.elements) {e.draw(context)};
	if (this.state) {this.state.draw(context)};
};

Game.update = function() {
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	for (var e of this.elements) {e.update()};
	if (this.state) {this.state.update()};
};