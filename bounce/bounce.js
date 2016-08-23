
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = $(window).width();
var canvasHeight = $(window).height();
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var shapes = [];
var initialSalamoize = 10;
var storedSalamoize = 100
var loadInterval;
var salamoize = initialSalamoize;
var vel =24;
$( document ).ready(function() {
    $('body').append(canvas);
    $('body').append('<div class="bar"></div>');
    $('.bar').append('<div class="percentage"></div>');
	$('body').on('click', 'canvas', function(event) {
		//event.preventDefault();

		// shapes.push({x:event.pageX,y:event.pageY,radius:100,color:'red',direction:'none'})
		// var temp = shapes.length
		// setTimeout(function(){ explode(temp) }, 1000);
		//drawAll()
	});
	$('body').on('touchstart', 'canvas', function(event) {
		shapes.push({x:event.originalEvent.touches[0].pageX,y:event.originalEvent.touches[0].pageY,radius:salamoize,color:getRandomColor(),direction:'none'})
		loadInterval =  setInterval(function(){
			shapes[shapes.length-1].radius = salamoize;
			salamoize=salamoize+1
			storedSalamoize=storedSalamoize-2;

		}, vel);

	});
	$('body').on('touchend', 'canvas', function(event) {
		clearInterval(loadInterval)
		salamoize = initialSalamoize;
		//shapes.push({x:event.pageX,y:event.pageY,radius:100,color:'red',direction:'none'})
		var temp = shapes.length
		explode(shapes.length)
		//setTimeout(function(){ explode(temp) }, 1000);
	});

	drawAll();
});
var explode = function(index) {
	var e = {x:shapes[index-1].x+shapes[index-1].radius/2,y:shapes[index-1].y,radius:shapes[index-1].radius/2,color:shapes[index-1].color,direction:'e'}
	var w = {x:shapes[index-1].x-shapes[index-1].radius/2,y:shapes[index-1].y,radius:shapes[index-1].radius/2,color:shapes[index-1].color,direction:'w'}
	var n = {x:shapes[index-1].x,y:shapes[index-1].y-shapes[index-1].radius/2,radius:shapes[index-1].radius/2,color:shapes[index-1].color,direction:'n'}
	var s = {x:shapes[index-1].x,y:shapes[index-1].y+shapes[index-1].radius/2,radius:shapes[index-1].radius/2,color:shapes[index-1].color,direction:'s'}
	shapes[index-1].radius = 0;
	shapes.push(n,s,w,e);
}
var drawCirlce= function(centerX,centerY,radius) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();

}
var drawAll= function() {
	$('.percentage').css({
				width: storedSalamoize+'%'});
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var ancora = true;
	$.each(shapes, function(index, val) {
	  ctx.beginPath();
      ctx.arc(val.x, val.y, val.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = val.color;
      ctx.fill();
      if(val.direction!='none' && val.radius!=0) {
      	if(val.direction=='n') {
      		val.y = val.y-val.radius/2
      	}
       	if(val.direction=='s') {
      		val.y = val.y+val.radius/2
      	}
       	if(val.direction=='e') {
      		val.x = val.x+val.radius/2
      	}
       	if(val.direction=='w') {
      		val.x = val.x-val.radius/2
      	}
      	if(val.y<val.radius) {
      		val.direction='s'
      		val.radius = val.radius-1;
      		storedSalamoize++
      	}
      	if(val.y>canvasHeight-val.radius) {
      		val.direction='n'
      		val.radius = val.radius-1;
      		storedSalamoize++
      	}
      	if(val.x>canvasWidth-val.radius) {
      		val.direction='w'
      		val.radius = val.radius-1;
      		storedSalamoize++
      	}
      	if(val.x<0+val.radius) {
      		val.direction='e'
      		val.radius = val.radius-1;
      		storedSalamoize++
      	}
      }
      if(val.radius<10) {
      	val.radius=0;
      }

	});
	if(ancora) {
		setTimeout(function(){ drawAll() }, vel);
	} else {
		console.log('cane')
	}
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

