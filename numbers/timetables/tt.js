
$( document ).ready(function() {
    $( "body" ).on( 'click', 'img', function(e) {
    	var cneee = $(this);
    	var cane = $(this).position().top;
    	var iffo = false;
    	if($(this).closest('.container').hasClass('selected')==false) iffo=true;
    	if (iffo==true) $(this).attr('pos',parseInt(cane));
    	$( "body" ).toggleClass('selection');
    	$(this).closest('.container').toggleClass('selected');
    	if (iffo==false)
    	window.scrollTo(0,$(this).attr('pos'))
    });
    $( "body" ).on( 'click', '#loop', function(e) {
    	start();
    	loop=true;
    });
    $( "body" ).on( 'click', '#fast', function(e) {
    	fast=fast*10;
    });
    $( "body" ).on( 'click', '#slow', function(e) {
    	fast= fast/10;

    });
        $( "body" ).on( 'click', '#start', function(e) {
    	start();
    	loop=false;
    });
    $('#canvasContainer').append(canvas);


});
var deep;
var curdeep = 1;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 1000;
var canvasHeight = 1000;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var elements;
var curCounter;
var punti;
var mainCirc;
var operation;
var myinterval;
var loop=false;
var fast = 1;
var newjuos = [];



var start = function () {
	clearInterval(myinterval);
	operation = $('#operation').val();
	elements = [];
	curCounter = $('#operator').val()-1;
	punti = $('#nrpunti').val();
	var startingdim = canvasHeight;
	mainCirc = {'radius': (canvasHeight/2)-10, 'pos':{x:canvasWidth/2,y:canvasHeight/2}};
	drawcircle(mainCirc);
	addPoints(mainCirc,punti);
	$('#canvasContainer').show( );
    $('.debug2').show();

    	$('.debug').append("<div class=''>"+(operation == "add" ? 'Addizione -' : operation == "pow" ? 'Potenze -' : 'Moltiplicazione -')+" Cerchio di "+punti+" punti<div>");
	step()
	newjuos = [];

};
var step =  function() {
	drawcircle(mainCirc);
	curCounter++;
	$('.debug2').html('Making of :'+curCounter)
	var  juo = 1;
	myinterval =  setInterval(function(){
		if(operation=='add') {
			drawLine(elements[juo],elements[((juo + curCounter))%punti]);
			juo++;
		}
		else if(operation=='pow') {
			if(Math.pow(juo, curCounter)=='Infinity') {
				$('.debug').append('numeri troppo grandi');
    			$('.debug2').hide();
    			clearInterval(myinterval);}
			else {

				var sallame = juo;
				for (var culo = 0; culo < curCounter; culo++) {
					console.log(sallame);
					sallame = sallame * sallame;
				};
				if((Math.pow(juo, curCounter))%punti!=0) console.log('cane');
				//console.log(juo+' alla '+curCounter+' = '+ sallame+', mod('+punti+') = '+(Math.pow(juo, curCounter))%punti+', '+(Math.pow(juo, curCounter))/punti)
				drawLine(elements[juo],elements[(sallame)%punti]);
			}
			juo++;
		}
		else if (operation=='molt') {
			drawLine(elements[juo],elements[parseInt(juo * curCounter)%punti]);
			juo++;
		}
		else if (operation=='smolt') {
			//console.log(juo+' * '+curCounter+' = '+ (juo * curCounter)+', mod('+punti+') = '+(juo * curCounter)%punti);
			for (var l = newjuos.length - 1; l >= 0; l--) {
				if(newjuos.length!=0)
				if(newjuos[l].a==juo && newjuos[l].b==parseInt(juo * curCounter)%punti) {
					$('.debug').append("<div class='container'><div>"+(curCounter)+", "+newjuos.length+" </div><div><img name='testXXX.jpg' src='"+canvas.toDataURL("image/png")+"' alt='cane'/></div></div>");
					clearInterval(myinterval);
					newjuos = [];
					if(loop)
					return step();
					else {
						$('#canvasContainer').hide( );
		    			$('.debug2').hide();
		    			return;
		    		}
				}
			};
			newjuos.push({a:juo,b:parseInt(juo * curCounter)%punti})
			drawLine(elements[juo],elements[parseInt(juo * curCounter)%punti]);
			juo=(juo * curCounter)%punti;
		}

		if(juo>=elements.length && operation!='smolt') {
			clearInterval(myinterval);
			$('.debug').append("<div class='container'><div>"+(curCounter)+"</div><div><img name='testXXX.jpg' src='"+canvas.toDataURL("image/png")+"' alt='cane'/></div></div>");
			if(curCounter<punti || operation=='pow') {
				if(loop) step(); else {
				$('#canvasContainer').hide( );
    			$('.debug2').hide();
    			return;
				}
			}
			else {
				$('#canvasContainer').hide( );
    			$('.debug2').hide();
				return;
			}
		}
	 },fast);
}


var drawcircle = function (circle) {
	  //cirlce
	  ctx.beginPath();
	  ctx.globalAlpha   = 1;
      ctx.arc(circle.pos.x, circle.pos.y, circle.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'white';
      ctx.stroke();
      ctx.closePath()
};
var addPoints = function (circle,points) {
	  var gradi = 360/points;
      //ctx.beginPath();
      for (var i = 0; i < points; i++) {
      	  var posx = circle.pos.x+(cosDegrees(gradi*i))*circle.radius;
      	  var posy = circle.pos.y+(sinDegrees(gradi*i))*circle.radius
	      // ctx.arc(posx, posy, 10, 0, 2 * Math.PI, false);
	      // ctx.closePath();
	      elements.push({pos:{x:posx,y:posy}})
      };
      // ctx.fillStyle = 'red';
      // ctx.fill();

};
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function drawLine(uno,due) {
	if(punti>=2000)
	ctx.globalAlpha   = 0.1;

	ctx.strokeStyle = 'blue';
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.moveTo(uno.pos.x,uno.pos.y);
	ctx.lineTo(due.pos.x,due.pos.y);
	ctx.stroke();
	ctx.closePath();
}
function sinDegrees(angle) {return Math.sin(angle/180*Math.PI);};
function cosDegrees(angle) {return Math.cos(angle/180*Math.PI);};

