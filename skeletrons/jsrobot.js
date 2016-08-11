$( document ).ready(function() {
  	changeGridDim();

});
$(window).on("orientationchange",function(){
  		changeGridDim();
});
function changeGridDim() {
	if ($(window).width() > $(window).height()) {
		$('body').addClass('landscape');
		$('body').removeClass('portrait');

	}
	else {
		$('body').removeClass('landscape');
		$('body').addClass('portrait');
	}
}
$(function() {
var sortedChart = [];

	var changeviewporttimer;
	checkorientaitonchange();
	var rowTiles;
	var clickType;
	if(detectmob()) {
		rowTiles = 10;
		$('body').addClass('mobile');
		clickType = 'touchstart';
	}  else {
		$('body').addClass('desktop');
		clickType = 'click';
		rowTiles = 20;
	}
	var pixelDimension = 100/rowTiles+'%';
	var grid;
	var timer;
	var startx = 0;
	var starty = Math.floor(rowTiles/2);
	var endx = rowTiles-1;
	var endy = Math.floor(rowTiles/2);
	var level = 1;
	var points = 0;
	var lifebonus = 0;
	var loopCeck = ['nothing','none','none','none','none'];
	var timealmostdone;
	var almostdone;
	var startingclickcounter = 9;
	var clickcounter = startingclickcounter;
	var invulnerable = false;
	var invulnerableNr = 0;
	var evilclickable = false;
	var evilclickableNr = 0;
	var turnLeft = false;
	var turnLeftNr = 0;
	var fuckSkullsNr = 0;
	var skullstofree = false;
	var skullstofreeNr = 0;
	var teleport = false;
	var teleportNr = 0;
	var savedTurn;
	var lastmove = false;
	var pauselegend = false;
	var animations = true;
	$('#clickleftcounter').html(clickcounter+1);
	$('.power').addClass('disabled');
	function invertDirection() {
		if (turnLeft) {
			turnLeft = false;
			//$('.dinrobot').removeClass('spinrev')
		}
		else  {
			turnLeft = true;
		 	//$('.dinrobot').addClass('spinrev')
		 };
	}
	var robot = {
	    position : null,
	    position2: null,
	    position3: null,
	    position4:  null,
	    direction : "right",
	    stall       :  0
	};
	function checkorientaitonchange(){
		changeviewporttimer = setInterval(function() {
			changeGridDim();
		}, 3000);
	}
	function startWalking() {
		timer  = setInterval(function() {
			if(robot.stall == 1) {$('.dinrobot').attr('id',''+getNewDirection('left',robot.direction)+'');}
			if(robot.stall%5 == 0) {
				robot.direction = robot.direction+' ';
				robot.stall = 1;
			}
			moveRobot();
		}, 200);
	}
	var basestructure = "<div class='pixel'></div>";
	var structure = "";
	for(var ki=0;ki<rowTiles;ki++) {
		for(var k=0;k<rowTiles;k++) {
			structure = structure + basestructure;
		}
	}
	$('#grid').append(structure);
	populateGrid();
	createRobot();
	$("#animations").on( "click", function() {
		if(animations) {
			$(this).html('enable animations');
			animations = false;
		}
		else {
			$(this).html('disable animations');
			animations = true;
		}
	});


	$( "#start" ).click(function() {
		$('body').removeClass('infodisplayed');
		changeGridDim();
		$('body').addClass('gaming');
		$('#levelcounter').html(''+(level)+'');
		startWalking();
		$('#clickleftcounter').html(clickcounter+1);
	});
	$( ".info" ).on( "click", function() {
		if($('.gaming').length>0) {
			if(teleport) {}
			else if(pauselegend) {startWalking(); pauselegend = false;}
			else {clearInterval(timer); pauselegend = true;}
		}
		var calulatedH;
		calulatedH = $(window).height()-16;
		$('#infocontent').css({
			height: calulatedH
		});
		$('body').toggleClass('infodisplayed');
		$('body').removeClass('chartdisplayed');
	});
	$( ".chart" ).on( "click", function() {
			if(animations) $(this).addClass('magictimeslow magic');
			else $('body').removeClass(' chartdisplayed');
	});
    $('.showchart').on('click', function(event) {

    		$('body').addClass('chartdisplayed');
    		$( ".chart" ).removeClass('magictimeslow magic')
    		readJson();
    		var calulatedH = ($(window).height()-($(window).height()/100*25))-30;
			$('#chartview').css({
				height: calulatedH
			});
    });
    $(".powerupsinfo").on("click", function () {
		$('body').removeClass('infodisplayed');
		if($('.gaming').length>0) {
			if(teleport) {}
			else if(pauselegend) {startWalking(); pauselegend = false;}
			else {clearInterval(timer); pauselegend = true;}
		}
		$('body').removeClass('chartdisplayed');
        });
	$("#updateJson").on("click", function () {
		setTimeout(function() {
			$('body').css({
               	height: 'inherit'
			});
         }, 500);
		readJson();
		lifebonus = -1;
		$('body').removeClass('editchart');
		$('body').addClass('gameover');
		$('body').removeClass('infodisplayed');
		var playername = $('#namePlayer').val();
		if(playername=='') playername = "anonymous";
		sortedChart[sortedChart.length-1] = {"name": playername,"score": points};
		$.ajax({
            type: "POST",
            datatype: "json",
            url: 'post.php',
            data: { 'puzzle': {"chart":sortedChart} },
            success: function () {
            	setTimeout(function() {
               	readJson();
               }, 1000);
             }
        });
        setTimeout(function() {
            checkorientaitonchange();
        }, 1000);
	});
	$( "#bonuslife" ).on( "click", function() {
			grid[gridPos(robot.position)[0]][gridPos(robot.position)[1]] = 'free';
			loopCeck = ['nothing','none','none','none','none'];
			$('#bonusleftcounter').html(lifebonus);
			clearInterval(almostdone);
			clearInterval(timealmostdone);
			$('.clickcounter').hide();
			$('.clickcounter').removeClass('alert');
			$('#grid').removeClass('stall')
			$('body').removeClass('infodisplayed');
			changeGridDim();
			if(clickcounter<=10) clickcounter=10;
			$('#clickleftcounter').html(clickcounter+1);
			$('body').addClass('gaming');
			$('body').removeClass('gameover');
			turnLeft = false;
			//$('.dinrobot').removeClass('spinrev');
				robot = {
				    position : null,
				    direction : "right",
				    stall       :  0
					};
				grid[0][5] = 'free';
				grid[1][5] = 'free';
				grid[0][9] = 'free';
				grid[0][4] = 'wall';
				grid[0][6] = 'wall';
				grid[1][4] = 'wall';
				grid[1][6] = 'wall';
				grid[2][4] = 'wall';
				grid[2][6] = 'wall';
				grid[2][5] = 'wall';
				addBonus(true);
			$('.dinrobot').remove();
			createRobot();
			startWalking();
	});

	$( "#reload" ).on( "click", function() {
			$('body').removeClass('finish');
			if(lastmove) lastmove = false;
			if(lifebonus >= 0 && sortedChart[sortedChart.length-1].score < points) {
					ceckchart();
					$('.loosecontrols').removeClass('hasbonus');
			}
			else {
				points = 0;
				updatePoints();
				loopCeck = ['nothing','none','none','none','none'];
				clearInterval(almostdone);
				clearInterval(timealmostdone);
				$('.clickcounter').hide();
				$('.clickcounter').removeClass('alert');
				$('#grid').removeClass('stall')
				$('body').removeClass('infodisplayed');
				$('#levelcounter').html('1');
				changeGridDim();
				$('body').addClass('gaming');
				$('body').removeClass('gameover');
				clickcounter = startingclickcounter;
				$('#clickleftcounter').html(clickcounter+1);
				level = 1;
				$('#power1 span').html('');
				$('#power1').addClass('disabled');
				invulnerable = false;
				invulnerableNr = 0;

				$('#power4 span').html('');
				$('#power4').addClass('disabled');
				evilclickable = false;
				evilclickableNr = 0;
				lifebonus = 0;
				$('#bonusleftcounter').html(lifebonus);
				turnLeft = false;
				//$('.dinrobot').removeClass('spinrev');
				turnLeftNr = 0;
				$('#power5 span').html('');
				$('#power5').addClass('disabled');
				fuckSkullsNr = 0;
				$('#power2 span').html('');
				$('#power2').addClass('disabled');
				skullstofreeNr = 0;
				$('#power6 span').html('');
				$('#power6').addClass('disabled');
				teleportNr = 0;
				$('#power3 span').html('');
				$('#power3').addClass('disabled');
				robot = {
				    position : null,
				    direction : "right",
				    stall       :  0
					};
				populateGrid();
				$('.dinrobot').remove();
				createRobot();
				startWalking();
			}
	});
	$( "#winning" ).on( "click", function() {

			turnLeft = false;
			//$('.dinrobot').removeClass('spinrev');
			loopCeck = ['nothing','none','none','none','none'];
			$('#levelcounter').html(''+(level+1)+'');
			changeGridDim();
			$('body').addClass('gaming');
			$('body').removeClass('win');
			$('#grid').removeClass('stall');
			$('.clickcounter').removeClass('alert');
			$('.clickcounter').hide();
			if(level>=15) clickcounter = 2+clickcounter;
			else if(level>=8) clickcounter = 3+clickcounter;
			else clickcounter = 5+clickcounter;
			if(clickcounter>=50) {
				clickcounter = 30;
				lifebonus++;
				notificate('+1 life')
			}
			$('#clickleftcounter').html(clickcounter+1);
			if((level)%5==0 && level>=2) {
				lifebonus++;
				setTimeout(function() {
					$('.clickcounter').html('+1 life ')
					$('.clickcounter').show();
				}, 500);
				setTimeout(function() {
					$('.clickcounter').fadeOut();
					$('.clickcounter').html('')
				}, 2000);

			}
			$('#bonusleftcounter').html(lifebonus);
			level++;
			//power 1
			if((level-1)%6==0  && level>=8) {
				 invulnerableNr++;
			}
			if(invulnerableNr>=1) $('#power1').removeClass('disabled');
			if(invulnerableNr!=0) $('#power1 span').html(invulnerableNr);
			//power 5
			if((level-1)%5==0) {
				turnLeftNr++;
			}
			if(turnLeftNr>=1) $('#power5').removeClass('disabled');
			if(turnLeftNr!=0) $('#power5 span').html(turnLeftNr);
			// power 2
			if((level-1)%6==0 && level>7) {
				fuckSkullsNr++;
			}
			if(fuckSkullsNr>=1) $('#power2').removeClass('disabled');
			if(fuckSkullsNr!=0) $('#power2 span').html(fuckSkullsNr);
			// power 6
			if((level-1)%7==0 && level>=10) {
				skullstofreeNr++;
			}
			if(skullstofreeNr>=1) $('#power6').removeClass('disabled');
			if(skullstofreeNr!=0) $('#power6 span').html(skullstofreeNr);
			//power 4
			if((level-1)%9==0) {
				 evilclickableNr++;
			}
			if(evilclickableNr>=1) $('#power4').removeClass('disabled');
			if(evilclickableNr!=0) $('#power4 span').html(evilclickableNr);
			//power 3
			if((level-1)%5==0 && level>=10) {
				 teleportNr++;
			}
			if(teleportNr>=1) $('#power3').removeClass('disabled');
			if(teleportNr!=0) $('#power3 span').html(teleportNr);
			robot = {
			    position : null,
			    direction : "right",
			    stall       :  0
				};
			populateGrid();
			$('.dinrobot').remove();
			createRobot();
			startWalking();
	});
	$( ".pixel" ).on( clickType, function() {
		var position = $(this).prevAll('div').length;
		var positions = gridPos(position);
		if(teleport) {
			var teleportposition = $(this).prevAll('div').length;
			var teleportpositions = gridPos(teleportposition);
			if(grid[teleportpositions[0]][teleportpositions[1]] == 'free') {
				grid[teleportpositions[0]][teleportpositions[1]] = 'robot';
				grid[gridPos(robot.position)[0]][gridPos(robot.position)[1]] = 'free';
				robot.position = teleportposition;
				robot.direction = 'up';
				drawRobot();
				$('#power3').addClass('disabled');
				setTimeout(function() {
				startWalking();
				if(invulnerableNr>=1) $('#power1').removeClass('disabled');
				if(invulnerableNr!=0) $('#power1 span').html(invulnerableNr);
				if(skullstofreeNr>=1) $('#power6').removeClass('disabled');
				if(skullstofreeNr!=0) $('#power6 span').html(skullstofreeNr);
				if(evilclickableNr>=1) $('#power4').removeClass('disabled');
				if(evilclickableNr!=0) $('#power4 span').html(evilclickableNr);
				if(teleportNr!=0) $('#power3').removeClass('disabled');
			}, 2000);

				teleport = false;
			}
			else {
				notificate('..no');
			}
		}
		else {
			if((clickcounter>=1 && (!evilclickable || !invulnerable)) || (evilclickable && ((grid[positions[0]][positions[1]] == 'free' || grid[positions[0]][positions[1]] == 'wall')))) {
				if(grid[positions[0]][positions[1]] == 'free') {
					if(grid[positions[0]][positions[1]] != 'robot') $('#clickleftcounter').html(clickcounter);
						var bufcount = clickcounter
						setTimeout(function() {
						 	notificateClick(bufcount);
						}, 300);
				}
			}
			else if(clickcounter==0 && grid[positions[0]][positions[1]] == 'free') {
				$('#grid').addClass('stall');
				var donecounter = 10;
				$('#clickleftcounter').html(clickcounter);
				$('.clickcounter').addClass('alert');
				$('.clickcounter').show();
				$('.clickcounter').html(donecounter);
				timealmostdone = setInterval(function() {
					donecounter--;
					$('.clickcounter').show();
					$('.clickcounter').html(donecounter);
					$('.clickcounter').fadeOut();
				}, 1000);
				 almostdone =  setInterval(function() {
					$('.clickcounter').hide();
					$('body').removeClass('gaming');
					$('body').addClass('gameover');
					if(lifebonus>0)  {
						lifebonus--;
						$('.loosecontrols').addClass('hasbonus');
						$('#bonuslife span').html(lifebonus+1);
					} else {
						$('.loosecontrols').removeClass('hasbonus');
						ceckchart();
					}
					$('#power1 span').html('');
					$('#power1').addClass('disabled');
					invulnerableNr = 0;
					invulnerable = false;
					$('#power4 span').html('');
					$('#power4').addClass('disabled');
					evilclickableNr = 0;
					evilclickable = false;
					clearInterval(timer);
					clearInterval(timealmostdone);
					clearInterval(almostdone);
					$('.clickcounter').removeClass('alert');
				}, 10000);
			}
			if((grid[positions[0]][positions[1]] == 'free')) {
				clickcounter--;
			}

			if(grid[positions[0]][positions[1]] == 'wall') {
				if(animations) jumpOut(position);
				grid[positions[0]][positions[1]] = 'free';
				points--;
				updatePoints();
				drawGridLight(position,positions[0],positions[1]);
			}
			else if(grid[positions[0]][positions[1]] == 'free'){
				//jumpIn(position);
				grid[positions[0]][positions[1]] = 'wall';
				points++;
				updatePoints();
				//setTimeout(function() {
			 	drawGridLight(position,positions[0],positions[1]);
				//}, 300);

			}
			else if(grid[positions[0]][positions[1]] == 'evil'){
				grid[positions[0]][positions[1]] = 'free';
				drawGridLight(position,positions[0],positions[1]);
				if(animations) BombOut(position,'evil');
			}
			else if(grid[positions[0]][positions[1]] == 'hardwall'){
				grid[positions[0]][positions[1]] = 'free';
				drawGridLight(position,positions[0],positions[1]);
				BombOut(position,'hardwall');
			}
			else if(grid[positions[0]][positions[1]] == 'bonus'){
				grid[positions[0]][positions[1]] = 'free';
				if(animations) vanishOut(position);
				notificate('score -50');
				points = points -50;
				updatePoints();

				drawGridLight(position,positions[0],positions[1]);
			}
			else if(grid[positions[0]][positions[1]] == 'robot'){
				notificate('..no')
				points--;
				updatePoints();
			}
		}
	});
	function jumpOut(element) {
		var rndmclass =  Math.floor(Math.random()*100+1);
		$('#grid').append('<div class="mask '+rndmclass+'"></div>');
		var todoply = $('.pixel').eq(element);
		$('.'+rndmclass+'').css({
			width: todoply.width(),
			height: todoply.height(),
			position: 'absolute',
			top: todoply.position().top,
			left: todoply.position().left
		});
		$('.'+rndmclass+'').addClass('magictime magic');
		setTimeout(function() {
				$('.'+rndmclass+'').remove();
			}, 1000);
	}
	function vanishOut(element) {
		var rndmclass =  Math.floor(Math.random()*100+1);
		$('#grid').append('<div class="mask bonus '+rndmclass+'"></div>');
		var todoply = $('.pixel').eq(element);
		$('.'+rndmclass+'').css({
			width: todoply.width(),
			height: todoply.height(),
			position: 'absolute',
			top: todoply.position().top,
			left: todoply.position().left
		});
		$('.'+rndmclass+'').addClass('magictime vanishOut');
		setTimeout(function() {
				$('.'+rndmclass+'').remove();
			}, 1000);
	}
	function BombOut(element, type) {
		var rndmclass =  Math.floor(Math.random()*100+1);
		$('#grid').append('<div class="mask '+type+' '+rndmclass+'"></div>');
		var todoply = $('.pixel').eq(element);
		$('.'+rndmclass+'').css({
			width: todoply.width(),
			height: todoply.height(),
			position: 'absolute',
			top: todoply.position().top,
			left: todoply.position().left
		});
		$('.'+rndmclass+'').addClass('magictime bombRightOut');
		setTimeout(function() {
				$('.'+rndmclass+'').remove();
			}, 1000);
	}
	function jumpIn(element) {
		var rndmclass =  Math.floor(Math.random()*100+1);
		$('#grid').append('<div class="mask '+rndmclass+'"></div>');
		var todoply = $('.pixel').eq(element);
		$('.'+rndmclass+'').css({
			width: todoply.width(),
			height: todoply.height(),
			position: 'absolute',
			top: todoply.position().top,
			left: todoply.position().left
		});
		$('.'+rndmclass+'').addClass('magictimefast puffIn');
		setTimeout(function() {
				$('.'+rndmclass+'').remove();
			}, 300);
	}
	$( "#power1" ).on( clickType, function() {
		if(invulnerableNr>=1){
			$(this).addClass('active');
			invulnerableNr--;
			if(invulnerableNr!=0) $('#power1 span').html(invulnerableNr); else $('#power1 span').html('');
			invulnerable = true;
			$(this).addClass('disabled');
			$( "#grid" ).addClass('power1');
			var count = 5;
			var curHTML = $('#power1 span').html();
			$('#power1 span').html(count);
			var countertimer = setInterval(function() {
				$('#power1 span').html(count-1);
					count--;
					if(count==0) {
						clearInterval(countertimer);
						$('#power1 span').html(curHTML);
					}

				}, 1000);
			setTimeout(function() {
				$( "#power1" ).removeClass('active')
				$( "#grid" ).removeClass('power1');
				if(invulnerableNr>=1) $('#power1').removeClass('disabled');
				invulnerable = false;
			}, 5000);
		} else {
			$('#power1 span').html('');
			$(this).addClass('disabled');
			notificate('lurido imbroglione!');
		}
	});
	$( "#power5" ).on( clickType, function() {
		if(turnLeftNr>=1) {
			turnLeftNr--;
			if(turnLeftNr==0) $('#power5').addClass('disabled');
			if(turnLeftNr!=0) $('#power5 span').html(turnLeftNr); else $('#power5 span').html('');
			robot.direction = getNewDirection('down',robot.direction);
			invertDirection();
			$('#power5').addClass('disabled');
			setTimeout(function() {
				if(turnLeftNr!=0) $('#power5').removeClass('disabled');
			}, 2000);
		} else {
			$('#power5 span').html('');
			$(this).addClass('disabled');
			notificate('lurido imbroglione!');
		}
	});
	$( "#power2" ).on( clickType, function() {
		if(fuckSkullsNr>=1) {
			fuckSkullsNr--;
			if(fuckSkullsNr==0) $('#power2').addClass('disabled');
			if(fuckSkullsNr!=0) $('#power2 span').html(fuckSkullsNr); else $('#power2 span').html('');

			for(var ki=0;ki<rowTiles;ki++) {
			for(var k=0;k<rowTiles;k++) {
				if(grid[ki][k] == 'evil') grid[ki][k] = 'hardwall';
				}
			}
			drawGrid();
			$('#power2').addClass('disabled');
			setTimeout(function() {
				if(fuckSkullsNr!=0) $('#power2').removeClass('disabled');
			}, 2000);
		} else {
			$('#power2 span').html('');
			$(this).addClass('disabled');
			notificate('lurido imbroglione!');
		}
	});
	$( "#power3" ).on( clickType, function() {
		 if(teleportNr>=1 || teleport) {
			if(teleport) {
				teleport = false;
				if(invulnerableNr>=1) $('#power1').removeClass('disabled');
				if(invulnerableNr!=0) $('#power1 span').html(invulnerableNr);
				if(skullstofreeNr>=1) $('#power6').removeClass('disabled');
				if(skullstofreeNr!=0) $('#power6 span').html(skullstofreeNr);
				if(evilclickableNr>=1) $('#power4').removeClass('disabled');
				if(evilclickableNr!=0) $('#power4 span').html(evilclickableNr);
				if(teleportNr==0) $(this).addClass('disabled');
				startWalking();
			}
			else {
				$('#power1').addClass('disabled');
				$('#power4').addClass('disabled');
				$('#power6').addClass('disabled');
				$('#grid').removeClass('stall');
			  	teleportNr--;
				teleport = true;
				if(teleportNr!=0) $('#power3 span').html(teleportNr); else $('#power3 span').html('');
				clearInterval(timer);
			}
		} else {
			$('#power3 span').html('');
			$(this).addClass('disabled');
			notificate('lurido imbroglione!');
		}
	});
	$( "#power6" ).on( clickType, function() {
		if(skullstofreeNr>=1) {
			skullstofreeNr--;
			$('#power6').addClass('disabled');
			if(skullstofreeNr!=0) $('#power6 span').html(skullstofreeNr); else $('#power6 span').html('');
			clearInterval(timer);
			var currentPos = gridPos(robot.position)
			$('#power6').addClass('disabled');
				if((gridPos(robot.position)[1]) < rowTiles-1) {
					if(grid[gridPos(robot.position)[0]][gridPos(robot.position)[1]+1] != 'end') grid[gridPos(robot.position)[0]][gridPos(robot.position)[1]+1] = 'free';
				}
				if((gridPos(robot.position)[1]) > 0) {
					if(grid[gridPos(robot.position)[0]][gridPos(robot.position)[1]-1] != 'end') grid[gridPos(robot.position)[0]][gridPos(robot.position)[1]-1] = 'free';
				}
				if((gridPos(robot.position)[0]) < rowTiles-1) {
					if(grid[gridPos(robot.position)[0]+1][gridPos(robot.position)[1]] != 'end') grid[gridPos(robot.position)[0]+1][gridPos(robot.position)[1]] = 'free';
				}
				if((gridPos(robot.position)[0]) > 0) {
					if(grid[gridPos(robot.position)[0]-1][gridPos(robot.position)[1]] != 'end') grid[gridPos(robot.position)[0]-1][gridPos(robot.position)[1]] = 'free';
				}

			setTimeout(function() {
					startWalking();
				}, 4500);
			setTimeout(function() {
					drawGrid();
			}, 1000);
			setTimeout(function() {
				if(((gridPos(robot.position)[1]) < rowTiles-1) && ((gridPos(robot.position)[0]) < rowTiles-1)) {
					if(grid[gridPos(robot.position)[0]+1][gridPos(robot.position)[1]+1] != 'end') grid[gridPos(robot.position)[0]+1][gridPos(robot.position)[1]+1] = 'free';
				}
				if(((gridPos(robot.position)[1]) > 0) && ((gridPos(robot.position)[0]) > 0)) {
					if(grid[gridPos(robot.position)[0]-1][gridPos(robot.position)[1]-1] != 'end') grid[gridPos(robot.position)[0]-1][gridPos(robot.position)[1]-1] = 'free';
				}
				if(((gridPos(robot.position)[0]) < rowTiles-1) && ((gridPos(robot.position)[1]) > 0)) {
					if(grid[gridPos(robot.position)[0]+1][gridPos(robot.position)[1]-1] != 'end') grid[gridPos(robot.position)[0]+1][gridPos(robot.position)[1]-1] = 'free';
				}
				if(((gridPos(robot.position)[0]) > 0) && ((gridPos(robot.position)[1]) < rowTiles-1)) {
					if(grid[gridPos(robot.position)[0]-1][gridPos(robot.position)[1]+1] != 'end') grid[gridPos(robot.position)[0]-1][gridPos(robot.position)[1]+1] = 'free';
				}
					drawGrid();
			}, 2000);
			setTimeout(function() {
					if(skullstofreeNr!=0) $('#power6').removeClass('disabled');
				}, 2500);
		} else {
			$('#power6 span').html('');
			$(this).addClass('disabled');
			notificate('lurido imbroglione!');
		}

	});
	$( "#power4" ).on( clickType, function() {
		if(evilclickableNr>=1) {
			$(this).addClass('active');
			evilclickableNr--;
			if(evilclickableNr!=0) $('#power4 span').html(evilclickableNr); else $('#power4 span').html('');
			evilclickable = true;
			$(this).addClass('disabled');
			$( "#grid" ).addClass('power4');
			var count = 5;
			var curHTML = $('#power4 span').html();
			$('#power4 span').html(count);
			var countertimer = setInterval(function() {
				$('#power4 span').html(count-1);
					count--;
					if(count==0) {
						clearInterval(countertimer);
						$('#power4 span').html(curHTML);
					}

				}, 1000);
			setTimeout(function() {
				$( "#power4" ).removeClass('active')
				$( "#grid" ).removeClass('power4');
				if(evilclickableNr>=1) $('#power4').removeClass('disabled');
				evilclickable = false;
			}, 5000);
		} else {
			$('#power4 span').html('');
			$(this).addClass('disabled');
			notificate('lurido imbroglione!');
		}
	});
	$( "#namePlayer" ).on( 'focus', function() {
			$('body').css({
				height: $(window).height()-16
			});
	});
	function readJson() {
		$.getJSON( "./example.json", function( data ) {
			  var items = [];
			  var tv = data.chart;
			  var datasorted = tv.sort(function (a, b) {
						    a = parseInt(a.score, 10);
						    b = parseInt(b.score, 10);
						    return a > b ? -1 : a < b ? 1 : 0;
						});
			  sortedChart = datasorted;
			  $.each( data.chart, function( key ) {

			    items.push( "<li class='chartitem'><span class='userid'>" + data.chart[key].name + "</span><span class='chartPoints'>" + data.chart[key].score + "</span></li>" );
			  });

			  var myol = $( "<ol/>", {
			    "class": "my-new-list",
			    html: items.join( "" )
			  }); $( "#chartview" ).html(myol);

			});
	}
	function notificate(text) {
		$('.clickcounter').html(text);
		$('.clickcounter').show();
		setTimeout(function() {
			$('.clickcounter').fadeOut()
		}, 500);
	}
	function notificateClick(text) {
		$('.clickcounter').html(text);
		$('.clickcounter').show();
		$('.clickcounter').fadeOut();
	}
	function updatePoints() {
		if(points<=0) points = 0;
		$('#pointscounter').html(points);
	}
	function drawGrid() {
		for(var ki=0;ki<rowTiles;ki++) {
			for(var k=0;k<rowTiles;k++) {
				var optimize = $( ".pixel:eq("+elementPos(ki,k)+")" );
				if(grid[ki][k]=='start') {optimize.attr('class', 'pixel start');}
				else if(grid[ki][k]=='end') {optimize.attr('class', 'pixel end');}
				else if(grid[ki][k]=='hardwall') {optimize.attr('class', 'pixel hardwall');}
				else if(grid[ki][k]=='evil') {optimize.attr('class', 'pixel evil');}
				else if(grid[ki][k]=='wall') {optimize.attr('class', 'pixel');}
				else if(grid[ki][k]=='bonus') {optimize.attr('class', 'pixel bonus');}
				else optimize.attr('class', 'pixel free');
			}
		}
	}
	function drawGridLight(position,a,b) {
		var optimize = $( ".pixel:eq("+position+")" );
				if(grid[a][b]=='start') {optimize.attr('class', 'pixel start');}
				else if(grid[a][b]=='end') {optimize.attr('class', 'pixel end');}
				else if(grid[a][b]=='bonus') {optimize.attr('class', 'pixel free');}
				else if(grid[a][b]=='wall') {optimize.attr('class', 'pixel');}
				else if(grid[a][b]=='evil') {optimize.attr('class', 'pixel evil');}
				else optimize.attr('class', 'pixel free');
	}
	function drawRobot() {
		var tr = $('.pixel').eq(robot.position);

		 if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		   $('.dinrobot').css('transform', 'translate('+tr.position().left+'px,'+tr.position().top+'px)');
		   $('.dinrobot').css('transition-duration', '200ms');
		} else $('.dinrobot').css('-webkit-transform', 'translate3d('+tr.position().left+'px,'+tr.position().top+'px,0)');


		if(!turnLeft) $('.dinrobot').attr('id', ''+robot.direction+'');
		else $('.dinrobot').attr('id', ''+getNewDirection('down',robot.direction)+'');


	}
	function createRobot() {
		robot.position = elementPos(startx,starty);
		grid[startx][starty] = 'robot';
		drawGrid();
		$('#grid').append('<div class="pixel dinrobot"/>');
		var tr = $('.pixel').eq(elementPos(startx,starty));
		$('.dinrobot').css({
			position: 'absolute',
			top: tr.position().top,
			left: tr.position().left,
		});
		$('.dinrobot').css({
			top: 0,
			left: 0
		});
		$( ".pixel" ).each(function( index ) {
			  $(this).css({
			  	height: pixelDimension,
			  	width: pixelDimension
			  });
		});
	}
	function moveindirection(direzione) {

			if(direzione=='left') {
				moveLeft();
			}
			if(direzione=='right') {
				moveRight();
			}
			if(direzione=='up') {
				moveUp();
			}
			if(direzione=='down') {
				moveDown();
			}
			markPositions(robot.position);

	}

	function moveRobot() {
		if(turnLeft) {
			$('#power5').addClass('leftdir');
			$('#power5').removeClass('rightdir');
			if(checkRelative('left')[0]) {
				moveindirection(checkRelative('left')[1]);
			}
			else if(checkRelative('up')[0]) {
				moveindirection(checkRelative('up')[1]);

			}
			else if(checkRelative('right')[0]) {
				moveindirection(checkRelative('right')[1]);

			}
			else if(checkRelative('down')[0]) {
				moveindirection(checkRelative('down')[1]);

			}
			else {robot.stall++;};
		} else {
			$('#power5').removeClass('leftdir');
			$('#power5').addClass('rightdir');
			if(checkRelative('right')[0]) {

				moveindirection(checkRelative('right')[1]);
			}
			else if(checkRelative('up')[0]) {
				moveindirection(checkRelative('up')[1]);

			}
			else if(checkRelative('left')[0]) {
				moveindirection(checkRelative('left')[1]);

			}
			else if(checkRelative('down')[0]) {
				moveindirection(checkRelative('down')[1]);

			}
			else {robot.stall++;};
		}


		//winning code
		if(gridPos(robot.position)[0]==endx && gridPos(robot.position)[1]==endy) {
			clearInterval(timer);
			$('body').removeClass('infodisplayed');
			points = (points + 10*level)+clickcounter;;
			updatePoints();
			clearInterval(timealmostdone);
			invulnerable = false;
			clearInterval(almostdone);
			if(lastmove) {
				$('body').addClass('gameover finish');
				$('.loosecontrols').removeClass('hasbonus');
				points = points + (10*lifebonus);
				updatePoints();
				$('#bonusleftcounter').html('0');
				$('body').removeClass('gaming');
				$('.loosecontrols').addClass('noclick');
				setTimeout(function() {
					ceckchart();
					$('.loosecontrols').removeClass('noclick');
		        }, 2000);

			}
			else {
				$('.cleared').html('level '+level+' cleared');
				$('body').addClass('win');
				$('body').removeClass('gaming');
			}
		}
		//winning code

	}

	function checkRelative(direction){
		if(direction=='right') {

		}
		var newDirection = getNewDirection(direction,robot.direction);
		if(newDirection=='down') {
			return [checkDown(),newDirection];
		}
		if(newDirection=='up') {
			return [checkUp(),newDirection];
		}
		if(newDirection=='left') {
			return [checkLeft(),newDirection];
		}
		if(newDirection=='right') {
			return [checkRight(),newDirection];
		}
	}
	function checkRight(){
		var currPos = gridPos(robot.position);
		if(currPos[0] == rowTiles-1 ) { return false; }
		else if(robot.direction=='left') { return false; }
		else {
			var nextPos = gridPos(robot.position+1);
			if(grid[nextPos[0]][nextPos[1]]=='free') return true;
			else if(grid[nextPos[0]][nextPos[1]]=='wall') return false;
			else if(grid[nextPos[0]][nextPos[1]]=='hardwall') return false;
			else return true;
		}
	}


	function moveRight() {
		var mypositions = gridPos(robot.position);
		grid[mypositions[0]][mypositions[1]] = 'free';
		robot.position = robot.position+1;
		var mypositions = gridPos(robot.position);
		checkEvil(grid[mypositions[0]][mypositions[1]]);
		checkBonus(mypositions);
		grid[mypositions[0]][mypositions[1]] = 'robot';
		robot.direction = 'right';
		drawRobot();
		//refineRobot();

	}
	function checkUp(){
		var currPos = gridPos(robot.position);
		if(currPos[1] == rowTiles-1 ) { return false; }
		else if (robot.direction=='down') { return false; }
		else {
			var nextPos = gridPos(robot.position);
			if(grid[nextPos[0]][nextPos[1]+1]=='free') return true;
			else if(grid[nextPos[0]][nextPos[1]+1]=='wall') return false;
			else if(grid[nextPos[0]][nextPos[1]+1]=='hardwall') return false;
			else return true;
		}
	}
	function moveUp() {
		var mypositions = gridPos(robot.position);
		grid[mypositions[0]][mypositions[1]] = 'free';

		robot.position = robot.position-rowTiles;
		var mypositions = gridPos(robot.position);
		checkEvil(grid[mypositions[0]][mypositions[1]]);
		checkBonus(mypositions);
		grid[mypositions[0]][mypositions[1]] = 'robot';
		robot.direction = 'up';
		drawRobot();
		//refineRobot();
	}
	function checkDown(){
		var currPos = gridPos(robot.position);
		if(currPos[1] == 0 ) { return false; }
		else if (robot.direction=='up') { return false; }
		else {
			var nextPos = gridPos(robot.position);
			if(grid[nextPos[0]][nextPos[1]-1]=='free') return true;
			else if(grid[nextPos[0]][nextPos[1]-1]=='wall') return false;
			else if(grid[nextPos[0]][nextPos[1]-1]=='hardwall') return false;
			else return true;
		}
	}
	function moveDown() {
		var mypositions = gridPos(robot.position);
		grid[mypositions[0]][mypositions[1]] = 'free';

		robot.position = robot.position+rowTiles;
		var mypositions = gridPos(robot.position);
		checkEvil(grid[mypositions[0]][mypositions[1]]);
		checkBonus(mypositions);
		grid[mypositions[0]][mypositions[1]] = 'robot';
		robot.direction = 'down';
		drawRobot();
	}
	function checkLeft(){
		var currPos = gridPos(robot.position);
		if(currPos[0] == 0 ) { return false; }
		else if(robot.direction=='right') { return false; }
		else {
			var nextPos = gridPos(robot.position-1);
			if(grid[nextPos[0]][nextPos[1]]=='free') return true;
			else if(grid[nextPos[0]][nextPos[1]]=='wall') return false;
			else if(grid[nextPos[0]][nextPos[1]]=='hardwall') return false;
			else return true;
		}
	}
	function moveLeft() {
		var mypositions = gridPos(robot.position);
		grid[mypositions[0]][mypositions[1]] = 'free';
		robot.position = robot.position-1;
		var mypositions = gridPos(robot.position);
		checkEvil(grid[mypositions[0]][mypositions[1]]);
		checkBonus(mypositions);
		grid[mypositions[0]][mypositions[1]] = 'robot';
		robot.direction = 'left';
		drawRobot();
	}
	var loopcounter = 0;
	function markPositions(current) {
		loopCeck.shift();
		loopCeck.push(current);
		if(loopCeck[4]==loopCeck[0] && loopCeck[4]!= loopCeck[2] && loopCeck[1]!= loopCeck[3]) {
			loopcounter++;
			if(loopcounter==5) {
				invertDirection();
				loopCeck[4] = 'none';
				loopcounter=0;
				notificate('loop!');}
		}
		else {
			loopcounter = 0;
		}

	}
	function checkBonus(curpositions) {
		if(grid[curpositions[0]][curpositions[1]] == 'bonus') {
			points = points + 50;
			updatePoints();
			var newPower = Math.floor(Math.random()*(5)+1);
			if (newPower == 5) newPower = 6;
			$('#power'+newPower+'').removeClass('disabled');
				 if(newPower==1) { invulnerableNr++; $('#power1 span').html(invulnerableNr)}
			else if(newPower==2) {fuckSkullsNr++; $('#power2 span').html(fuckSkullsNr)}
			else if(newPower==3) {teleportNr++; $('#power3 span').html(teleportNr)}
			else if(newPower==4) {evilclickableNr++; $('#power4 span').html(evilclickableNr)}
			else if(newPower==6) {skullstofreeNr++; $('#power6 span').html(skullstofreeNr)}
			drawGridLight(robot.position,curpositions[0],curpositions[1]);
		}
	}
	function checkEvil(value) {
		if(value=='evil') {
			clearInterval(timer);
			$('body').addClass('waiting');
			setTimeout(function() {
				$('body').removeClass('waiting');
                $('body').addClass('gameover');
                $('body').removeClass('infodisplayed');
                if(lifebonus>0)  {
				lifebonus--;
				$('.loosecontrols').addClass('hasbonus');
				$('#bonuslife span').html(lifebonus+1);
				} else {
					$('.loosecontrols').removeClass('hasbonus');
					ceckchart();
				}
               }, 1000);
			 $('body').removeClass('gaming');
			clearInterval(almostdone);
			clearInterval(timealmostdone);


		}
	}
	function ceckchart() {
		if(sortedChart[sortedChart.length-1].score < points) {
			$('body').removeClass('gameover');
			$('body').addClass('editchart');
			clearInterval(changeviewporttimer);
		}
	}
	function gridPos(elemposition) {
		return([elemposition%rowTiles,((rowTiles-1)-(parseInt(elemposition/rowTiles)))]);
	}
	function elementPos(x,y) {
		var pass = rowTiles*(rowTiles-1-y)+x;
		return pass;
	}

	function populateGrid() {
			startx = 0;
			starty = 5;
			grid = new Array(rowTiles);
			for(var ty=0;ty<rowTiles;ty++) {
				grid[ty] = new Array(rowTiles);
			}
			for(var ki=0;ki<rowTiles;ki++) {
				for(var k=0;k<rowTiles;k++) {
					if(ki!=rowTiles-1 && k!=rowTiles-1 && k!=0 && ki!=0)
					grid[ki][k] = 'free';
					else
					grid[ki][k] = 'wall';
				}
			}
			grid[0][rowTiles-1] = 'free';
			grid[1][4] = 'wall';
			grid[1][6] = 'wall';
			grid[2][4] = 'wall';
			grid[2][6] = 'wall';
			grid[2][5] = 'wall';

			grid[2][5] = 'wall';
			grid[2][5] = 'wall';
			grid[2][5] = 'wall';

			grid[endx][endy] = 'end';
			for (var iop = 1; iop <= level-1; iop++) {
				var spaceforskeletrons = [];
				for(var ki=0;ki<rowTiles;ki++) {
					for(var k=0;k<rowTiles;k++) {
						if(grid[ki][k] == 'free' && !(k==5 && ki ==1) && !(k==5 && ki ==rowTiles-2) && !(k==4 && ki ==rowTiles-2) && !(k==6 && ki ==rowTiles-2)) {
							spaceforskeletrons.push([ki,k]);
						}
					}
				}
				if(spaceforskeletrons.length > 0) {
					var randomfree = Math.floor(Math.random()*(spaceforskeletrons.length-0)+0);
					grid[spaceforskeletrons[randomfree][0]][spaceforskeletrons[randomfree][1]] = 'evil';
				}
				var spaceforhardwalls = [];
				for(var ki=0;ki<rowTiles;ki++) {
					for(var k=0;k<rowTiles;k++) {
						if((grid[ki][k] == 'free' || grid[ki][k] == 'wall') && ki!= rowTiles-1 && !(k==5 && ki ==1) && !(k==4 && ki ==2) && !(k==6 && ki ==2) && !(k==5 && ki ==2)) {
							spaceforhardwalls.push([ki,k]);
						}
					}
				}
				if(spaceforhardwalls.length > 0) {
					var randomfree = Math.floor(Math.random()*(spaceforhardwalls.length-0)+0);
					grid[spaceforhardwalls[randomfree][0]][spaceforhardwalls[randomfree][1]] = 'hardwall';
				}
			};
			addBonus(false);

	}
	function addBonus(random) {
			var freecels = [];
			for(var ki=0;ki<rowTiles;ki++) {
				for(var k=0;k<rowTiles;k++) {
					if(grid[ki][k] == 'free' && !(k==5 && ki ==1)) {
						freecels.push([ki,k]);
					}
				}
			}
			if(freecels.length > 1 ) {
				var randomfree = Math.floor(Math.random()*(freecels.length-0)+0);
				if( level%4 == 0 || level == 1 || random) grid[freecels[randomfree][0]][freecels[randomfree][1]] = 'bonus';
			}

			else {
				 lastmove = true;
			}
	}
});
function getNewDirection(tocheck,dir) {
	if(tocheck=='right') {
		if(dir.indexOf('right')!=-1) return 'down';
		if(dir.indexOf('left')!=-1) return 'up';
		if(dir.indexOf('down')!=-1) return 'left';
		if(dir.indexOf('up')!=-1) return 'right';
	}
	if(tocheck=='left') {
		if(dir.indexOf('right')!=-1) return 'up';
		if(dir.indexOf('left')!=-1) return 'down';
		if(dir.indexOf('down')!=-1) return 'right';
		if(dir.indexOf('up')!=-1) return 'left';
	}
	if(tocheck=='up') {
		if(dir.indexOf('right')!=-1) return 'right';
		if(dir.indexOf('left')!=-1) return 'left';
		if(dir.indexOf('down')!=-1) return 'down';
		if(dir.indexOf('up')!=-1) return 'up';
	}
	if(tocheck=='down') {
		if(dir.indexOf('right')!=-1) return 'left';
		if(dir.indexOf('left')!=-1) return 'right';
		if(dir.indexOf('down')!=-1) return 'up';
		if(dir.indexOf('up')!=-1) return 'down';
	}
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
