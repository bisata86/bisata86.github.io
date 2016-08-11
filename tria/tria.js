
$(function() {
    $('body').append('<div id="container"></div>');
    $('body').append('<input type="button" value="reset" id="reset"></input>');
    $("body").append('<input type="button" value="OK" class="fake"></input>');
    $('body').append('<div class="playerCont1"></div>');
    $('body').append('<div class="playerCont2"></div>');
    $('.playerCont1').append('<textarea placeholder="Giocatore 1"></textarea>').append('<div class="score">0</div>');
    $('.playerCont2').append('<textarea placeholder="Giocatore 2"></textarea>').append('<div class="score">0</div>');
    $('#container').append('<div id="mainGrid"></div>');
    for (var i = 8; i >= 0; i--) {
    	$('#mainGrid').append('<div class="casella"></div>');
    };
    $('#mainGrid').append('<div id="topArrow"></div>');
    $('#mainGrid').append('<div id="bottomArrow"></div>');
    $('#mainGrid').append('<div id="rightArrow"></div>');
    $('#mainGrid').append('<div id="leftArrow"></div>');
    var mainStructure = { };
    var players = {};
    var myint;
    players.p1 = {name: '', score:0 };
    players.p2 = {name: 'Ai', score:0 };
    var turno = true;
    mainStructure.up = {sx: 0, cn:0, dx : 0 };
    mainStructure.cn = {sx: 0, cn:0, dx : 0 };
    mainStructure.dw = {sx: 0, cn:0, dx : 0 };
    draw();
    $( "body" ).on( 'click', '#mainGrid', function(e) {

    	var giocatore;
    	turno ? giocatore=1 : giocatore=2;
    	var elm = $(this);
	    var xPos = e.pageX - elm.offset().left;
	    var yPos = e.pageY - elm.offset().top;
	    var gap = 5;
	    var dir1, dir2, dir3;
	    var traslare = false;
	    if(xPos <= parseInt(elm.width()/3)-gap) {
    		dir1 = 'sx';
    	}
    	else if(xPos > parseInt(elm.width()*2/3)+gap) {
    		dir1 = 'dx';
    	}
    	else if(xPos > parseInt(elm.width()/3)+gap && xPos <= parseInt(elm.width()*2/3)-gap ) {
    		dir1 = 'cn';
    	}
    	else {
    		dir1 = 'null';
    	}
		if(yPos <= 0) {
			traslare = true;
    		dir3 = 'up'
    	}
    	else if(yPos >= elm.width()) {
    		traslare = true;
    		dir3 = 'dw'
    	}
		if(yPos <= parseInt(elm.width()/3)-gap) {
			dir2 = 'su';
		}
		else if(yPos > parseInt(elm.width()*2/3)+gap) {
    		dir2 = 'gi';
    	}
		else if(yPos > parseInt(elm.width()/3)+gap && yPos <= parseInt(elm.width()*2/3)-gap ){
			dir2 = 'cn';
		}
		else {
			dir2 = 'null';
		}
		if(xPos <= 0) {
			traslare = true;
    		dir3 = 'sx'
    	}
    	else if(xPos >= elm.width()) {
    		traslare = true;
    		dir3 = 'dx'
    	}
    	if(traslare) {
    		trasla(dir1,dir2,dir3,elm.width()/3);
    		$('#mainGrid').addClass('inactive');

    	}
		else if(dir1 != 'null' && dir2 != 'null') {
			$('#mainGrid').addClass('inactive');
			faiMossa(dir1,dir2,giocatore);

		}
    });
	$( "body" ).on( 'blur', '.playerCont1 textarea', function(e) {
		$(".playerCont1").removeClass('onlyme');
		$("body").removeClass('onlyone');
		$(".playerCont2").show();
		$(".playerCont1 .score").show();
		$(".fake").hide();
		players.p1.name = $(this).val();
	});
	$( "body" ).on( 'focus', '.playerCont1 textarea', function(e) {
		$(".playerCont1").addClass('onlyme');
		$("body").addClass('onlyone');
		$(".playerCont2").hide();
		$(".playerCont1 .score").hide();
		$(".fake").show();
	});
	$( "body" ).on( 'click', '#reset', function() {
		turno = true;
	    mainStructure.up = {sx: 0, cn:0, dx : 0 };
	    mainStructure.cn = {sx: 0, cn:0, dx : 0 };
	    mainStructure.dw = {sx: 0, cn:0, dx : 0 };
    	players.p1.score=0;
    	players.p2.score=0;
    	draw();
	});
	function trasla(dir,dir2,dir3,dim) {
		$('#mainGrid').addClass('inactive');
		console.log('tralsa')
		turno = !turno;
    	if(dir3=='up' && dir=='cn') {
	    	$('.casella').filter(':eq(1), :eq(4), :eq(7)').css({
	    		transform: 'translate(0px,-'+dim+'px)',
	    		'webkit-transform': 'translate(0px,-'+dim+'px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('vert');
	    	$('.casella').eq(7).addClass('forcebottom');
	    	$('.casella').eq(1).addClass('disappear');
	    	$('.casella').eq(4).addClass('disappearbottom')
	    	mainStructure.up.cn = mainStructure.cn.cn;
	    	mainStructure.cn.cn = mainStructure.dw.cn;
	    	mainStructure.dw.cn = 0;
    	}
    	else if(dir3=='up' && dir=='dx') {
	    	$('.casella').filter(':eq(2), :eq(5), :eq(8)').css({
	    		transform: 'translate(0px,-'+dim+'px)',
	    		'webkit-transform': 'translate(0px,-'+dim+'px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('vert');
	    	$('.casella').eq(8).addClass('forcebottom');
	    	$('.casella').eq(2).addClass('disappear');
	    	$('.casella').eq(5).addClass('disappearbottom')
	    	mainStructure.up.dx = mainStructure.cn.dx;
	    	mainStructure.cn.dx = mainStructure.dw.dx;
	    	mainStructure.dw.dx = 0;
    	}
    	else if(dir3=='up' && dir=='sx') {
	    	$('.casella').filter(':eq(0), :eq(3), :eq(6)').css({
	    		transform: 'translate(0px,-'+dim+'px)',
	    		'webkit-transform': 'translate(0px,-'+dim+'px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('vert');
	    	$('.casella').eq(6).addClass('forcebottom');
	    	$('.casella').eq(0).addClass('disappear');
	    	$('.casella').eq(3).addClass('disappearbottom')
	    	mainStructure.up.sx = mainStructure.cn.sx;
	    	mainStructure.cn.sx = mainStructure.dw.sx;
	    	mainStructure.dw.sx = 0;
    	}
    	else if(dir3=='dw' && dir=='cn') {
	    	$('.casella').filter(':eq(1), :eq(4), :eq(7)').css({
	    		transform: 'translate(0px,'+dim+'px)',
	    		'webkit-transform': 'translate(0px,'+dim+'px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('vert');
	    	$('.casella').eq(1).addClass('forcetop');
	    	$('.casella').eq(7).addClass('disappear');
	    	$('.casella').eq(4).addClass('disappeartop')
	    	mainStructure.dw.cn = mainStructure.cn.cn;
	    	mainStructure.cn.cn = mainStructure.up.cn;
	    	mainStructure.up.cn = 0;
    	}
    	else if(dir3=='dw' && dir=='sx') {
	    	$('.casella').filter(':eq(0), :eq(3), :eq(6)').css({
	    		transform: 'translate(0px,'+dim+'px)',
	    		'webkit-transform': 'translate(0px,'+dim+'px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('vert');
	    	$('.casella').eq(0).addClass('forcetop');
	    	$('.casella').eq(6).addClass('disappear');
	    	$('.casella').eq(3).addClass('disappeartop')
	    	mainStructure.dw.sx = mainStructure.cn.sx;
	    	mainStructure.cn.sx = mainStructure.up.sx;
	    	mainStructure.up.sx = 0;
    	}
    	else if(dir3=='dw' && dir=='dx') {
	    	$('.casella').filter(':eq(2), :eq(5), :eq(8)').css({
	    		transform: 'translate(0px,'+dim+'px)',
	    		'webkit-transform': 'translate(0px,'+dim+'px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('vert');
	    	$('.casella').eq(2).addClass('forcetop');
	    	$('.casella').eq(8).addClass('disappear');
	    	$('.casella').eq(5).addClass('disappeartop')
	    	mainStructure.dw.dx = mainStructure.cn.dx;
	    	mainStructure.cn.dx = mainStructure.up.dx;
	    	mainStructure.up.dx = 0;
    	}
    	else if(dir3=='dx' && dir2=='su') {
	    	$('.casella').filter(':eq(0), :eq(1), :eq(2)').css({
	    		transform: 'translate('+dim+'px,0px)',
	    		'webkit-transform': 'translate('+dim+'px,0px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('horiz');
	    	$('.casella').eq(0).addClass('forceleft');
	    	$('.casella').eq(2).addClass('disappear');
	    	$('.casella').eq(1).addClass('disappearright')
	    	mainStructure.up.dx = mainStructure.up.cn;
	     	mainStructure.up.cn = mainStructure.up.sx;
	     	mainStructure.up.sx = 0;
    	}
    	else if(dir3=='dx' && dir2=='cn') {
	    	$('.casella').filter(':eq(3), :eq(4), :eq(5)').css({
	    		transform: 'translate('+dim+'px,0px)',
	    		'webkit-transform': 'translate('+dim+'px,0px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('horiz');
	    	$('.casella').eq(3).addClass('forceleft');
	    	$('.casella').eq(5).addClass('disappear');
	    	$('.casella').eq(4).addClass('disappearright')
	    	mainStructure.cn.dx = mainStructure.cn.cn;
	     	mainStructure.cn.cn = mainStructure.cn.sx;
	     	mainStructure.cn.sx = 0;
    	}
    	else if(dir3=='dx' && dir2=='gi') {
	    	$('.casella').filter(':eq(6), :eq(7), :eq(8)').css({
	    		transform: 'translate('+dim+'px,0px)',
	    		'webkit-transform': 'translate('+dim+'px,0px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('horiz');
	    	$('.casella').eq(6).addClass('forceleft');
	    	$('.casella').eq(8).addClass('disappear');
	    	$('.casella').eq(7).addClass('disappearright')
	    	mainStructure.dw.dx = mainStructure.dw.cn;
	     	mainStructure.dw.cn = mainStructure.dw.sx;
	     	mainStructure.dw.sx = 0;
    	}
    	else if(dir3=='sx' && dir2=='su') {
	    	$('.casella').filter(':eq(0), :eq(1), :eq(2)').css({
	    		transform: 'translate(-'+dim+'px,0px)',
	    		'webkit-transform': 'translate(-'+dim+'px,0px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('horiz');
	    	$('.casella').eq(2).addClass('forceright');
	    	$('.casella').eq(0).addClass('disappear');
	    	$('.casella').eq(1).addClass('disappearleft')
			mainStructure.up.sx = mainStructure.up.cn;
	    	mainStructure.up.cn = mainStructure.up.dx;
	    	mainStructure.up.dx = 0;
    	}
    	else if(dir3=='sx' && dir2=='cn') {
	    	$('.casella').filter(':eq(3), :eq(4), :eq(5)').css({
	    		transform: 'translate(-'+dim+'px,0px)',
	    		'webkit-transform': 'translate(-'+dim+'px,0px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('horiz');
	    	$('.casella').eq(5).addClass('forceright');
	    	$('.casella').eq(3).addClass('disappear');
	    	$('.casella').eq(4).addClass('disappearleft')
			mainStructure.cn.sx = mainStructure.cn.cn;
	    	mainStructure.cn.cn = mainStructure.cn.dx;
	    	mainStructure.cn.dx = 0;
    	}
    	else if(dir3=='sx' && dir2=='gi') {
	    	$('.casella').filter(':eq(6), :eq(7), :eq(8)').css({
	    		transform: 'translate(-'+dim+'px,0px)',
	    		'webkit-transform': 'translate(-'+dim+'px,0px)',
				'transition-duration': '1s'
	    	});
	    	$('#mainGrid').addClass('horiz');
	    	$('.casella').eq(8).addClass('forceright');
	    	$('.casella').eq(6).addClass('disappear');
	    	$('.casella').eq(7).addClass('disappearleft')
			mainStructure.dw.sx = mainStructure.dw.cn;
	    	mainStructure.dw.cn = mainStructure.dw.dx;
	    	mainStructure.dw.dx = 0;
    	}
    	setTimeout(function(){
    		$('.casella').css({
	    		transform: 'translate(0px,0px)',
	    		'webkit-transform': 'translate(0px,0px)',
				'transition-duration': '0s'
	    	});
	    	$('.casella').removeClass('disappear').removeClass('disappeartop').removeClass('disappearbottom').removeClass('disappearright').removeClass('disappearleft').removeClass('forcetop').removeClass('forcebottom').removeClass('forceleft').removeClass('forceright');
	    	winners();
	    	draw();
	    	$('#mainGrid').removeClass('vert').removeClass('horiz').removeClass('inactive');
    	}, 1000);
	}
	function faiMossa(dir1,dir2,giocatore) {
		if(dir1=='dx' && dir2=='su') if(mainStructure.up.dx==0) {turno = !turno; mainStructure.up.dx=giocatore;}
		if(dir1=='sx' && dir2=='su') if(mainStructure.up.sx==0) {turno = !turno; mainStructure.up.sx=giocatore;}
		if(dir1=='cn' && dir2=='su') if(mainStructure.up.cn==0) {turno = !turno;mainStructure.up.cn=giocatore;}
		if(dir1=='dx' && dir2=='cn') if(mainStructure.cn.dx==0) {turno = !turno; mainStructure.cn.dx=giocatore;}
		if(dir1=='sx' && dir2=='cn') if(mainStructure.cn.sx==0) {turno = !turno;mainStructure.cn.sx=giocatore;}
		if(dir1=='cn' && dir2=='cn') if(mainStructure.cn.cn==0) {turno = !turno;mainStructure.cn.cn=giocatore;}
		if(dir1=='dx' && dir2=='gi') if(mainStructure.dw.dx==0) {turno = !turno;mainStructure.dw.dx=giocatore;}
		if(dir1=='sx' && dir2=='gi') if(mainStructure.dw.sx==0) {turno = !turno;mainStructure.dw.sx=giocatore;}
		if(dir1=='cn' && dir2=='gi') if(mainStructure.dw.cn==0) {turno = !turno;mainStructure.dw.cn=giocatore;}
		if(giocatore==2) $('#mainGrid').removeClass('inactive');
		winners();
		draw();

	}
	function draw() {
		if(mainStructure.up.dx==1) {
			$('#mainGrid div').eq(2).addClass('p1').removeClass('p2');
		}
		else if(mainStructure.up.dx==2) {
			$('#mainGrid div').eq(2).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.up.dx==0) {
			$('#mainGrid div').eq(2).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.up.sx==1) {
			$('#mainGrid div').eq(0).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.up.sx==2) {
			$('#mainGrid div').eq(0).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.up.sx==0) {
			$('#mainGrid div').eq(0).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.up.cn==1) {
			$('#mainGrid div').eq(1).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.up.cn==2) {
			$('#mainGrid div').eq(1).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.up.cn==0) {
			$('#mainGrid div').eq(1).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.cn.dx==1) {
			$('#mainGrid div').eq(5).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.cn.dx==2) {
			$('#mainGrid div').eq(5).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.cn.dx==0) {
			$('#mainGrid div').eq(5).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.cn.sx==1) {
			$('#mainGrid div').eq(3).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.cn.sx==2) {
			$('#mainGrid div').eq(3).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.cn.sx==0) {
			$('#mainGrid div').eq(3).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.cn.cn==1) {
			$('#mainGrid div').eq(4).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.cn.cn==2) {
			$('#mainGrid div').eq(4).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.cn.cn==0) {
			$('#mainGrid div').eq(4).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.dw.dx==1) {
			$('#mainGrid div').eq(8).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.dw.dx==2) {
			$('#mainGrid div').eq(8).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.dw.dx==0) {
			$('#mainGrid div').eq(8).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.dw.sx==1) {
			$('#mainGrid div').eq(6).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.dw.sx==2) {
			$('#mainGrid div').eq(6).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.dw.sx==0) {
			$('#mainGrid div').eq(6).removeClass('p2').removeClass('p1');
		}
		if(mainStructure.dw.cn==1) {
			$('#mainGrid div').eq(7).addClass('p1').removeClass('p2');;
		}
		else if(mainStructure.dw.cn==2) {
			$('#mainGrid div').eq(7).addClass('p2').removeClass('p1');
		}
		else if(mainStructure.dw.cn==0) {
			$('#mainGrid div').eq(7).removeClass('p2').removeClass('p1');
		}
		$('.playerCont1 textarea').html(players.p1.name);
		$('.playerCont1 .score').html(players.p1.score);
		$('.playerCont2 textarea').html(players.p2.name);
		$('.playerCont2 .score').html(players.p2.score);

	}
	function winners() {
		var fatto = false;
		//$('#mainGrid').addClass('inactive')
		var winner = 'no';
		if( mainStructure.up.cn != 0 &&
			mainStructure.up.cn == mainStructure.up.dx &&
			mainStructure.up.sx == mainStructure.up.dx ) {
				if(winner!='no') { continued()}
				winner =mainStructure.up.cn;
				$('.casella').filter(':eq(0), :eq(1), :eq(2)').addClass('win');
		}
		 if( mainStructure.dw.cn != 0 &&
			mainStructure.dw.cn == mainStructure.dw.dx &&
			mainStructure.dw.sx == mainStructure.dw.dx ) {
		 		if(winner!='no') {continued();}
				winner =mainStructure.dw.cn;
				$('.casella').filter(':eq(6), :eq(7), :eq(8)').addClass('win');
		}
		 if( mainStructure.cn.cn != 0 &&
			mainStructure.cn.cn == mainStructure.cn.dx &&
			mainStructure.cn.sx == mainStructure.cn.dx ) {
		 		if(winner!='no') {continued();}
				winner =mainStructure.cn.cn;
				$('.casella').filter(':eq(3), :eq(4), :eq(5)').addClass('win');
		}
		 if( mainStructure.cn.cn != 0 &&
			mainStructure.up.cn == mainStructure.cn.cn &&
			mainStructure.cn.cn == mainStructure.dw.cn ) {
		 		if(winner!='no') {continued();}
				winner =mainStructure.cn.cn;
				$('.casella').filter(':eq(1), :eq(4), :eq(7)').addClass('win');
		}
		 if( mainStructure.up.sx != 0 &&
			mainStructure.up.sx == mainStructure.cn.sx &&
			mainStructure.cn.sx == mainStructure.dw.sx ) {
		 		if(winner!='no') {continued();}
				winner =mainStructure.up.sx;
			$('.casella').filter(':eq(0), :eq(3), :eq(6)').addClass('win');
		}
		 if( mainStructure.up.dx != 0 &&
			mainStructure.up.dx == mainStructure.cn.dx &&
			mainStructure.cn.dx == mainStructure.dw.dx ) {
		 		if(winner!='no') {continued();}
				winner =mainStructure.up.dx;
				$('.casella').filter(':eq(2), :eq(5), :eq(8)').addClass('win');
		}
		 if( mainStructure.up.dx != 0 &&
			mainStructure.up.dx == mainStructure.cn.cn &&
			mainStructure.cn.cn == mainStructure.dw.sx ) {
		 		if(winner!='no') {continued();}
				winner =mainStructure.up.dx;
				$('.casella').filter(':eq(2), :eq(4), :eq(6)').addClass('win');
		}
		 if( mainStructure.up.sx != 0 &&
			mainStructure.up.sx == mainStructure.cn.cn &&
			mainStructure.cn.cn == mainStructure.dw.dx ) {
		 		if(winner!='no') {continued();}
				winner =mainStructure.up.sx;
				$('.casella').filter(':eq(0), :eq(4), :eq(8)').addClass('win');
		}

		function continued() {

				if(!fatto) {
					console.log('continued')
					fatto = true;
					$('#mainGrid').addClass('inactive');
					setTimeout(function(){
						$('.casella').removeClass('win');
						$('#mainGrid').addClass('higlight');
		    		}, 400);
					setTimeout(function(){
			    		mainStructure.up = {sx: 0, cn:0, dx : 0 };
					    mainStructure.cn = {sx: 0, cn:0, dx : 0 };
					    mainStructure.dw = {sx: 0, cn:0, dx : 0 };
						players.p1.score = players.p1.score+1;
						players.p2.score = players.p2.score+1;
			    		$('#mainGrid').removeClass('higlight');
			    		$('#mainGrid').removeClass('inactive');
			    		draw();

			    		if(!turno) aimove();
			    		return;
		    		}, 1000);
				}
		}
		if(!fatto) {
			myint = setInterval(function(){ clearInterval(myint); if(!turno) aimove();  }, 500);
			if(winner!='no') {
				$('#mainGrid').addClass('inactive');
				 clearInterval(myint);

				setTimeout(function(){
					$('.casella').removeClass('win');
					$('#mainGrid').addClass('higlight');

	    		}, 400);
				setTimeout(function(){
		    		mainStructure.up = {sx: 0, cn:0, dx : 0 };
				    mainStructure.cn = {sx: 0, cn:0, dx : 0 };
				    mainStructure.dw = {sx: 0, cn:0, dx : 0 };
					if(winner==1) {
						players.p1.score =players.p1.score+1;
					}
					if(winner==2) {
						players.p2.score =players.p2.score+1;
					}
		    		$('#mainGrid').removeClass('higlight');
		    		$('#mainGrid').removeClass('inactive');
		    		draw();

		    		if(!turno) aimove()
		    			return;

	    		}, 1000);
			}
		}
	}
	function aimove() {
		console.log('ai move')
		clearInterval(myint)

		$('#mainGrid').addClass('inactive');
		if(false) {}
		//complete the tris
			//horizontal
			else if(mainStructure.up.sx == 2 && mainStructure.up.cn == 2  && mainStructure.up.dx == 0) faiMossa('dx','su',2);
			else if(mainStructure.up.sx == 2 && mainStructure.up.dx == 2  && mainStructure.up.cn == 0) faiMossa('cn','su',2);
			else if(mainStructure.up.dx == 2 && mainStructure.up.cn == 2  && mainStructure.up.sx == 0) faiMossa('sx','su',2);
			else if(mainStructure.cn.sx == 2 && mainStructure.cn.cn == 2  && mainStructure.cn.dx == 0) faiMossa('dx','cn',2);
			else if(mainStructure.cn.sx == 2 && mainStructure.cn.dx == 2  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
			else if(mainStructure.cn.dx == 2 && mainStructure.cn.cn == 2  && mainStructure.cn.sx == 0) faiMossa('sx','cn',2);
			else if(mainStructure.dw.sx == 2 && mainStructure.dw.cn == 2  && mainStructure.dw.dx == 0) faiMossa('dx','gi',2);
			else if(mainStructure.dw.sx == 2 && mainStructure.dw.dx == 2  && mainStructure.dw.cn == 0) faiMossa('cn','gi',2);
			else if(mainStructure.dw.dx == 2 && mainStructure.dw.cn == 2  && mainStructure.dw.sx == 0) faiMossa('sx','gi',2);
			//vertical
			else if(mainStructure.up.sx == 2 && mainStructure.cn.sx == 2  && mainStructure.dw.sx == 0) faiMossa('sx','gi',2);
			else if(mainStructure.up.sx == 2 && mainStructure.dw.sx == 2  && mainStructure.cn.sx == 0) faiMossa('sx','cn',2);
			else if(mainStructure.dw.sx == 2 && mainStructure.cn.sx == 2  && mainStructure.up.sx == 0) faiMossa('sx','su',2);
			else if(mainStructure.up.cn == 2 && mainStructure.cn.cn == 2  && mainStructure.dw.cn == 0) faiMossa('cn','gi',2);
			else if(mainStructure.up.cn == 2 && mainStructure.dw.cn == 2  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
			else if(mainStructure.dw.cn == 2 && mainStructure.cn.cn == 2  && mainStructure.up.cn == 0) faiMossa('cn','su',2);
			else if(mainStructure.up.dx == 2 && mainStructure.cn.dx == 2  && mainStructure.dw.dx == 0) faiMossa('dx','gi',2);
			else if(mainStructure.up.dx == 2 && mainStructure.dw.dx == 2  && mainStructure.cn.dx == 0) faiMossa('dx','cn',2);
			else if(mainStructure.dw.dx == 2 && mainStructure.cn.dx == 2  && mainStructure.up.dx == 0) faiMossa('dx','su',2);
			//diagonal
			else if(mainStructure.up.sx == 2 && mainStructure.cn.cn == 2  && mainStructure.dw.dx == 0) faiMossa('dx','gi',2);
			else if(mainStructure.up.sx == 2 && mainStructure.dw.dx == 2  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
			else if(mainStructure.cn.cn == 2 && mainStructure.dw.dx == 2  && mainStructure.up.sx == 0) faiMossa('sx','su',2);
			else if(mainStructure.up.dx == 2 && mainStructure.cn.cn == 2  && mainStructure.dw.sx == 0) faiMossa('sx','gi',2);
			else if(mainStructure.up.dx == 2 && mainStructure.dw.sx == 2  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
			else if(mainStructure.cn.cn == 2 && mainStructure.dw.sx == 2  && mainStructure.up.dx == 0) faiMossa('dx','su',2);
		//horizontal blocking
		else if(mainStructure.up.sx == mainStructure.up.cn && mainStructure.up.sx == 1  && mainStructure.up.dx == 0) faiMossa('dx','su',2);
		else if(mainStructure.up.sx == mainStructure.up.dx && mainStructure.up.sx == 1  && mainStructure.up.cn == 0) faiMossa('cn','su',2);
		else if(mainStructure.up.dx == mainStructure.up.cn && mainStructure.up.dx == 1  && mainStructure.up.sx == 0) faiMossa('sx','su',2);
		else if(mainStructure.cn.sx == mainStructure.cn.dx && mainStructure.cn.sx == 1  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
		else if(mainStructure.cn.sx == mainStructure.cn.cn && mainStructure.cn.sx == 1  && mainStructure.cn.dx == 0) faiMossa('dx','cn',2);
		else if(mainStructure.cn.dx == mainStructure.cn.cn && mainStructure.cn.dx == 1  && mainStructure.cn.sx == 0) faiMossa('sx','cn',2);
		else if(mainStructure.dw.sx == mainStructure.dw.dx && mainStructure.dw.sx == 1  && mainStructure.dw.cn == 0) faiMossa('cn','gi',2);
		else if(mainStructure.dw.sx == mainStructure.dw.cn && mainStructure.dw.sx == 1  && mainStructure.dw.dx == 0) faiMossa('dx','gi',2);
		else if(mainStructure.dw.dx == mainStructure.dw.cn && mainStructure.dw.dx == 1  && mainStructure.dw.sx == 0) faiMossa('sx','gi',2);
		//vertical blocking
		else if(mainStructure.up.sx == mainStructure.cn.sx && mainStructure.up.sx == 1  && mainStructure.dw.sx == 0) faiMossa('sx','gi',2);
		else if(mainStructure.up.sx == mainStructure.dw.sx && mainStructure.up.sx == 1  && mainStructure.cn.sx == 0) faiMossa('sx','cn',2);
		else if(mainStructure.dw.sx == mainStructure.cn.sx && mainStructure.cn.sx == 1  && mainStructure.up.sx == 0) faiMossa('dx','su',2);
		else if(mainStructure.up.cn == mainStructure.cn.cn && mainStructure.up.cn == 1  && mainStructure.dw.cn == 0) faiMossa('cn','gi',2);
		else if(mainStructure.up.cn == mainStructure.dw.cn && mainStructure.up.cn == 1  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
		else if(mainStructure.cn.cn == mainStructure.dw.cn && mainStructure.dw.cn == 1  && mainStructure.up.cn == 0) faiMossa('cn','su',2);
		else if(mainStructure.up.dx == mainStructure.cn.dx && mainStructure.up.dx == 1  && mainStructure.dw.dx == 0) faiMossa('dx','gi',2);
		else if(mainStructure.up.dx == mainStructure.dw.dx && mainStructure.up.dx == 1  && mainStructure.cn.dx == 0) faiMossa('dx','cn',2);
		else if(mainStructure.dw.dx == mainStructure.cn.dx && mainStructure.cn.dx == 1  && mainStructure.up.dx == 0) faiMossa('dx','su',2);
		//diagonal blocking
		else if(mainStructure.up.dx == mainStructure.cn.cn && mainStructure.up.dx == 1  && mainStructure.dw.sx == 0) faiMossa('sx','gi',2);
		else if(mainStructure.up.dx == mainStructure.dw.sx && mainStructure.up.dx == 1  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
		else if(mainStructure.cn.cn == mainStructure.dw.sx && mainStructure.cn.cn == 1  && mainStructure.up.dx == 0) faiMossa('dx','su',2);
		else if(mainStructure.up.sx == mainStructure.cn.cn && mainStructure.up.sx == 1  && mainStructure.dw.dx == 0) faiMossa('dx','gi',2);
		else if(mainStructure.up.sx == mainStructure.dw.dx && mainStructure.up.sx == 1  && mainStructure.cn.cn == 0) faiMossa('cn','cn',2);
		else if(mainStructure.cn.cn == mainStructure.dw.dx && mainStructure.cn.cn == 1  && mainStructure.up.sx == 0) faiMossa('sx','su',2);

		else if(mainStructure.up.sx == 0) {faiMossa('sx','su',2);}
		else if(mainStructure.up.dx == 0) {faiMossa('dx','su',2);}
		else if(mainStructure.dw.sx == 0) {faiMossa('sx','gi',2);}
		else if(mainStructure.dw.dx == 0) {faiMossa('dx','gi',2);}
		else {
				var troll = true;
				for (var i in mainStructure) {
					if(troll) {
						for (var ju in mainStructure[i]) {
							if(mainStructure[i][ju]==0) {
								faiMossa(ju.toString().replace('up','su').replace('dw','gi'),i.toString().replace('up','su').replace('dw','gi'),2)
								troll = false;
								break;
							}
						}
					};
				}
				if(troll) {
					console.log('continue');
					trasla('cn','cn','up',$('#mainGrid').width()/3)
				}

		};

		//turno = !turno;
	}
});

