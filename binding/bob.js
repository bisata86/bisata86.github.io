var isMobile = detectmob();
$( document ).ready(function() {
    if(isMobile)$('#debug').html('left Jstick to move, right Jstick to shot');
    $('#canvasContainer').append(canvas);
    if(isMobile) {
    	$('#canvasContainer canvas').css({
    		width: '100%'
    	});
    } else {
    	$('#indicators').css({
    		width: '500px',
    		margin: 'auto'
    	});
    }
    setTimeout(function(){
			$('#debug').fadeOut();
			$('.pageTitle').fadeOut();


	}, 2000);
	setTimeout(function(){
			$('#indicators').fadeIn();
	}, 2500);
	// Draw Indicators
	var indStructure = "<div class='size'><div class='tit'>SIZE</div> <div class='span'><div class='pin'></div></div></div>";
	indStructure += "<div class='firerate'><div class='tit'>FIRE RATE</div> <div class='span'><div class='pin'></div></div></div>";
	indStructure += "<div class='range'><div class='tit'>RANGE</div> <div class='span'><div class='pin'></div></div></div>";
	indStructure += "<div class='bsize'><div class='tit'>BULLETS</div> <div class='span'><div class='pin'></div></div></div>";
	indStructure += "<div class='speed'><div class='tit'>SPEED</div><div class='span'><div class='pin'></div></div></div>";
	$('#indicators').html(indStructure);
	reset()

});
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 500;
canvas.width = canvasWidth;
canvas.height = canvasWidth;
var mah = $(window).width();
var powerUpInterval;
var powerDownInterval;
var time = 0;
//joysticks
if(isMobile) {
	var tobase = $(window).height()-100;
	$('body').css({
		height : '2000px'
	});

	var joystick2	= new VirtualJoystick({
		strokeStyle	: 'red',
		limitStickTravel: true,
		stickRadius	: 50,
		stationaryBase: true,
        baseX: mah-100,
        baseY: tobase,
	});
	joystick2.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX < window.innerWidth/2 )	return false;
		return true
	});
	// one on the right of the screen
	var joystick	= new VirtualJoystick({
		strokeStyle	: 'orange',
		limitStickTravel: true,
		stickRadius	: 50,
		stationaryBase: true,
        baseX: 100,
        baseY: tobase,
	});
	joystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX >= window.innerWidth/2 )	return false;
		return true
	});
	joystick2.addEventListener('touchEnd', function(event){
		heroImage.src = "./hero.png";
		if(!resetShotIntervalActive) {
			 resetShotIntervalActive = true;
			 resetShotInterval = setInterval(function(){ time = 0; }, 200);
		}
	});
}
//images

	// Background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "./bg.png";

	// Hero image
	var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
		heroReady = true;
	};
	heroImage.src = "./hero.png";
	// Barricate image
	var barrReady = false;
	var barrImage = new Image();
	barrImage.onload = function () {
		barrReady = true;
	};
	barrImage.src = "./white.jpg";

	// PowerUp PowerDown
	var PowerUpReady = false;
	var PowerUpImage = new Image();
	PowerUpImage.onload = function () {
		PowerUpReady = true;
	};
	PowerUpImage.src = "./powerup.png";

	var PowerDownReady = false;
	var PowerDownImage = new Image();
	PowerDownImage.onload = function () {
		PowerDownReady = true;
	};
	PowerDownImage.src = "./powerdown.png";

	// Bullet image
	var bulletReady = false;
	var bulletImage = new Image();
	bulletImage.onload = function () {
		bulletReady = true;
	};
	bulletImage.src = "./bullet.png";

	// Monster image
	var monsterReady = false;
	var monsterImage = new Image();
	monsterImage.onload = function () {
		monsterReady = true;
	};
	monsterImage.src = "./monster.png";

// Game objects
	var hero = {
		speed: 256, // movement in pixels per second
		range: 0,
		size: 0,
		lives: 3,
		firerate: 0,
		maxrange: 90,
		minrange: 0,
		maxspeed: 400,
		minspeed: 150,
		maxsize: 60,
		minsize: 10,
		maxfirerate: 40,
		minfirerate: 5
	};
	var powerUps = [];
	var powerUp = {
		x: 25,
		y: 30
	};
	var powerDown = {
		x: 25,
		y: 30
	};
	var monster = {
		speed: 25
	};
	var monsters = [];
	monsters.push(monster);
	var kills = 0;
	var level = 1;
	var bullets = [];
	var bullet = {
		size: 30,
		maxsize: 100,
		minsize: 10
	};
	var barricate = {
		x : 400,
		y : 100,
		width: 10,
		height: 80
	}
