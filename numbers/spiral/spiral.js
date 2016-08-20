var isMobile = detectmob();
$( document ).ready(function() {

    $('#canvasContainer').append(canvas);
     d = new Date();
 	n = d.getTime();
 //	console.log('inizio'+n)
	start(1024);
	//setTimeout(function(){start(true);}, 4000);



});
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 1440//
var canvasHeight = 2560//
var d = new Date();
var n = d.getMilliseconds();




canvas.width = canvasWidth;
canvas.height = canvasHeight;
var start = function (startingfrom) {
	var direction = 0;
	var divider = 1;
	var elements = [];
	var angle = 0
	var startingdim = 2;
	var counter = 1;
	var myint =setInterval(function(){
		counter++;
		drawrectangle(elements,counter);
	}, 0);
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
	return dir;
}

var drawrectangle = function (arr,i) {
	//arr.push(rect);
	var color = 'black';
	if(isPrime(i)) color = 'white';
	ctx.fillStyle = color;
	ctx.beginPath();
	var x = (canvasWidth/2)+Math.cos(Math.sqrt(i)*2*Math.PI)*Math.sqrt(i)*13
	var y = (canvasHeight/2)+Math.sin(Math.sqrt(i)*2*Math.PI)*Math.sqrt(i)*10
	ctx.arc(x,y,4,1,Math.PI*2);
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();
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