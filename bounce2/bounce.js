
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
var vel =23;
$( document ).ready(function() {
  enemyImage = new Image();
  enemyImage.onload = function () {
    enemyReady = true;
  };
  enemyImage.src = "./car.png";
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvasWidth = $(window).width();
  canvasHeight = $(window).height();
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
 // shapes = [{x:canvasWidth/2,y:0},{x:canvasWidth/2,y:100},{x:canvasWidth/2,y:200},{x:canvasWidth/2,y:300},{x:canvasWidth/2,y:400},{x:canvasWidth/2,y:500}];
  var lines = canvasHeight/50;

  for (var i = lines; i >= 0; i--) {
    console.log(lines)
    shapes.push({x:canvasWidth/2,y:i*10*lines})
  };

  enemy.radius = 40;
  enemy.x= canvasWidth/2
  enemy.y= canvasHeight*3/4;
  enemy.direction = 0;
    $('body').append(canvas);
    $('body').append("<div class='go'></div>");
    $('body').append("<div class='left'></div>");
    $('body').append("<div class='right'></div>");
	$('body').on('click', 'canvas', function(event) {

	});
	$('body').on('touchstart', '.go', function(event) {
      enemy.moving = true;
	});
	$('body').on('touchend', '.go', function(event) {
		 enemy.moving = false;
	});
  var rightInterval;
  $('body').on('touchstart', '.right', function(event) {
     rightInterval = setInterval(function(){ enemy.direction = enemy.direction+2 }, 10);
  });
  $('body').on('touchend', '.right', function(event) {
     clearInterval(rightInterval)
  });
  var leftInterval;
  $('body').on('touchstart', '.left', function(event) {
     leftInterval = setInterval(function(){ enemy.direction = enemy.direction-2 }, 10);
  });
  $('body').on('touchend', '.left', function(event) {
     clearInterval(leftInterval)
  });

	drawAll();
});
var placeEnemy = function() {
      if (enemyReady) {
    ctx.save();
    ctx.translate( enemy.x, enemy.y );
    ctx.rotate( degreesToRadians(enemy.direction) );
    ctx.translate( -enemy.x, -enemy.y );
    ctx.drawImage(enemyImage, enemy.x-enemy.radius/2, enemy.y-enemy.radius/2, enemy.radius, enemy.radius+25);
    ctx.restore();

  }
}
var drawCirlce= function(centerX,centerY,radius) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();
}
var drawRect= function(x,y,dim1,dim2) {
      ctx.fillRect(x,y,dim1,dim2);
}
var counter = 0;
var modifier = 1;
var drawAll= function() {
  counter++;
  if(counter%100==0) modifier++;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var ancora = true;
  enemy.y = enemy.y+modifier
  if(enemy.moving) {
      enemy.x = enemy.x+(Math.sin(degreesToRadians(enemy.direction)))*10
      enemy.y = enemy.y-(Math.cos(degreesToRadians(enemy.direction)))*10
  }
  $.each(shapes, function(index, val) {
      drawRect(val.x,val.y,10,50)
      if(val.y>canvasHeight) {
        val.y=-100;
      } else
      val.y=val.y+modifier;

  });

  placeEnemy();
  if(enemy.x<0 || enemy.x>canvasWidth || enemy.y<0 || enemy.y>canvasHeight) {
      ancora = false;
      if (confirm('hai perso')) {
        window.location.reload();
      }
  }
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
function distanceBetween2(f,s) {
  var x1 = f.x;
  var y1 = f.y;
  var x2 =  s.x;
  var y2 =  s.y;
  return  Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
function degreesToRadians (degrees) {
   return degrees * (Math.PI/180);
}

