
var ctx;
var canvasWidth ;
var canvasHeight;
var shapes = [];
var obstacles = [];
var enemyVel = 1;
var enemy = {};
var initialSalamoize = 10;
var storedSalamoize = 100
var loadInterval;
var reloadGame = false;
var salamoize = initialSalamoize;
var enemyReady = false;
var holeReady = false;
var wrenchReady = false;
var enemyImage;
var holeImage;
var vel =23;
    var keysDown = {};
var isMobile = detectmob();
$( document ).ready(function() {

  addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
  }, false);
  addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
  }, false);
  enemyImage = new Image();
  enemyImage.onload = function () {
    enemyReady = true;
  };
  enemyImage.src = "./car.png";

  wrenchImage = new Image();
  wrenchImage.onload = function () {
    wrenchReady = true;
  };
  wrenchImage.src = "./wrench.png";

  holeImage = new Image();
  holeImage.onload = function () {
    holeReady = true;
  };
  holeImage.src = "./hole.png";
  canvas = document.createElement("canvas");

  ctx = canvas.getContext("2d");
  if(isMobile) {
    canvasWidth = $(window).width();
    canvasHeight = $(window).height();
  } else {
    canvasWidth = $(window).width();;
    canvasHeight = $(window).height();
  }
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  var lines = (canvasHeight)/5;
  $('body').append(canvas);
  $('body').append("<div class='popup'></div>");
  $('.popup').append("<div class='content'></div>");
    alert('<div class="start">START</div>')
  readAjax();
	$('body').on('touchstart', '.go', function(event) {
      event.preventDefault()
      enemy.moving = true;
      $(this).css({
        'background-position': '50% 25px'
      });
	});
	$('body').on('touchend', '.go', function(event) {
		 enemy.moving = false;
     $(this).css({
        'background-position': '50% 5px'
      });
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
  $('body').on('click touchstart', '.content', function(event) {
     $('.popup').fadeOut('200');
        obstacles = [];
        pedonali = [];
        shapes = [];
        bonus = [];

        for (var i = 0; i < canvasHeight; i=i+lines) {
          shapes.push({x:(canvasWidth/2)-4,y:i})
        };

        enemy.radius = 70;
        enemy.x= canvasWidth/2
        enemy.y= canvasHeight*3/4;
        enemy.direction = 0;
       counter = 0;
       modifier = 1;
       metri = 1;
       hits = 0;
       enemyImage.src = "./car.png";
        $('.vol').css({
              '-moz-transform':'rotate('+enemy.direction+'deg)',
              '-webkit-transform':'rotate('+enemy.direction+'deg)'
            });
      addControls();
       drawAll();
  });
  var startEventVolante;
  $('body').on('touchstart', '.volante', function(event) {
      startEventVolante = {x:event.originalEvent.touches[0].pageX,y:event.originalEvent.touches[0].pageY}
  });
  // $('body').on('touchend', '.volante, canvas', function(event) {
  //     startEventVolante = {x:0,y:0}
  // });
  $('body').on('touchmove', '.volante', function(event) {
      if(Math.abs(event.originalEvent.touches[0].pageX-startEventVolante.x)<90) {

        if(hits==2)
        enemy.direction = (event.originalEvent.touches[0].pageX-startEventVolante.x)/3
        else if(hits==1)
        enemy.direction = (event.originalEvent.touches[0].pageX-startEventVolante.x)/2
        else  enemy.direction = event.originalEvent.touches[0].pageX-startEventVolante.x
        $('.vol').css({
          '-moz-transform':'rotate('+enemy.direction+'deg)',
          '-webkit-transform':'rotate('+enemy.direction+'deg)'
        });
      }
  });
});

var addControls = function() {

  if($('.metri').length==0) {

  $('body').append("<div class='go'></div>");
  $('body').append("<div class='metri'></div>");

  if(isMobile) {
    $('body').append("<div class='volante'><div class='vol'></div></div>");
  }
  else {
    $('body').append("<div class='left'></div>");
    $('body').append("<div class='right'></div>");
  }
}
}

