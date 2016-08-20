var isMobile = detectmob();
$( document ).ready(function() {

    $('#canvasContainer').append(canvas);
	srart()

});
var counter = 0;
var deep = 0;
var deeplimit = 8;
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 500;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var startingelement;
var elements = [];
var direction = 0;
var divider = 1;
var w,d;
var salamoia = 32;
var srart = function () {
	counter = 0;
	direction = 0;
	divider = 1;
	var angle = 0
	var startingdim = 1;
	var mainRect = {'pos': {x:canvasWidth/2-startingdim/2,y:canvasHeight/2-startingdim/2}, 'b2': startingdim,'color':'transparent'};
	drawrectangle(mainRect);
	var counter = 1;
	var Xmod = 0;var Ymod = 0;
	var myint =setInterval(function(){
		if(direction==0) {
			Xmod += startingdim;
		}
		if(direction==1) {
			Ymod += startingdim;
		}
		if(direction==2) {
			Xmod -= startingdim;
		}
		if(direction==3) {
			Ymod -= startingdim;
		}
		if(counter%divider==0) {
			changedir(direction);
		}
		counter++;
		var color = 'transparent';
		var currY = canvasHeight/2-startingdim/2-Ymod;
		var currX = canvasWidth/2-startingdim/2+Xmod;
		if(counter%salamoia==0) { color = 'white';}
		var mainRect = {'pos': {x:currX,y:currY}, 'b2': startingdim,'color':color};
		if(mainRect.pos.x >= canvasWidth)  {
			clearInterval(myint);


			ctx.font = '60pt Calibri';
		    ctx.fillStyle = 'blue';
		    ctx.fillText(salamoia, 10, 60);
			$('#draws').append("<div><img name='testXXX.jpg' src='"+canvas.toDataURL("image/png")+"' alt='"+salamoia+"'/></div>");
			 salamoia=salamoia*2;
			 ctx.clearRect(0, 0, canvas.width, canvas.height);
			srart();
		}
		drawrectangle(mainRect);
	}, 1);
};
function isPrime(n) {
 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
 if (n%2==0) return (n==2);
 if (n%3==0) return (n==3);
 var m=Math.sqrt(n);
 for (var i=5;i<=m;i+=6) {
  if (n%i==0)     return false;
  if (n%(i+2)==0) return false;
 }
 return true;
}
var changedir = function(dir) {
	if(dir!=3) {
		dir++;
	} else {
		dir = 0;
	}
	if(dir%2==0) {divider++};
	direction = dir;
}

var drawrectangle = function (rect) {
	elements.push(rect);
	ctx.fillStyle = rect.color;
	ctx.fillRect(rect.pos.x, rect.pos.y, rect.b2, rect.b2);
	ctx.fillStyle = rect.color;


};


function detectmob() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}