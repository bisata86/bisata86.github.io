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



canvas.width = canvasWidth;
canvas.height = canvasHeight;
var start = function (startingfrom) {
	var direction = 0;
	var divider = 1;
	var elements = [];
	var angle = 0
	var startingdim = 2;
	var counter = 0;
	ctx.fillStyle = '#9ad3de';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	var myint =setInterval(function(){
		counter++;
		drawrectangle(counter);
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
var temp1, temp2;
var drawrectangle = function (i) {
	var factor = 2;
	var color = '#89bdd3';
	if(i%2==0) color = '#c9c9c9';
	// else if(i%12==0) color = 'red';
	// else if(i%2==0) color = 'black';
	// if(i==1) { temp1 = 0; temp2 = 1; }
	// if(i==temp1+temp2) {
	// 	color = 'red';
	// 	temp1 = temp2;
	// 	temp2 = i;
	// }

	// if(Number.isInteger(Math.sqrt(i))) {

	// 	color = 'blue' //squares
	// }
	// if(Number.isInteger(Math.cbrt(i))) {
	// 	console.log(i)
	// 	color = 'red' //cubes
	// }

	ctx.fillStyle = color;
	ctx.beginPath();
	var r = factor*9*Math.sqrt(i);
	var phi = (1 + Math.sqrt(5)) / 2;
	var theta = i * ((2 * Math.PI)/(phi*phi));
	var x = r* Math.cos(theta);
	var y = r* Math.sin(theta);
	//ctx.arc((canvasWidth/2)+x,(canvasHeight/(3/2)+90)+y,4,1,Math.PI*2);
	ctx.ellipse((canvasWidth/2)+x, (canvasHeight/(3/2)+90)+y, factor*8, factor*6, theta, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = 3;
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