var placeEnemy = function() {
      if (enemyReady) {
      ctx.save();
      ctx.translate( enemy.x, enemy.y );
      ctx.rotate( degreesToRadians(enemy.direction) );
      ctx.translate( -enemy.x, -enemy.y );
      ctx.drawImage(enemyImage, enemy.x-enemy.radius/2, enemy.y-enemy.radius/2, enemy.radius, enemy.radius);
      ctx.restore();
  }
}
var drawCirlce= function(centerX,centerY,radius) {
      ctx.beginPath();
      ctx.fillcolor = 'red';
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.fillcolor = 'gray';
}
var drawRect= function(x,y,dim1,dim2) {
      ctx.fillRect(x,y,dim1,dim2);
}
var counter = 0;
var modifier = 1;
var metri = 1;
var pedonali = [];
var bonus = [];
var hits = 0;
var fatto = true;
var fatto2 = true;
var drawAll= function() {
  counter++;
  $('.metri').html(parseInt(metri)+'<div> mt</div>')
  if(metri%10==0) modifier++;
  if(parseInt(metri)%30==0) {
    if(fatto) {
    obstacles.push({x:getRandomInt(20,canvasWidth-20),y:0})
    fatto = false;
    }
  } else fatto = true;
  if(parseInt(metri)%250==0) {
    pedonali.push({x:50,y:-100})
  }
  if(parseInt(metri)%350==0) {
    if(fatto2) {
    bonus.push({x:getRandomInt(20,canvasWidth-20),y:0})
    fatto2 = false;
    }
  } else fatto2 = true;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(0,0,15,canvasHeight)
  drawRect(canvasWidth-15,0,15,canvasHeight)
	var ancora = true;
  enemy.y = enemy.y+modifier
  metri=metri+1*modifier/10
  if(enemy.moving) {
      var modifier2;
      if(hits==0) modifier2 = 1.5
      if(hits==1) modifier2 = 1.3
      if(hits==2) modifier2 = 1.1
      enemy.x = enemy.x+((Math.sin(degreesToRadians(enemy.direction))))*modifier*modifier2
      enemy.y = enemy.y-((Math.cos(degreesToRadians(enemy.direction))))*modifier*modifier2
  } else {
    var modifier2;
    if(hits==0) modifier2 = 0.9
    if(hits==1) modifier2 = 0.8
    if(hits==2) modifier2 = 0.7
    enemy.x = enemy.x+((Math.sin(degreesToRadians(enemy.direction))))*modifier*modifier2
    enemy.y = enemy.y-((Math.cos(degreesToRadians(enemy.direction))))*modifier*modifier2
  }
  $.each(shapes, function(index, val) {
      drawRect(val.x,val.y,8,50)
      if(val.y+50>canvasHeight) {
        val.y=-50;
      } else
      val.y=val.y+modifier;
  });
  $.each(pedonali, function(index, val) {
      for (var i = canvasWidth; i >= -100; i=i-20) {
            drawRect(val.x+i,val.y,10,50)
            // if(i==canvasWidth)
            // drawCirlce(val.x,val.y+25,20)
      };
      val.y=val.y+modifier;
  });
  $.each(bonus, function(index, val) {
      ctx.drawImage(wrenchImage, val.x-15, val.y-15, 50, 50);
      val.y=val.y+modifier;
      if(distanceBetween2(enemy,val)<20) {
          val.x = -100;
          hits = 0;
          enemyImage.src = "./car.png";
      }
  });
  $.each(obstacles, function(index, val) {
      ctx.drawImage(holeImage, val.x-15, val.y-15, 30, 30);
      val.y=val.y+modifier;
      if(distanceBetween2(enemy,val)<20) {
        val.x = -100;
        hits++;
        if(hits==3) {
        ancora=false;
        alert('<div class="start">'+parseInt(metri)+' meters</div>')
        } else if(hits==2) {
          enemyImage.src = "./car3.png";
        } else if(hits==1) {
          enemyImage.src = "./car2.png";
        }

      }
  });

  placeEnemy();
  if(enemy.x<0 || enemy.x>canvasWidth || enemy.y<0 || enemy.y>canvasHeight) {
      ancora = false;
       alert('<div class="start">'+parseInt(metri)+' meters</div>')
        //window.location.reload();
  }
  if(ancora) {
    setTimeout(function(){ drawAll() }, vel);
  } else {
  }
  if(!isMobile) {
  if (37 in keysDown) { // left
    if(hits==2)
    enemy.direction = enemy.direction-1
    else if(hits==1)
    enemy.direction = enemy.direction-3
    else  enemy.direction = enemy.direction-5
  }
  if (39 in keysDown) { //  right
    if(hits==2)
    enemy.direction = enemy.direction+1
    else if(hits==1)
    enemy.direction = enemy.direction+3
    else  enemy.direction = enemy.direction+5
  }
  if (38 in keysDown) { //  up
      enemy.moving=true
           $('.go').css({
        'background-position': '50% 25px'
      });
  } else {
    enemy.moving=false
         $('.go').css({
        'background-position': '50% 5px'
      });
  }
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
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
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
function alert(content) {
  $('.content').html(content);
  $('.popup').fadeIn(200);
}
function readAjax() {
  $('#start').hide();
  $('.popup').append('<div class="contentloader"><div class="loader"></div></div>');
  $.ajax({
      url : "./read.php",
      type: "POST",
      success: function(data, textStatus, jqXHR)
      {
          $('.popup .contentloader').html(data).removeClass('green').removeClass('red').show();
          $('#start').show().addClass('animated bounceIn');
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
     }
  });
}
function writeAjax(formData) {
$.ajax({
    url : "./write.php",
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        readAjax();
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
    }
});
}
