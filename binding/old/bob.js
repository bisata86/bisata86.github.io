var isMobile = detectmob();


$( document ).ready(function() {
    if(isMobile)$('#debug').html('');
    $('#canvasContainer').append(canvas);
    if(isMobile) $('#canvasContainer canvas').css({
    	width: '100%'
    });
});


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = 500;
//var canvasWidth = isMobile ? $(window).width() : 500;
canvas.width = canvasWidth;
canvas.height = canvasWidth;
//document.body.appendChild(canvas);
var mah = $(window).width();
var powerUpInterval;
var powerDownInterval;
//joysticks
if(isMobile) {
	console.log()
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
	});
}

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
	range: 10,
	size: 32

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
	speed: 25 //
};
var monsters = [];
monsters.push(monster);
var kills = 0;
var level = 1;
var shooting = false;
var bullets = [];
var bullet = {
	size: 10,
};


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
	shooting =false;
	hero.size = 50;
	hero.x = canvas.width / 2 - hero.size/2;
	hero.y = canvas.height / 2 - hero.size/2;
	hero.range = 10;
	for (var i = monsters.length - 1; i >= 0; i--) {
		monsters[i].speed = 25;
	}
	bullet.x = 2000;
	bullet.y = 2000;
	bullet.path = 0;
	bullet.size = 20;
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
var update = function (modifier) {
	if(!isMobile && !(37 in keysDown) && !(38 in keysDown) && !(39 in keysDown) && !(40 in keysDown))
	heroImage.src = "./hero.png";
	//move hero

	function moveRight() {
		if(canvas.width > hero.x + hero.size)
		hero.x += hero.speed * modifier;
	}
	function moveLeft() {
		if(hero.x > 0)
		hero.x -= hero.speed * modifier;
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
		powerUp.x=2000;
		powerUp.y=2000;
		var upgrade = Math.floor(Math.random()*(4));
		//upgrade = 2;
		if(upgrade==0) {
			if(hero.range <= 200) hero.range += 10;
			$('#debug').html('<div>range ++</div>');
		}
		if(upgrade==1) {
			hero.speed += 10;
			$('#debug').html('<div>speed ++</div>');
		}
		if(upgrade==2) {
			bullet.size += 10;
			$('#debug').html('<div>bullets ++</div>');
		}
		if(upgrade==3) {
			if(hero.size >= 15) 	hero.size -= 10;
			$('#debug').html('<div>size --</div>');
		}
		//setTimeout(function(){ setPowerUP(); }, 1000);
		clearInterval(powerUpInterval);
		powerUpInterval = setInterval(function(){ setPowerUP();  }, 30000);

	}
	// get powerdown
	if (
		hero.x <= (powerDown.x + 32)
		&& powerDown.x <= (hero.x + hero.size)
		&& hero.y <= (powerDown.y + 32)
		&& powerDown.y <= (hero.y + hero.size)
		) {
		powerDown.x=2000;
		powerDown.y=2000;
		var upgrade = Math.floor(Math.random()*(4));
		//upgrade = 2;

		if(upgrade==0) {
			if(hero.range >= 15) hero.range -= 10;
			$('#debug').html('<div>range --</div>');
		}
		if(upgrade==1) {
			if(hero.speed >= 15)hero.speed -= 10;
			$('#debug').html('<div>speed --</div>');
		}
		if(upgrade==2) {
			if(bullet.size >= 15) {
				bullet.size -= 10;
			}
			$('#debug').html('<div>bullets --</div>');
		}
		if(upgrade==3) {
				hero.size += 10;
			$('#debug').html('<div>size ++</div>');
		}
		var oldN = randomN;
		randomN = Math.floor(Math.random()*(100));
		setPowerD();
		var currentX = powerDown.x;
		clearInterval(powerDownInterval);
		powerDownInterval = setInterval(function(){
			setPowerD()
		}, 10000);
	}

	function shotUp() {
		bullet.x = hero.x + (hero.size/2) - (bullet.size/2);
		bullet.y = hero.y - bullet.size;
		bullet.direction = 2;
		shooting = true;
		heroImage.src = "./herou.png";
	}
	function shotRight() {
		bullet.x = hero.x  + hero.size;
		bullet.y = hero.y + (hero.size/2) - (bullet.size/2);
		bullet.direction = 1;
		shooting = true;
		heroImage.src = "./heror.png";
	}
	function shotLeft() {
		bullet.x = hero.x - bullet.size;
		bullet.y = hero.y + (hero.size/2) - (bullet.size/2);
		bullet.direction = 0;
		shooting = true;
		heroImage.src = "./herol.png";
	}
	function shotDown() {
		bullet.x = hero.x + (hero.size/2) - (bullet.size/2);
		bullet.y = hero.y + hero.size;
		bullet.direction = 3;
		shooting = true;
		heroImage.src = "./herod.png";
	}
	function shotUpRight() {
		bullet.x = hero.x + hero.size;
		bullet.y = hero.y - bullet.size;
		bullet.direction = 5;
		shooting = true;
		heroImage.src = "./herour.png";
	}
	function shotUpLeft() {
		bullet.x = hero.x - bullet.size;
		bullet.y = hero.y - bullet.size;
		bullet.direction = 6;
		shooting = true;
		heroImage.src = "./heroul.png";
	}
	function shotBottomRight() {
		bullet.x = hero.x  + hero.size;
		bullet.y = hero.y  + hero.size;
		bullet.direction = 8;
		shooting = true;
		heroImage.src = "./herodr.png";
	}
	function shotBottomLeft() {
		bullet.x = hero.x  - bullet.size;
		bullet.y = hero.y  + hero.size;
		bullet.direction = 7;
		shooting = true;
		heroImage.src = "./herodl.png";
	}

	//shooting
	if(!shooting) {
		if(isMobile) {
			if( joystick2.right() && joystick2.up() ){
				if(!shooting) {
					shotUpRight();
				}
			}
			if( joystick2.left() && joystick2.up() ){
				if(!shooting) {
					shotUpLeft();
				}
			}
			if( joystick2.down() && joystick2.right() ){
				if(!shooting) {
					shotBottomRight();
				}
			}
			if( joystick2.down() && joystick2.left() ){
				if(!shooting) {
					shotBottomLeft();
				}
			}
	     	if( joystick2.right() ){
				if(!shooting) {
					shotRight();
				}
	        }
	        if( joystick2.left() ){
	            if(!shooting) {
					shotLeft();
				}
	        }
	        if( joystick2.up() ){
	            if(!shooting) {
					shotUp();
				}
	        }
	        if( joystick2.down() ){
	        	if(!shooting) {
					shotDown();
				}
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
			$('#debug').html('Lose at level: '+level);

			reset();
			break;
		}
		// Are you hitting?
		if (
			bullet.x <= (monsters[i].x + 32)
			&& monsters[i].x <= (bullet.x + bullet.size)
			&& bullet.y <= (monsters[i].y + 32)
			&& monsters[i].y <= (bullet.y + bullet.size)
		) {
			++kills;
			var globalSpeed = monsters[0].speed + 25;
			monsters.splice(i, 1);
			shooting = false;
			bullet.path = 2000;

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
		//move monster

		// if(monsters[i].x <= hero.x) {
		// 	//console.log('uno')
		// 	monsters[i].x += monsters[i].speed * modifier;
		// }
		// else if(monsters[i].x > hero.x) {
		// 	//console.log('due')
		// 	monsters[i].x -= monsters[i].speed * modifier;
		// }

		// if(monsters[i].y <= hero.y) {
		// 	//console.log('tre')
		// 	monsters[i].y += monsters[i].speed * modifier;
		// }
		// else if(monsters[i].y > hero.y) {
		// 	//console.log('quattro')
		// 	monsters[i].y -= monsters[i].speed * modifier;
		// }
		  monsters[i].x = 100;
		  monsters[i].y = 100;

	};

	// shot move
	if(shooting) {
		//shot left
		if(bullet.direction == 0) {
			bullet.x = bullet.x - 5
		}
		//shot right
		if(bullet.direction == 1) {
			bullet.x = bullet.x + 5
		}
		//shot up
		if(bullet.direction == 2) {
			bullet.y = bullet.y - 5
		}
		//shot down
		if(bullet.direction == 3) {
			bullet.y = bullet.y + 5
		}
		if(bullet.direction == 5) {
			bullet.y = bullet.y - 4
			bullet.x = bullet.x + 4
		}
		if(bullet.direction == 6) {
			bullet.y = bullet.y - 4
			bullet.x = bullet.x - 4
		}
		if(bullet.direction == 7) {
			bullet.y = bullet.y + 4
			bullet.x = bullet.x - 4
		}
		if(bullet.direction == 8) {
			bullet.y = bullet.y + 4
			bullet.x = bullet.x + 4
		}
		bullet.path = bullet.path + 1;
	}

	// shot end
	if(bullet.path >= hero.range) {
		shooting = false;
		bullet.path = 0;
		bullet.x = 2000;
		bullet.y = 2000;
	}
	// shot out of bounds (not complete.)
	// if(bullet.x >= canvas.width) {
	// 	console.log(bullet.x,bullet.y)
	// 	shooting = false;
	// 	bullet.path = 0;
	// 	bullet.x = 2000;
	// 	bullet.y = 2000;
	// }

};
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0,canvas.width,canvas.width);
	}
	if(shooting && bulletReady) {
		ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.size, bullet.size);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y, hero.size, hero.size);
	}
	if (PowerUpReady) {
		ctx.drawImage(PowerUpImage, powerUp.x, powerUp.y);
	}
	if (PowerDownReady) {
		ctx.drawImage(PowerDownImage, powerDown.x, powerDown.y);
	}
	if (monsterReady) {

	for (var i = monsters.length - 1; i >= 0; i--) {
		ctx.drawImage(monsterImage, monsters[i].x, monsters[i].y);
	}


	}
ctx.globalAlpha = 0.8;
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Kills: " + kills+" Level: "+level, 10, 10);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
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
