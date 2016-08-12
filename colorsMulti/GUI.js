//var socket = io.connect('http://192.168.1.5:3000');
var socket = io.connect('//skeletrons.herokuapp.com:443');

var Game = {
	'play' : false
}

function GUI(){
	var _this 	   = this;
	var rowTiles   = 0;
	var clickType;
    var timerInterval;
    var sameColor = 0;

	function elementPos(x,y) {
        var pass = rowTiles*(rowTiles-1-y)+x;
        return pass;
    }

    function notificate(text) {
        $('body').addClass('pauseGrid');
        $('.clickcounter').html(text);
        $('.clickcounter').show();
        setTimeout(function() {
             $('.clickcounter').fadeOut();
        }, 900);
        setTimeout(function() {
             $('body').removeClass('pauseGrid');
        }, 1300);

    }

    function detectmob() {
    	$('body').addClass('noFb');
    	if ($(window).width() > $(window).height()) {
	        $('body').addClass('landscape');
	        $('body').removeClass('portrait');
	    }else {
	        $('body').removeClass('landscape');
	        $('body').addClass('portrait');
	    }
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		){
			$('body').addClass('mobile');
        	clickType = 'touchstart';
		}else {
			$('body').addClass('desktop');
        	clickType = 'click';
		}
    }

    function colorClick(){
    	if(Game.play == true){
	        var colorT = $(this).attr('id');
            if($(this).hasClass('mine')) sameColor++;
            else sameColor = 0;
            if(sameColor <= 3) {
    	        socket.emit('player_move', {'color': colorT});
    	        Game.play = false;
                $('.power.mine').removeClass('mine');
                $(this).addClass('mine');
            } else {
                notificate('Bastard!');
            }
        }else{
        	//alert('no');
        	notificate('Not your turn!');
        }
    }

    function gridSwipeRight(){
        if(Game.play == true){
                socket.emit('player_swipe', {'direction': 'right'});
                Game.play = false;
        }else{
            notificate('Not your turn!');
        }
    }

    function gridSwipeLeft(){
        if(Game.play == true){
                socket.emit('player_swipe', {'direction': 'left'});
                Game.play = false;
        }else{
            notificate('Not your turn!');
        }
    }

    function gridSwipeUp(){
        if(Game.play == true){
                socket.emit('player_swipe', {'direction': 'up'});
                Game.play = false;
        }else{
            notificate('Not your turn!');
        }
    }

    function gridSwipeDown(){
        if(Game.play == true){
                socket.emit('player_swipe', {'direction': 'down'});
                Game.play = false;
        }else{
            notificate('Not your turn!');
        }
    }


    function createGame(){
    	socket.emit('create_game', {});
    }
    function showJoinGame(){
  		$('#game_intro').hide();
		$('#game_join').show();
		setTimeout(function(){ $('#join_id').focus(); }, 500);

    }
    function toHome() {
        $('#game_intro').show();
        $('#mp_home').show();
        $('#game_id').hide();
        $('#game_join').hide();
        $('#waiting').hide();
    }

    function joinGame(){
    	var _gid = $('#join_id').val();
    	socket.emit('join_game', {'gid':_gid});
    }
    function joinRandomGame(){
    	$('#mp_home').hide();
    	$('#waiting').show();
    	socket.emit('player_join', {});
    }

    this.showJoinErr = function(data){
    	$('#game_join .error').html(data.err);
    }

    this.showGameID = function(data){
  		$('#game_intro').hide();
		$('#game_id').show()
		$('#game_id .code').html(data.gid);
    }

    this.startTimer= function() {
        var donecounter = 15;
        $('#timer').removeClass('alert pulse');
        $('#timer').html(donecounter);
        timerInterval = setInterval(function() {
            donecounter--;
            $('#timer').show();
            $('#timer').html(donecounter);
            if(donecounter==5) $('#timer').addClass('alert pulse');
            if(donecounter == 0) {
                clearInterval(timerInterval);
                var randomcolor = Math.floor((Math.random() * 3) + 1);
                var pow = $('.power:not(.disabled):not(.mine)').eq(randomcolor);
                if(Game.play==true) {
                    pow.trigger(clickType);
                }
            }
        }, 1000);
    }

    this.clearTimer= function() {
        clearInterval(timerInterval);
    }

    this.notificate= function(text) {
        notificate(text);
    }

	this.updateGrid = function(who,emitfor,P1tiles,P2tiles){
		detectmob();
        var playerToUpdate;
        var otherPLayer;
        if(emitfor=='p1') playerToUpdate = P1tiles;
        if(emitfor=='p2') playerToUpdate = P2tiles;
        if(playerToUpdate == P1tiles) otherPLayer = P2tiles;
        if(playerToUpdate == P2tiles) otherPLayer = P1tiles;
            if(emitfor==who) {
                    $('body').removeClass('myturn')
                    $( ".pixel" ).removeClass('pulse');
                for(var ki = 0; ki < playerToUpdate.length; ki++) {
                   var currpos = elementPos(playerToUpdate[ki][1],playerToUpdate[ki][2]);
                   var optimize = $( ".pixel:eq("+currpos+")" );
                   if(optimize.attr('class').indexOf(playerToUpdate[ki][0])!=-1)
                   optimize.addClass('black')
                }
                for(var ki = 0; ki < otherPLayer.length; ki++) {
                       var currpos = elementPos(otherPLayer[ki][1],otherPLayer[ki][2]);
                       var optimize = $( ".pixel:eq("+currpos+")" );
                       optimize.attr('class', 'pixel pulse '+otherPLayer[ki][0]);
                }
                setTimeout(function() {
                for(var ki = 0; ki < playerToUpdate.length; ki++) {
                       var currpos = elementPos(playerToUpdate[ki][1],playerToUpdate[ki][2]);
                       var optimize = $( ".pixel:eq("+currpos+")" );
                       optimize.attr('class', 'pixel '+playerToUpdate[ki][0]);
                }
                 }, 300);

            } else {
                $('body').addClass('myturn')
                $( ".pixel" ).removeClass('pulse');
                for(var ki = 0; ki < playerToUpdate.length; ki++) {
                       var currpos = elementPos(playerToUpdate[ki][1],playerToUpdate[ki][2]);
                       var optimize = $( ".pixel:eq("+currpos+")" );
                       if(optimize.attr('class').indexOf(playerToUpdate[ki][0])!=-1)
                       optimize.addClass('black')
                }
                for(var ki = 0; ki < otherPLayer.length; ki++) {
                       var currpos = elementPos(otherPLayer[ki][1],otherPLayer[ki][2]);
                       var optimize = $( ".pixel:eq("+currpos+")" );
                       optimize.attr('class', 'pixel pulse '+otherPLayer[ki][0]);
                }
                setTimeout(function() {
            for(var ki = 0; ki < playerToUpdate.length; ki++) {
                       var currpos = elementPos(playerToUpdate[ki][1],playerToUpdate[ki][2]);
                       var optimize = $( ".pixel:eq("+currpos+")" );
                       optimize.attr('class', 'pixel '+playerToUpdate[ki][0]);
                }
                   }, 300);
            }
	}

	this.updateInfo = function(_infos1,_infos2) {
		$('.indicator').toggleClass('p1');
		$('#P1Counter').html(_infos1.length);
		$('#P2Counter').html(_infos2.length);
	}

    this.shiftGrid = function(who,emitfor,P1tiles,P2tiles,grid,direction,freeCells,randomcells){
        //$( ".pixel" ).removeClass('spin');
        var playerToUpdate;
        var otherPLayer;
        if(emitfor=='p1') playerToUpdate = P1tiles;
        if(emitfor=='p2') playerToUpdate = P2tiles;
        if(playerToUpdate == P1tiles) otherPLayer = P2tiles;
        if(playerToUpdate == P2tiles) otherPLayer = P1tiles;
         var linearizeGrid = [];
        for(var ki = 0; ki < rowTiles; ki++) {
            for(var k = 0; k < rowTiles; k++) {
                linearizeGrid.push(grid[ki][k])
            }
        }
        //console.log(randomcells)


        for(var ki = 0; ki < freeCells.length; ki++) {
               var currpos = elementPos(freeCells[ki][1],freeCells[ki][2]);
               var optimize = $( ".pixel:eq("+currpos+")" );
               optimize.addClass(direction);
        }

        setTimeout(function() {
         $( ".pixel" ).removeClass('pulse');
         $( ".pixel" ).removeClass(direction);
        for(var ki = 0; ki < linearizeGrid.length; ki++) {
               var currpos = elementPos(linearizeGrid[ki][1],linearizeGrid[ki][2]);
               var optimize = $( ".pixel:eq("+currpos+")" );
               optimize.attr('class', 'pixel rapid '+linearizeGrid[ki][0]);
        }
        // for(var ki = 0; ki < randomcells.length; ki++) {
        //        var currpos = elementPos(randomcells[ki][1],randomcells[ki][2]);
        //        var optimize = $( ".pixel:eq("+currpos+")" );
        //        optimize.attr('class', 'pixel spin '+randomcells[ki][0]);
        // }
        },400);

        setTimeout(function() {
        $( ".pixel" ).removeClass('rapid');
        if(emitfor==who) {
            for(var ki = 0; ki < otherPLayer.length; ki++) {
                   var currpos = elementPos(otherPLayer[ki][1],otherPLayer[ki][2]);
                   var optimize = $( ".pixel:eq("+currpos+")" );
                   optimize.addClass('pulse');
            }
        } else {
            for(var ki = 0; ki < otherPLayer.length; ki++) {
                   var currpos = elementPos(otherPLayer[ki][1],otherPLayer[ki][2]);
                   var optimize = $( ".pixel:eq("+currpos+")" );
                   optimize.addClass('pulse');
            }
        }
        },500);




    }

	this.drawGrid = function(_data){
        $('body').removeClass('pauseGrid');
        $('.clickcounter').hide();
		$('.indicator').toggleClass('p1');
		var _grid = _data.grid;
		rowTiles = _data.rows;
		$('#grid').html('');
		$('#mp_home').hide();
		$('#waiting').hide();
		$('body').addClass('gaming');
		var pixelDimension = 100/rowTiles+'%';
	    var basestructure = "<div class='pixel'></div>";
	    var structure = "";

	    for(var ki=0; ki < rowTiles; ki++) {
	        for(var k=0; k < rowTiles; k++) {
	            structure = structure + basestructure;
	        }
	    }
	    $('#grid').append(structure);
        setTimeout(function() {
        for(var ki = 0; ki < rowTiles; ki++) {
            for(var k = 0; k < rowTiles; k++) {
                var optimize = $( ".pixel:eq("+elementPos(ki,k)+")" );
                optimize.attr('class', 'pixel '+_grid[ki][k][0]);

            }
        }
        }, 400);

        $(".pixel:eq(0)" ).attr('class', 'pixel player1');
        $(".pixel:eq("+((rowTiles*rowTiles)-1)+")" ).attr('class', 'pixel player2');
        $(".pixel" ).each(function( index ) {
              $(this).css({
                height: pixelDimension,
                width: pixelDimension
              });
        });
        if(_data.who != undefined){
            if(_data.who == 'p1') {
                setTimeout(function(){ notificate('Player 1') }, 600);
                $('#P1Name').html('YOU: ');
                $('#P2Name').html('ADV: ');

            }
            else {
                setTimeout(function(){ notificate('Player 2') }, 600);
                $('#P2Name').html('YOU: ');
                $('#P1Name').html('ADV: ');

            }
        }
        setTimeout(function(){ detectmob() }, 500);
	}

    this.updateCircles = function(color,who,whofor){
        if(who!=whofor) {
            $('.power.disabled').removeClass('disabled');
            $('#'+color).addClass('disabled');
        }
    }

	this.gameOver = function(winner){
		if(winner.result==1) $('.clickcounter').html('HAI VINTO<br/>');
		if(winner.result==0) $('.clickcounter').html('HAI PERSO<br/>');
        $('.clickcounter').append(winner.totalP1+' - '+winner.totalP2)
        $('.clickcounter').show();
        $('body').addClass('pauseGrid');
		$('.indicator').toggleClass('p1');
        $('.power.disabled').removeClass('disabled');
         $('.power.mine').removeClass('mine');
        $('#P1Counter').html('1');
        $('#P2Counter').html('1');
        clearInterval(timerInterval);
	}

	this.init = function(){
		detectmob();
        $(".power").on(clickType, colorClick);
        $("#grid").on('swiperight', gridSwipeRight);
        $("#grid").on('swipeleft', gridSwipeLeft);
        $("#grid").on('swipeup', gridSwipeUp);
        $("#grid").on('swipedown', gridSwipeDown);
        $("#create_game").on(clickType, createGame);
        $("#join_game").on(clickType,  showJoinGame);
        $("#join_random").on(clickType,joinRandomGame);
        $("#submit_join").on(clickType,  joinGame);
        $(".back").on(clickType,  toHome);
        drawCanvas();
	}

    function drawCanvas() {
        var c = document.createElement('canvas'),
        canvas = c.getContext('2d'),
        w = c.width = window.innerWidth,
        h = c.height = window.innerHeight/2,
        d, l,
        t = 0;

        document.getElementById('game_intro').appendChild(c);

        function draw() {
          var z = 15 - Math.sin(t) * 15 - Math.cos(t);
          canvas.fillStyle = 'rgba(206, 206, 206, 0)';
          canvas.fillRect(0, 0, w, h);
          for (var i = 0; i < l; i++) {
            var r = ((i * d / 3) / l) * Math.sin((z * 100) + i),
                x = Math.sin(i) * r + (w / 2),
                y = Math.cos(i) * r + (h / 2);
            canvas.beginPath();
            canvas.fillStyle = 'rgba(0, 0, 0, 1)';
            canvas.fillRect(x, y, 1, 1);
          }
          t += 0.00001;
        }
        function reset() {
          w = c.width = window.innerWidth;
          h = c.height = window.innerHeight/2;
          d = Math.min(w, h) - 50;
          l = Math.round(d / 10);
        }
        function loop() {
          requestAnimationFrame(loop);
          draw();
        }
        window.addEventListener('resize', reset);
        reset();
        loop();
    }
}

