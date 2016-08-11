// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = $(window).width() >= 500 ? 500 : $(window).width();
canvas.width = canvasWidth;
canvas.height = canvasWidth;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "./background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "./hero.png";

// Bullet image
var bulletReady = false;
var bulletImage = new Image();
bulletImage.onload = function () {
	bulletReady = true;
};
bulletImage.src = "./bullet.gif";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "./monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {
	speed: 25 //
};
var monsters = [];
monsters.push(monster);
var kills = 0;
var shooting = false;
var bullet = {};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	shooting =false;
	hero.x = canvas.width / 2 -16;
	hero.y = canvas.height / 2 -16;
	monster.speed = 25;
	bullet.x = 2000;
	bullet.y = 2000;
	bullet.path = 0;
	kills = 0;
	goMonster();
};

var newMonster = function () {
	monster.speed += 10;
	goMonster();

};
var goMonster = function() {
	var direction = Math.floor(Math.random()*(4))
	//console.log(direction);
	//from north
	if(direction == 0) {
			monster.x = Math.random()*(canvas.width+33)+32;
			monster.y = -32;
	}
	else if(direction == 1) {
			monster.x = Math.random()*(canvas.width+33)+32;
			monster.y = canvas.width;
	}
	else if(direction == 2) {
			monster.x = -32;
			monster.y = Math.random()*(canvas.width+33)+32;
	}
	else if(direction == 3) {
			monster.x = canvas.width;
			monster.y = Math.random()*(canvas.width+33)+32;
	}
}
var update = function (modifier) {
	if (87 in keysDown) { // Player holding up
		if(hero.y > 0)
		hero.y -= hero.speed * modifier;
	}
	if (83 in keysDown) { // Player holding down
		if(canvas.width > hero.y + 37)
		hero.y += hero.speed * modifier;
	}
	if (65 in keysDown) { // Player holding left
		if(hero.x > 0)
		hero.x -= hero.speed * modifier;
	}
	if (68 in keysDown) { // Player holding right
		if(canvas.width > hero.x + 37)
		hero.x += hero.speed * modifier;
	}
	//shooting
	if (37 in keysDown && !shooting ) { // Shooting left
		bullet.x = hero.x - 32;
		bullet.y = hero.y;
		bullet.direction = 0;
		shooting = true;
	}
	if (39 in keysDown && !shooting ) { // Shooting right
		bullet.x = hero.x + 32;
		bullet.y = hero.y;
		bullet.direction = 1;
		shooting = true;
	}
	if (38 in keysDown && !shooting ) { // Shooting up
		bullet.x = hero.x;
		bullet.y = hero.y -32;
		bullet.direction = 2;
		shooting = true;
	}
	if (40 in keysDown && !shooting ) { // Shooting down
		bullet.x = hero.x;
		bullet.y = hero.y +32;
		bullet.direction = 3;
		shooting = true;
	}



	for (var i = monsters.length - 1; i >= 0; i--) {
		// Are you dead?
		if (
			hero.x <= (monsters[i].x + 32)
			&& monsters[i].x <= (hero.x + 32)
			&& hero.y <= (monsters[i].y + 32)
			&& monsters[i].y <= (hero.y + 32)
		) {
			reset();
		}
		// Are you hitting?
		if (
			bullet.x <= (monsters[i].x + 32)
			&& monsters[i].x <= (bullet.x + 32)
			&& bullet.y <= (monsters[i].y + 32)
			&& monsters[i].y <= (bullet.y + 32)
		) {
			++kills;
			newMonster();
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
	};

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
		bullet.path = bullet.path +1;
	}

};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0,canvas.width,canvas.width);
	}
	if(shooting && bulletReady) {
		ctx.drawImage(bulletImage, bullet.x, bullet.y);
		if(bullet.path >= 20) {
			shooting = false;
			bullet.path = 0;
		}
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + kills, 32, 32);
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
