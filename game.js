(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

(function () {
"use strict";

/*** helpers ***/
var requestAnimationLoop = function (tick, element) {
	var last = Date.now();
	
	function loop (now) {
		requestAnimationFrame(loop, element);
		tick(now - last);
		last = now;
	}
	
	loop(last);
};


/*** paper ***/
var paper = Raphael(document.body, 1280, 720);
paper.setViewBox(0, 0, 1280, 720);

var layout = function () {
	var width = document.documentElement.clientWidth,
		height = document.documentElement.clientHeight,
		horizontal = width / 1280,
		vertical = height / 720,
		scale = Math.min(horizontal < vertical ? horizontal : vertical, 1);
	
	paper.canvas.setAttribute("width", 1280 * scale);
	paper.canvas.setAttribute("height", 720 * scale);
	
	paper.canvas.style.left = ((width - (1280 * scale)) / 2) + "px";
	paper.canvas.style.top = ((height - (720 * scale)) / 2) + "px";
};


/*** shapes ***/
var path = paper.path("M 0,0 C 210.44511,587.53709 340.77151,743.50148 472.16617,548.01187 603.56083,352.52226 126.05341,290.5638 437.9822,186.94362 749.91098,83.323442 404.86647,19.228487 790.50445,80.118694 1176.1424,141.0089 1435.727,-14.95549 906.94362,259.58457 378.16024,534.12463 653.76855,130.32641 723.20475,155.96439 792.64095,181.60237 924.03561,770.20772 1098.1602,584.33234 1272.2849,398.45697 1164.629,720 1164.629,720")
	.attr({ "stroke-linecap": "square", "stroke-width": 50 });

var circle = paper.circle(0, 0, 20)
	.attr({ fill: "red", stroke: "none" });

var plen = path.getTotalLength(),
	point = 0;


/*** start ***/
window.addEventListener("resize", layout, false);
layout();

requestAnimationLoop(function (dt) {
	var pos = path.getPointAtLength(point += (dt / (1000 / 60)));
	
	circle.attr({ cx: pos.x, cy: pos.y });
}, paper.canvas);

})();