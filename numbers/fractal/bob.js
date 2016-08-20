var isMobile = detectmob();
$( document ).ready(function() {

    $('#canvasContainer').append(canvas);
	srart()

});
var deep = 1;
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 700;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var startingelement;
var elements = [];
var maxguard = 23412213;


var srart = function () {
	var angle = 0
	var startingdim = 100;
	if(deep%2==0) angle = 45;
	var mainRect = {'prev': {x:0,y:0}, 'b2': startingdim, 'angle':angle , 'trans':{x:canvasWidth/2-startingdim/2,y:canvasHeight-startingdim}, 'color':'brown'};
	startingelement = mainRect;
	drawrectangle(mainRect);

			step(mainRect)
	setInterval(function(){
			step(elements[0])
	 },0);



};

var step =  function(rect) {
	if(maxguard==0) return false;
	maxguard--;
	deep++;
	var color;
	var angle;
	var xt, xt2, prevX, prevX2;
	var yt, yt2, prevY, prevY2;
	if(deep%2==0) {
		angle = 45;
		color =  'green';
	} else {
		angle = 0;
		color = 'brown';
	}

	if(deep%8==6 || deep%8==0 || deep%8==4 || deep%8==2) {
		if((rect.prev.x == 0)) {
			xt =  rect.trans.x+rect.b2;
			yt =  rect.trans.y-rect.b2;
			xt2 =  rect.trans.x;
			yt2 =  rect.trans.y-rect.b2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		}
		else if((rect.prev.x == rect.trans.x && rect.prev.y < rect.trans.y)) {
			xt =  rect.trans.x;
			yt =  rect.trans.y+rect.b2;
			xt2 =  rect.trans.x+rect.b2;
			yt2 =  rect.trans.y+rect.b2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		} else if((rect.prev.x < rect.trans.x && rect.prev.y < rect.trans.y) || (rect.prev.x < rect.trans.x && rect.prev.y == rect.trans.y)) {
			xt =  rect.trans.x+rect.b2*3/2;
			yt =  rect.trans.y+rect.b2/2;
			xt2 =  rect.trans.x+rect.b2*3/2;
			yt2 =  rect.trans.y-rect.b2/2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		} else if((rect.prev.x == rect.trans.x && rect.prev.y > rect.trans.y) || (rect.prev.x > rect.trans.x && rect.prev.y > rect.trans.y)) {
			xt =  rect.trans.x+rect.b2;
			yt =  rect.trans.y-rect.b2;
			xt2 =  rect.trans.x;
			yt2 =  rect.trans.y-rect.b2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		}  else if(rect.b2+rect.trans.x==rect.prev.x) {
			xt =  rect.trans.x;
			yt =  rect.trans.y+rect.b2;
			xt2 =  rect.trans.x+rect.b2;
			yt2 =  rect.trans.y+rect.b2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		} else if((rect.prev.x > rect.trans.x && rect.prev.y == rect.trans.y) || (rect.prev.x > rect.trans.x && rect.prev.y < rect.trans.y)) {
			xt2 =  rect.trans.x-rect.b2/2;
			yt2 =  rect.trans.y+rect.b2/2;
			xt =  rect.trans.x-rect.b2/2;
			yt =  rect.trans.y-rect.b2/2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		}
	}
	else if(deep%8==7 || deep%8==1 || deep%8==3 || deep%8==5) {
		if((rect.prev.x == rect.trans.x && rect.prev.y < rect.trans.y) || (rect.prev.x > rect.trans.x && rect.prev.y < rect.trans.y)) {
			xt = rect.trans.x-Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2));
			yt =  rect.trans.y+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			xt2 = rect.trans.x-Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			yt2 =  rect.trans.y+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2));
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		} else if((rect.prev.x == rect.trans.x && rect.prev.y > rect.trans.y) || (rect.prev.x > rect.trans.x && rect.prev.y > rect.trans.y)) {
			xt = rect.trans.x-Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			yt =  rect.trans.y-Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			xt2 = rect.trans.x-Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2));
			yt2 =  rect.trans.y;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		} else if((rect.prev.y - rect.trans.y == Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2) || (rect.prev.y-rect.trans.y==Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2)))) {
			xt = rect.trans.x+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			yt =  rect.trans.y;
			xt2 = rect.trans.x;
			yt2 =  rect.trans.y-Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		}else if((rect.prev.x < rect.trans.x) || (rect.prev.y > rect.trans.y)) {
			xt = rect.trans.x;
			yt =  rect.trans.y+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2));
			xt2 = rect.trans.x+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			yt2 =  rect.trans.y+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		}else if((rect.prev.x > rect.trans.x) && (rect.prev.y < rect.trans.y)) {
			xt = rect.trans.x;
			yt =  rect.trans.y+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2));
			xt2 = rect.trans.x+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2+200;
			yt2 =  rect.trans.y+Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2;
			prevX = rect.trans.x;
			prevY = rect.trans.y;
		}
	}

	var newrect = {'prev': {x: prevX, y:prevY}, 'b2': Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2, 'angle': angle , 'trans': {x:xt,y:yt}, 'color':color};
	drawrectangle(newrect);
	var newrect = {'prev': {x: prevX , y:prevY}, 'b2': Math.sqrt((rect.b2)*(rect.b2)+(rect.b2)*(rect.b2))/2, 'angle': angle , 'trans': {x:xt2,y:yt2}, 'color':color};
	drawrectangle(newrect);
	elements.shift();
	if(color!=elements[0].color) deep--;

}

var deepest=0;
var drawrectangle = function (rect) {
	elements.push(rect);
	ctx.translate(rect.trans.x, rect.trans.y);
	ctx.rotate(rect.angle * Math.PI / 180);
	ctx.fillStyle = rect.color;
	ctx.fillRect(0, 0, rect.b2, rect.b2);
	ctx.rotate(-rect.angle * Math.PI / 180);
	ctx.translate(-rect.trans.x,-rect.trans.y);

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