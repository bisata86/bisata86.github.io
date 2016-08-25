
var ctx;
var canvasWidth ;
var canvasHeight;
var shapes = [];
var enemy = {};
var initialSalamoize = 10;
var storedSalamoize = 100
var loadInterval;
var salamoize = initialSalamoize;
    var enemyReady = false;
    var enemyImage;
var vel =24;
$( document ).ready(function() {
  enemyImage = new Image();
  enemyImage.onload = function () {
    enemyReady = true;
  };
  enemyImage.src = "./enemy.png";
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvasWidth = $(window).width();
  canvasHeight = $(window).height();
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  enemy.radius = 40;
  enemy.x= canvasWidth/2
  enemy.y= canvasHeight/2
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
      if(storedSalamoize>=0) {
			shapes[shapes.length-1].radius = salamoize;
			salamoize=salamoize+1
			storedSalamoize=storedSalamoize-1;
      }
		}, vel);
	});
	$('body').on('touchend', 'canvas', function(event) {
		clearInterval(loadInterval)
		salamoize = initialSalamoize;
		//shapes.push({x:event.pageX,y:event.pageY,radius:100,color:'red',direction:'none'})
		explode(shapes.length)
		//setTimeout(function(){ explode(temp) }, 1000);
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
      		val.radius = val.radius*0.9;
          if(storedSalamoize<100)
      		storedSalamoize++
      	}
      	if(val.y>canvasHeight-val.radius) {
      		val.direction='n'
      		val.radius = val.radius*0.9;
           if(storedSalamoize<100)
      		storedSalamoize++
      	}
      	if(val.x>canvasWidth-val.radius) {
      		val.direction='w'
      		val.radius = val.radius*0.9;
           if(storedSalamoize<100)
      		storedSalamoize++
      	}
      	if(val.x<0+val.radius) {
      		val.direction='e'
      		val.radius = val.radius*0.9;
           if(storedSalamoize<100)
      		storedSalamoize++
      	}
      }
      if(val.radius<10) {
      	val.radius=0;
      }
     // console.log(distanceBetween2(enemy,val))
       if(distanceBetween2(enemy,val)<enemy.radius) {
        alert('colpito')
      }
       if(distanceBetween2(enemy,val)<enemy.radius+5) {
        if(enemy.x > val.x) {
          enemy.x = enemy.x+val.radius;
        }
        if(enemy.y > val.y) {
          enemy.y = enemy.y+val.radius;
        }
        if(enemy.x < val.x) {
          enemy.x = enemy.x-val.radius;
        }
        if(enemy.y < val.y) {
          enemy.y = enemy.y-val.radius;
        }
      }


	});
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

