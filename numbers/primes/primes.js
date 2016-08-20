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
var canvasWidth = 1440*4//
var canvasHeight = 2560*4//
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
	var mainRect = {'pos': {x:canvasWidth/2-startingdim/2,y:canvasHeight/2-startingdim/2}, 'b2': startingdim,'color':'black'};
	drawrectangle(elements,mainRect);
	//calculatePosition(startingfrom);
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
			direction = changedir(direction);
			if(direction%2==0) {divider++};
		}
		counter++;
		var color = 'black';
		var currY = canvasHeight/2-startingdim/2-Ymod;
		var currX = canvasWidth/2-startingdim/2+Xmod;
		if(currX > canvasWidth || currX < 0) {} else
				if(isPrime(counter)) { color = 'white';}
		// if(counter>=startingfrom) {

		// 		var d1 = new Date();
		// 		var n1 = d1.getTime();
		// 		console.log((n1-n))
		// 		console.log('arrivato facendo il giro '+currX)
		// 		clearInterval(myint);

		// }
		var mainRect = {'pos': {x:currX,y:currY}, 'b2': startingdim,'color':color};
		if(mainRect.pos.y >= canvasHeight)  {
			clearInterval(myint);
			alert('finito '+counter)
		}
		drawrectangle(elements,mainRect);
	}, 0);
};
function calculatePosition(inte) {
		var d1 = new Date();
		var n1 = d1.getTime();
		console.log((n1-n))
		console.log('arrivato calcolando ')
}
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

var drawrectangle = function (arr,rect) {
	arr.push(rect);
	ctx.fillStyle = rect.color;
	ctx.fillRect(rect.pos.x, rect.pos.y, rect.b2, rect.b2);
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