function init(){
	var gui = new GUI();
		gui.init();

	socket.on('game-start', gui.drawGrid);
   	socket.on('grid-update', function(data){
		gui.updateGrid(data.who,data.emitfor,data.P1tiles,data.P2tiles);
		gui.updateInfo(data.P1tiles,data.P2tiles);
        gui.updateCircles(data.color,data.who,data.emitfor)
		Game.play = false;
        gui.clearTimer();
        gui.startTimer();
    });
    socket.on('grid-shift', function(data){
        gui.shiftGrid(data.who,data.emitfor,data.P1tiles,data.P2tiles,data.grid,data.direction,data.freeCells,data.randomCells);
        gui.updateInfo(data.P1tiles,data.P2tiles);
        Game.play = false;
        gui.clearTimer();
        gui.startTimer();
    });
  	socket.on('game-turn', function(data){
		Game.play = true;
    });
    socket.on('player-disconnected', function(event) {
        $('body').addClass('pauseGrid');
        $('.clickcounter').html('Connection Error');
        $('.clickcounter').show();
        setTimeout(function(){ location.reload(); }, 2000);
        /* Act on the event */
    });
  	socket.on('join-err', gui.showJoinErr);
  	socket.on('game-pending',gui.showGameID);
   	socket.on('game-over', function(data){
		gui.gameOver(data);
    });



    }

$(document).ready(init);


