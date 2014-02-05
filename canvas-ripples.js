/*set up animation*/
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame 
    || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 40);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();

var Ripples = new Object();
Ripples.bgColor = 'black';
Ripples.canvas = document.getElementById('canvas-ripples');
Ripples.ctx = canvas.getContext('2d');

Ripples.Ripple = function(options) {
	options = options || {};
	this.x = options.x || Math.random() * Ripples.canvas.height;
	this.y = option.y || Math.random() * Ripples.canvas.width;
	this.color = options.color || 'white';
	this.alpha = options.alpha || 1;
	this.fadeRate = options.fadeRate || 1/100;
	this.rv /*radial velocity*/ = options.rv || .2;
	this.r = options.r || .1;
}
Ripples.Ripple.prototype.update = function() {
	//update properties
	this.r += this.rv;
	this.alpha -= this.fadeRate;
	//draw
	Ripples.ctx.strokeStyle = this.color;
	Ripples.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
}