var isMobile = detectmob();
$( document ).ready(function() {

    $('#canvasContainer').append(canvas);
	start()

});
var deep;
var curdeep = 1;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 1000;
var canvasHeight = 1000;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var elements = [];
var area;


var start = function () {
	var startingdim = canvasHeight;
	deep = startingdim;
	var mainRect = {'b2': startingdim, 'pos':{x:canvasWidth/2-startingdim/2,y:canvasHeight-startingdim}, 'color':'black'};
	drawrectangle(mainRect);
	elements.push(mainRect);
	setInterval(function(){
		step(elements[0])
	 },0);
};
var convert = function(toConvert){
	return toConvert/1000
}

var step =  function(rect) {
	var color = 'white';
	var newrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x)+(rect.b2/3),y:(rect.pos.y)+(rect.b2/3)}, 'color':color};
	drawrectangle(newrect);
	area = area - (convert(rect.b2/3)*convert(rect.b2/3))
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x),y:(rect.pos.y)}, 'color':color};
	elements.push(mynewrect);
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x),y:(rect.pos.y)+(rect.b2/3)}, 'color':color};
	elements.push(mynewrect);
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x),y:(rect.pos.y)+(rect.b2/3*2)}, 'color':color};
	elements.push(mynewrect);
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x)+(rect.b2/3),y:(rect.pos.y)+(rect.b2/3*2)}, 'color':color};
	elements.push(mynewrect);
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x)+(rect.b2/3*2),y:(rect.pos.y)+(rect.b2/3*2)}, 'color':color};
	elements.push(mynewrect);
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x)+(rect.b2/3*2),y:(rect.pos.y)+(rect.b2/3)}, 'color':color};
	elements.push(mynewrect);
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x)+(rect.b2/3*2),y:(rect.pos.y)}, 'color':color};
	elements.push(mynewrect);
	var mynewrect = {'b2': rect.b2/3, 'pos': {x:(rect.pos.x)+(rect.b2/3),y:(rect.pos.y)}, 'color':color};
	elements.push(mynewrect);
	elements.shift();
}

var drawrectangle = function (rect) {
	if(deep != rect.b2) {
		deep=rect.b2;
		// $('.debug').append(curdeep+' '+elements.length);
		// $('.debug').append('<div></div>');
		// $('.debug').append('['+deep+'-'+convert(deep)+']');
		curdeep++;
	}
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