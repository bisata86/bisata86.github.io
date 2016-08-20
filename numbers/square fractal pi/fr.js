
var isMobile = detectmob();
$( document ).ready(function() {
    $('#canvasContainer').append(canvas);
	start()

});
var deep;
var curdeep = 1;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 600;
var canvasHeight = 600;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var startingdim = canvasHeight;
var elements = [];
var area;
var staringfrom = 3;



var start = function () {
	deep = startingdim;
	var mainRect = {'b2': startingdim, 'pos':{x:canvasWidth/2-startingdim/2,y:canvasHeight-startingdim}, 'color':'black'};
	drawrectangle(mainRect);
	area = convert(startingdim)*convert(startingdim);
	$('.debug').append('Area: '+area);
	elements.push(mainRect);
	setInterval(function(){
		if(elements[0]!=undefined)
		step(elements[0])
	 },0);
};
var convert = function(toConvert){
	return toConvert/canvasHeight
}

var step =  function(rect) {
	if(rect!=undefined && deep != rect.b2) {
		deep=rect.b2;
		curdeep++;
		staringfrom=staringfrom+2;
	}
	var color = 'white';
	area = area - (convert(rect.b2/staringfrom)*convert(rect.b2/staringfrom))
	$('.debug').html('<div></div>PI: '+area*4);
	var newrect = {'b2': rect.b2/staringfrom, 'pos': {x:(rect.pos.x)+(rect.b2/staringfrom*Math.floor(staringfrom/2)),y:(rect.pos.y)+(rect.b2/staringfrom*Math.floor(staringfrom/2))}, 'color':color};
	drawrectangle(newrect);
	for (var i = 0; i <= staringfrom-1; i++) {
		for (var j = 0; j <= staringfrom-1; j++) {
			var mynewrect = {'b2': rect.b2/staringfrom, 'pos': {x:(rect.pos.x)+(rect.b2/staringfrom*j),y:(rect.pos.y)+(rect.b2/staringfrom*i)}, 'color':color};
			if(!(j==Math.floor(staringfrom/2) && i==Math.floor(staringfrom/2)) ) {
				elements.push(mynewrect);
			}
		};
	};
	elements.shift();

}

var drawrectangle = function (rect) {
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