// Handle keyboard controls
	var keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
// Reset the game
var reset = function () {
	hero.size = 50;
	hero.lives = 3;
	hero.x = canvas.width / 2 - hero.size/2;
	hero.y = canvas.height / 2 - hero.size/2;
	hero.range = 20;
	hero.firerate = 30;
	for (var i = monsters.length - 1; i >= 0; i--) {
		monsters[i].speed = 25;
	}
	bullet.x = 2000;
	bullet.y = 2000;
	bullet.path = 0;
	bullet.size = 30;
	hero.speed = 200;
	kills = 0;
	level = 1;
	monsters = [];
	monsters.push(monster);
	goMonster();
	setPowerUP();
	setPowerD();
	clearInterval(powerUpInterval);
	clearInterval(powerDownInterval);
	powerDownInterval = setInterval(function(){
			setPowerD()
	}, 20000);
	modifyIndicators('range');
	modifyIndicators('speed');
	modifyIndicators('bsize');
	modifyIndicators('size');
	modifyIndicators('firerate');
};
var setPowerUP = function() {
	powerUp.x = Math.random()*(canvas.width-31);
	powerUp.y = Math.random()*(canvas.width-31);
	clearInterval(powerUpInterval);
}
var setPowerD = function() {
	powerDown.x = Math.random()*(canvas.width-31);
	powerDown.y = Math.random()*(canvas.width-31);
}
var newMonster = function (number) {
	for (var i = number - 1; i >= 0; i--) {
		var newmonster = {};
		monsters.push(newmonster);
	};
	goMonster();
};
var goMonster = function() {
	for (var i = monsters.length - 1; i >= 0; i--) {

		var direction = Math.floor(Math.random()*(4))
		if(direction == 0) {
				monsters[i].x = Math.random()*(canvas.width+33)+32;
				monsters[i].y = -32;
		}
		else if(direction == 1) {
				monsters[i].x = Math.random()*(canvas.width+33)+32;
				monsters[i].y = canvas.width;
		}
		else if(direction == 2) {
				monsters[i].x = -32;
				monsters[i].y = Math.random()*(canvas.width+33)+32;
		}
		else if(direction == 3) {
				monsters[i].x = canvas.width;
				monsters[i].y = Math.random()*(canvas.width+33)+32;
		}
	}
}
var randomN;
var resetShotInterval;
var resetShotIntervalActive = false;
var frooze = false;
var update = function (modifier) {
	//move hero
	if(!frooze) {}
	function moveRight() {
		if(canvas.width > hero.x + hero.size) {
			if(((hero.y + hero.size < barricate.y) || (hero.y > barricate.y + barricate.height)) || (barricate.x >  hero.x + hero.size+5) || (barricate.x + barricate.width  <  hero.x))
				hero.x += hero.speed * modifier;
		}
	}
	function moveLeft() {
		if(hero.x > 0) {
			if(((hero.y + hero.size < barricate.y) || (hero.y > barricate.y + barricate.height)) || (barricate.x + barricate.width+5 <  hero.x) || (barricate.x  >  hero.x + hero.size))
				hero.x -= hero.speed * modifier;
		}
	}
	function moveUp() {
		if(hero.y > 0)
			hero.y -= hero.speed * modifier;
	}
	function moveDown() {
		if(canvas.width > hero.y + hero.size)
		hero.y += hero.speed * modifier;
	}

	if(isMobile) {
		if( joystick.right() ){
        	moveRight();
        }
        if( joystick.left() ){
        	moveLeft();
        }
        if( joystick.up() ){
			moveUp();
        	}
        if( joystick.down() ){
        	moveDown();
     	}
	}
	if(!isMobile && !(37 in keysDown) && !(38 in keysDown) && !(39 in keysDown) && !(40 in keysDown)) {
		heroImage.src = "./hero.png";
		if(!resetShotIntervalActive) {
			 resetShotIntervalActive = true;
			 resetShotInterval = setInterval(function(){ time = 0;  }, 100);
		}
	}
	if (87 in keysDown) { // Player holding up
		moveUp();
	}
	if (83 in keysDown) { // Player holding down
		moveDown();
	}
	if (65 in keysDown) { // Player holding left
		moveLeft();
	}
	if (68 in keysDown) { // Player holding right
		moveRight();
	}

	// get powerup
	if (
		hero.x <= (powerUp.x + 32)
		&& powerUp.x <= (hero.x + hero.size)
		&& hero.y <= (powerUp.y + 32)
		&& powerUp.y <= (hero.y + hero.size)
		) {
		getPowerUp();
	}
	function getPowerUp() {
		var somethingDone = false;
		powerUp.x=2000;
		powerUp.y=2000;
		var upgrade = Math.floor(Math.random()*(6));
		//upgrade = 0;
		if(upgrade==0) {
			if(hero.range < hero.maxrange)  {
				hero.range += 5;
				modifyIndicators('range');
				somethingDone = true;
			}
		}
		if(upgrade==1) {
			if(hero.speed < hero.maxspeed)  {
				hero.speed += 10;
				modifyIndicators('speed');
				somethingDone = true;
			}
		}
		if(upgrade==2) {
			if(bullet.size < bullet.maxsize) {
				bullet.size += 10;
				modifyIndicators('bsize');
				somethingDone = true;
			}
		}
		if(upgrade==3) {
			if(hero.size > hero.minsize) {
				hero.size -= 5;
				modifyIndicators('size');
				somethingDone = true;
			}
		}
		if(upgrade==4) {
			if(hero.firerate > hero.minfirerate) {
			 	hero.firerate -= 5;
			 	modifyIndicators('firerate');
			 	somethingDone = true;
			 }
		}
		if(upgrade==5) {
			hero.lives = hero.lives+1;
			somethingDone = true;
		}
		clearInterval(powerUpInterval);
		powerUpInterval = setInterval(function(){ setPowerUP();  }, 15000);
		if(!somethingDone) {
			getPowerUp();
		}
	}
	// get powerdown
	if (
		hero.x <= (powerDown.x + 32)
		&& powerDown.x <= (hero.x + hero.size)
		&& hero.y <= (powerDown.y + 32)
		&& powerDown.y <= (hero.y + hero.size)
		) {
		getPowerDown();
	}
	function getPowerDown() {
		var somethingDone = false;
		powerDown.x=2000;
		powerDown.y=2000;
		var upgrade = Math.floor(Math.random()*(5));
		//upgrade = 4;
		if(upgrade==0) {
			if(hero.range > hero.minrange) {
				hero.range -= 5;
				modifyIndicators('range');
				somethingDone = true;
			}
		}
		if(upgrade==1) {
			if(hero.speed > hero.minspeed) {
				hero.speed -= 10;
				modifyIndicators('speed');
				somethingDone = true;
			}
		}
		if(upgrade==2) {
			if(bullet.size > bullet.minsize) {
				bullet.size -= 10;
				modifyIndicators('bsize');
				somethingDone = true;
			}
		}
		if(upgrade==3) {
			if(hero.size < hero.maxsize) {
				hero.size += 5;
				modifyIndicators('size');
				somethingDone = true;
			}
		}
		if(upgrade==4) {
			if(hero.firerate < hero.maxfirerate) {
				hero.firerate += 5;
				modifyIndicators('firerate');
				somethingDone = true;
			}
		}
		if(upgrade==5) {
			hero.lives = hero.lives-1;
			somethingDone = true;
		}
		var oldN = randomN;
		randomN = Math.floor(Math.random()*(100));
		setPowerD();
		var currentX = powerDown.x;
		clearInterval(powerDownInterval);
		powerDownInterval = setInterval(function(){
			setPowerD()
		}, 10000);
		if(!somethingDone) {
			getPowerDown();
		}
	}
	function shotUp() {
		// bullet.x = hero.x + (hero.size/2) - (bullet.size/2);
		// bullet.y = hero.y - bullet.size;
		// bullet.direction = 2;
		//shooting = true;
		heroImage.src = "./herou.png";

		var newBullet = {};
		newBullet.x = hero.x + (hero.size/2) - (bullet.size/2);
		newBullet.y = hero.y - bullet.size;
		newBullet.path = 0;
		newBullet.direction = 2
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}
	function shotRight() {
		var newBullet = {};
		newBullet.x = hero.x  + hero.size;
		newBullet.y = hero.y + (hero.size/2) - (bullet.size/2);
		newBullet.path = 0;
		newBullet.direction = 1;
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		heroImage.src = "./heror.png";
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}
	function shotLeft() {
		var newBullet = {};
		newBullet.x = hero.x - bullet.size;
		newBullet.y = hero.y + (hero.size/2) - (bullet.size/2);
		newBullet.direction = 0;
		newBullet.path = 0;
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		heroImage.src = "./herol.png";
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}
	function shotDown() {
		var newBullet = {};
		newBullet.x = hero.x + (hero.size/2) - (bullet.size/2);
		newBullet.y = hero.y + hero.size;
		newBullet.direction = 3;
		newBullet.path = 0;
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		heroImage.src = "./herod.png";
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}
	function shotUpRight() {
		var newBullet = {};
		newBullet.x = hero.x + hero.size;
		newBullet.y = hero.y - bullet.size;
		newBullet.direction = 5;
		newBullet.path = 0;
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		heroImage.src = "./herour.png";
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}
	function shotUpLeft() {
		var newBullet = {};
		newBullet.x = hero.x - bullet.size;
		newBullet.y = hero.y - bullet.size;
		newBullet.direction = 6;
		newBullet.path = 0;
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		heroImage.src = "./heroul.png";
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}
	function shotBottomRight() {
		var newBullet = {};
		newBullet.x = hero.x  + hero.size;
		newBullet.y = hero.y  + hero.size;
		newBullet.direction = 8;
		newBullet.path = 0;
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		heroImage.src = "./herodr.png";
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}
	function shotBottomLeft() {
		var newBullet = {};
		newBullet.x = hero.x  - bullet.size;
		newBullet.y = hero.y  + hero.size;
		newBullet.direction = 7;
		newBullet.path = 0;
		if(time%hero.firerate==0)	bullets.push(newBullet);
		time++;
		heroImage.src = "./herodl.png";
		clearInterval(resetShotInterval);
		resetShotIntervalActive = false;
	}

	//shooting
	if(true) {
		if(isMobile) {
			if( joystick2.right() && joystick2.up() ){
					shotUpRight();
			}
			else if( joystick2.left() && joystick2.up() ){
					shotUpLeft();
			}
			else if( joystick2.down() && joystick2.right() ){
					shotBottomRight();
			}
			else if( joystick2.down() && joystick2.left() ){
					shotBottomLeft();
			}
	     	else if( joystick2.right() ){
					shotRight();
	        }
	        else if( joystick2.left() ){
					shotLeft();
	        }
	        else if( joystick2.up() ){
					shotUp();
	        }
	        else if( joystick2.down() ){
					shotDown();
	     	}
		}

		if (39 in keysDown && 38 in keysDown ) { // Shooting upright
			shotUpRight();
		}
		else if (37 in keysDown && 38 in keysDown) { // Shooting upleft
			shotUpLeft();
		}
		else if (40 in keysDown && 37 in keysDown) { // Shooting downleft
			shotBottomLeft();
		}
		else if (40 in keysDown && 39 in keysDown) { // Shooting downright
			shotBottomRight();
		}
		else if (37 in keysDown) { // Shooting left
			shotLeft();
		}
		else if (39 in keysDown ) { // Shooting right
			shotRight();
		}
		else if (38 in keysDown) { // Shooting up
			shotUp();
		}
		else if (40 in keysDown) { // Shooting down
			shotDown();
		}
	}

	//handling monsters
	for (var i = monsters.length - 1; i >= 0; i--) {
		// Are you dead?
		if (
			hero.x <= (monsters[i].x + 32)
			&& monsters[i].x <= (hero.x + hero.size)
			&& hero.y <= (monsters[i].y + 32)
			&& monsters[i].y <= (hero.y + hero.size)
		) {
			//$('#debug').html('Lose at level: '+level).show();
			//monsters.splice(i, 1);
			//goMonster()
			//reset();

			if(hero.lives>0){
				//freeze
				goMonster();
				hero.lives = hero.lives-1;
			} else {

					reset();


			}
			break;
		}

		//move monster
		if(monsters[i].x <= hero.x) {
			//console.log('uno')
			monsters[i].x += monsters[i].speed * modifier;
		}
		else if(monsters[i].x > hero.x) {
			//console.log('due')
			monsters[i].x -= monsters[i].speed * modifier;
		}
		if(monsters[i].y <= hero.y) {
			//console.log('tre')
			monsters[i].y += monsters[i].speed * modifier;
		}
		else if(monsters[i].y > hero.y) {
			//console.log('quattro')
			monsters[i].y -= monsters[i].speed * modifier;
		}
		// Are you hitting?
		for (var u = bullets.length - 1; u >= 0; u--) {
			if (
				bullets[u].x <= (monsters[i].x + 32)
				&& monsters[i].x <= (bullets[u].x + bullet.size)
				&& bullets[u].y <= (monsters[i].y + 32)
				&& monsters[i].y <= (bullets[u].y + bullet.size)
			) {
				++kills;
				var globalSpeed = monsters[0].speed + 25;
				monsters.splice(i, 1);
				bullets.splice($.inArray(bullets[u], bullets),1);
				if(monsters.length==0) {
					level++;
					newMonster(Math.ceil((level+1)/5));
					if((level)%5!=0) {
						for (var i = monsters.length - 1; i >= 0; i--) {
							monsters[i].speed = globalSpeed;
						}
					} else {
						for (var i = monsters.length - 1; i >= 0; i--) {
							monsters[i].speed = 25;
						}
					}
				}
				break;
			}
		}
	};

	// bullets move
	if(true) {
		for (var i = bullets.length - 1; i >= 0; i--) {
			//console.log(parseInt(modifier.toString().split('.')[1]))
			//console.log(bullets.length)
			//shot left
			if(bullets[i].direction == 0) {
				bullets[i].x = bullets[i].x - 5
			}
			//shot right
			if(bullets[i].direction == 1) {
				bullets[i].x = bullets[i].x + 5
			}
			//shot up
			if(bullets[i].direction == 2) {
				bullets[i].y = bullets[i].y - 5
			}
			//shot down
			if(bullets[i].direction == 3) {
				bullets[i].y = bullets[i].y + 5
			}
			if(bullets[i].direction == 5) {
				bullets[i].y = bullets[i].y - 4
				bullets[i].x = bullets[i].x + 4
			}
			if(bullets[i].direction == 6) {
				bullets[i].y = bullets[i].y - 4
				bullets[i].x = bullets[i].x - 4
			}
			if(bullets[i].direction == 7) {
				bullets[i].y = bullets[i].y + 4
				bullets[i].x = bullets[i].x - 4
			}
			if(bullets[i].direction == 8) {
				bullets[i].y = bullets[i].y + 4
				bullets[i].x = bullets[i].x + 4
			}
			bullets[i].path = bullets[i].path + 1;

			// shot end
			if(bullets[i].path >= hero.range) {
				//shooting = false;
				bullets.splice($.inArray(bullets[i], bullets),1);
			}
		}
	}
};
var modifyIndicators = function (action) {
	if(action.indexOf('range')!=-1) {
		$('#indicators .'+action+' .pin').css({
			'background-position': (hero.range-hero.minrange)*100/(hero.maxrange-hero.minrange)+'% 50%'
		});
	} else if(action.indexOf('speed')!=-1) {
		$('#indicators .'+action+' .pin').css({
			'background-position': (hero.speed-hero.minspeed)*100/(hero.maxspeed-hero.minspeed)+'% 50%'
		});
	} else if(action.indexOf('bsize')!=-1) {
		$('#indicators .'+action+' .pin').css({
			'background-position': (bullet.size-bullet.minsize)*100/(bullet.maxsize-bullet.minsize)+'% 50%'
		});
	} else if(action.indexOf('size')!=-1) {
		$('#indicators .'+action+' .pin').css({
			'background-position': 100-(hero.size-hero.minsize)*100/(hero.maxsize-hero.minsize)+'% 50%'
		});
	} else if(action.indexOf('firerate')!=-1) {
		$('#indicators .'+action+' .pin').css({
			'background-position': 100-(hero.firerate-hero.minfirerate)*100/(hero.maxfirerate-hero.minfirerate)+'% 50%'
		});
	}
	animateTada(action);
}
var animateTada = function(action) {
		$('#indicators .'+action+' .tit').addClass('animated tada');
		setTimeout(function(){
			$('#indicators .'+action+' .tit').removeClass('animated tada');
		}, 1000);
}
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0,canvas.width,canvas.width);
	}
	if(bulletReady) {
		for (var i = bullets.length - 1; i >= 0; i--) {
			ctx.drawImage(bulletImage, bullets[i].x, bullets[i].y, bullet.size, bullet.size);
		}
	}
	if (barrReady) {
		ctx.drawImage(barrImage, barricate.x, barricate.y, barricate.width, barricate.height);
	}
	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y, hero.size, hero.size);
	}
	if (PowerUpReady) {
		ctx.drawImage(PowerUpImage, powerUp.x, powerUp.y, 30, 30);
	}
	if (PowerDownReady) {
		ctx.drawImage(PowerDownImage, powerDown.x, powerDown.y, 30, 30);
	}
	if (monsterReady) {
		for (var i = monsters.length - 1; i >= 0; i--) {
			ctx.drawImage(monsterImage, monsters[i].x, monsters[i].y, 30, 30);
		}
	}
	ctx.globalAlpha = 0.8;
	// Score
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "15px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	//ctx.fillText("Kills: " + kills+" Level: "+level, 10, 10);
	ctx.fillText("Lives: "+hero.lives+" Level: "+level, 10, 10);
};
// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
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