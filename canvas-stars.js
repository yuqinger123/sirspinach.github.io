/*set up animation*/
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame 
    || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var Stars = new Object();
Stars.bgColor = "#05004c";
Stars.canvas = document.getElementById("canvas-stars");
Stars.canvas.width = window.innerWidth;
Stars.canvas.height = window.innerHeight;
Stars.ctx = Stars.canvas.getContext("2d");

//define Star class
Stars.Star = function(x, y, options) {
	this.x = x || Math.random()*Stars.canvas.width;
	this.y = y || Math.random()*Stars.canvas.height;

	options = options || {};
	this.size = options.size || Math.random() * 2;
	this.color = options.color || "white";

	this.vx = Math.random() *.05;
}
Stars.Star.prototype.update = function() {
	//update position
	this.x -= this.vx;
	if (this.x < 0)
		this.x = Stars.canvas.width;

	//draw
	Stars.ctx.fillStyle = this.color;
	Stars.ctx.fillRect(this.x, this.y, this.size, this.size);
}

//populate stars
Stars.STAR_DENSITY = 1/1300;
Stars.populateStars = function() {
	Stars.stars = [];
	for (var i = 0; i < Stars.canvas.width*Stars.canvas.height*Stars.STAR_DENSITY; i++)
		Stars.stars.push(new Stars.Star());

	for (i = 0; i < 10; i++)
		Stars.stars.push(new Stars.Star(0, 0, {color:"#00A78D", size:2}));
}

//define resize event
Stars.onResize = function() {
	Stars.canvas.width = window.innerWidth;
	Stars.canvas.height = window.innerHeight;
	Stars.populateStars();
}
window.addEventListener("resize", function(){Stars.doResize=true}, false);

Stars.update = function() {
	//limit resize event to once per update to prevent resize lagging
	if (Stars.doResize) Stars.onResize();
	Stars.doResize = false;

	//clear screen
	Stars.ctx.fillStyle = Stars.bgColor;
	Stars.ctx.fillRect(0, 0, Stars.canvas.width, Stars.canvas.height);

	//update and draw stars
	for (var i = 0; i < Stars.stars.length; i++) {
		Stars.stars[i].update();
	}
	requestAnimationFrame(Stars.update);
}
Stars.populateStars();
Stars.update();
