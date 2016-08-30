
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
     rightInterval = setInterval(function(){ enemy.direction = enemy.direction+1 }, 10);
  });
  $('body').on('touchend', '.right', function(event) {
     clearInterval(rightInterval)
  });
  var leftInterval;
  $('body').on('touchstart', '.left', function(event) {
     leftInterval = setInterval(function(){ enemy.direction = enemy.direction-1 }, 10);
  });
  $('body').on('touchend', '.left', function(event) {
     clearInterval(leftInterval)
  });

	drawAll();
});
var placeEnemy = function() {
      if (enemyReady) {
    //enemy.y--;

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
var drawAll= function() {
//  console.log(enemy.direction)
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var ancora = true;
  enemy.y = enemy.y+1
  if(enemy.moving) {
        enemy.x = enemy.x+(Math.sin(degreesToRadians(enemy.direction)))*3
        enemy.y = enemy.y-(Math.cos(degreesToRadians(enemy.direction)))*3
    // console.log(enemy.direction)
            // drawCirlce(enemy.x+(Math.cos(enemy.direction)*20),(enemy.y-30)+(Math.sin(enemy.direction)*20),10)
            //             drawCirlce(enemy.x,(enemy.y-30),10)

        // var x1 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][0]][0];
        // var y1 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][0]][1];
        // var x2 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][1]][0];
        // var y2 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][1]][1];
        // var m = (y1-y2)/(x1-x2);
        // var n = (-x1*m)+y1;
        // var h = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][0];
        // var k = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][1];
        // var ar = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][0] - mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][1]][0]
        // var ba = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][1] - mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][1]][1]
        // var r = Math.sqrt( ar*ar + ba*ba );
        // var intersections = findCircleLineIntersections(r, h, k, m, n);
        // console.log(intersections)

  }
  //drawCirlce(10,10,10)
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
function degreesToRadians (degrees) {
   return degrees * (Math.PI/180);
}
function findCircleLineIntersections(r, h, k, m, b) {
  var A,B,C;
    A = 1 + m * m;
    B = -2 * h + 2 * m * b - 2 * k * m;
    C = h * h + b * b + k * k - 2 * k * b - r * r;
    delta = B * B - 4 * A * C;
    if (delta < 0) {
        console.log("No points of intersections");
        return false;
    }
    if (delta >= 0) {
        x1 = (-B + Math.sqrt(delta)) / (2 * A);
        x2 = (-B - Math.sqrt(delta)) / (2 * A);
        y1 = m * x1 + b;
        y2 = m * x2 + b;
        return [[x1,y1],[x2,y2]];
    }
}

