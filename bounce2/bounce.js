
var ctx;
var canvasWidth ;
var canvasHeight;
var shapes = [];
var enemyVel = 1;
var enemy = {};
var initialSalamoize = 10;
var storedSalamoize = 100
var loadInterval;
var reloadGame = false;
var salamoize = initialSalamoize;
    var enemyReady = false;
    var enemyImage;
var vel =24;
$( document ).ready(function() {
  enemyImage = new Image();
  enemyImage.onload = function () {
    enemyReady = true;
  };
  enemyImage.src = "./up.png";
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvasWidth = $(window).width();
  canvasHeight = $(window).height();
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  enemy.radius = 40;
  enemy.x= canvasWidth/2
  enemy.y= canvasHeight*3/4;
  enemy.direction = 0;
    $('body').append(canvas);
    $('body').append("<div class='go'></div>");
	$('body').on('click', 'canvas', function(event) {
		//event.preventDefault();

		// shapes.push({x:event.pageX,y:event.pageY,radius:100,color:'red',direction:'none'})
		// var temp = shapes.length
		// setTimeout(function(){ explode(temp) }, 1000);
		//drawAll()
	});
	$('body').on('touchstart', '.go', function(event) {
      enemy.moving = true;
	});
	$('body').on('touchend', '.go', function(event) {
		enemy.moving = false;
	});

	drawAll();
});
var placeEnemy = function() {
      if (enemyReady) {
      ctx.drawImage(enemyImage, enemy.x-enemy.radius/2, enemy.y-enemy.radius/2, enemy.radius, enemy.radius);
  }
}
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var ancora = true;
  if(enemy.moving) {
    enemy.y=enemy.y-1;
  }
	if(ancora) {
		setTimeout(function(){ drawAll() }, vel);
	} else {
		console.log('cane')
	}
    placeEnemy();
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function distanceBetween2(f,s) {
  var x1 = f.x;
  var y1 = f.y;
  var x2 =  s.x;
  var y2 =  s.y;
  return  Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}

