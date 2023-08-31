//http://it.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=lakers
$(document).ready(function(){
var wk=function(_steps){
	var _this=this;
	this.root='//it.wikipedia.org/w/api.php?action=query&format=json';
	this.steps=_steps;



	var bk;
	var step=0;
	var tries=0;
	var rnd=false;
	var wrd;
	var wrds = [];

	var randompages = [];
	getRandomNames();
	function getRandomNames() {
		$.ajax({
				url:'//it.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=600',
			    // contentType: 'application/json', -- you can't set content type for a <script> tag, this option does nothing for jsonp | KevinB
			    cache: 'true',
			    dataType : 'jsonp',
				success: function(data) {
				$.each(data.query.random, function(index, val) {
					//console.log(data.query.random[index].title);
					if(/^[a-zA-Z0-9]{4,10}$/.test(data.query.random[index].title))
					randompages.push(data.query.random[index].title)
				});

		      },
				async:false
		});
	}

	this.call=function(a,b){
		return $.ajax({
			url:_this.root+a,
		    // contentType: 'application/json', -- you can't set content type for a <script> tag, this option does nothing for jsonp | KevinB
		    cache: 'true',
		    dataType : 'jsonp',
			success:b,
			async:false
		});
	}


	this.nextStep=function(a){
		//console.log(wrds)
		try{
			console.log(a);
			//console.log(wrd)
			if(tries>=50) return _this.stopP();
			var pId=Object.keys(a.query.pages);
			if(pId == -1){ tries++; console.log('tries '+tries);$('#chain').html(''); return _this.reset(); }
			if(a.query.normalized) {  step--; $("div[id*='step'][id!='steps']").remove() }

			var n=a.query.pages[Object.keys(a.query.pages)].links;
			if(n.length <= 4 && step==-1){	return _this.stop(n[0].title);}
			if(n.length <= 4){ tries++; console.log('tries length'+tries); $('#chain').html(''); return _this.reset();}
			var num = Math.floor(n.length*Math.random());
			if(n[num].title){
				var t=n[num].title;
				while(/^\d+$/.test(t) || / +/.test(t) || n[num].ns > 1 || t==wrd || wrds.indexOf(t)!=-1){
					console.log('uno');
					num = Math.round(n.length*Math.random());
					t=n[num].title;
				}
				wrds.push(t);
				if(step != _this.steps) $('#game').append("<div id='step"+(step+1)+"' ></div>");
				console.log(t)
				//console.log('url: '+_this.root+'&prop=links&titles='+encodeURIComponent(t));

				//console.log('n: '+num+' title:'+t);

			}else{
				_this.nextStep(a);
			}
			bk=a; step++;
			//console.log(step)
			if(step > _this.steps) {
				//animation();

				//$('.title').get(0).hide();

				$('#steps').hide();
				$('#step0').show();
				$('#game').show();
				$('.thecube').hide();

				$('#end').text(t).show();
				$('#end').parent('div').append("<div class='getInfo'></div>");
				$('#end').addClass('big');
				setTimeout(function(){ $('#end').removeClass('big'); }, 1000);

				$('#steps').prepend("<div><span>"+wrd+"</span><div class='getInfo'></div></div>");
				$('#steps').append("<div><span>"+t+"</span><div class='getInfo'></div></div>");
				for (var i = 0; i <= steps; i++) {
					//console.log('i'+i);
					$("div[id*='step"+i+"'] > div").shuffle()
				}
				return;
				} else {
					$('#steps').append("<div><span>"+t+"</span><div class='getInfo'></div></div>");
					$('#step'+step).html("<p><h3 >Opzioni Passaggio "+(step+1)+":</h3></p>");



					for (var i = 2; i > 0; i--) {
						var num2 = Math.floor(n.length*Math.random());
						var t2=n[num2].title;

						while(/^\d+$/.test(t2)|| / +/.test(t2) || n[num2].ns > 1 || t==t2 || t2==wrd || wrds.indexOf(t2)!=-1){
							console.log('due');
							num2 = Math.round(n.length*Math.random());
							t2=n[num2].title;
						}
						if(n[num2].title){
							$('#step'+step).append("<div><a class='wrong'>"+t2+"</a><div class='getInfo'></div></div>")

						}

						var r = Math.floor(randompages.length*Math.random());
						$('#step'+step).append("<div><a class='wrong'>"+randompages[r]+"</a><div class='getInfo'></div></div>")
						var index = randompages.indexOf(randompages[r]);
						if (index >= 0) {
						  randompages.splice( index, 1 );

						}
					};
					getRandomNames();
					if(step==steps) {
						$('#step'+step).append("<div><a class='win '>"+t+"</a><div class='getInfo'></div></div>")
					} else $('#step'+step).append("<div><a class='  nextTo"+(step+1)+"'>"+t+"</a><div class='getInfo'></div></div>");
					$('#chain').append("<li id='chainstep"+step+"'>"+(step+1)+"</li>")
				}

			_this.call('&prop=links&pllimit=500&titles='+encodeURIComponent(t), _this.nextStep);
		}catch(e){
			$('#error').text('Error: '+e);
			$('#getWords').click();
		}
	}

	this.getSteps=function(a){
		var t=a.query.random[0].title;
		$('#start').text(t);
		_this.call('&prop=links&titles='+encodeURIComponent(t), _this.nextStep);
	}

	this.reset=function(){
		step=0;
		$('#steps,#error').html('');
		if(rnd==true) _this.getRandomPage(); else _this.getPages(wrd);
	}

	this.stop=function(n){
		 step=-1;
		_this.call('&prop=links&pllimit=500&titles='+encodeURIComponent(n), _this.nextStep);

	}

	this.stopP=function(){
		tries = 0;
		$('#steps').html('');
		$("div[id*='step']").html('');
		$('.thecube').hide();
		$('#game').show();
		$('#end').html('Invalid Word');
		$('#startWord').focus()

	}

	this.getRandomPage=function(){
		rnd=true;
		_this.call('&list=random&rnnamespace=0&rnlimit=1&prop=info', _this.getSteps)
	}

	this.getPages=function(a){
		wrd=a;
		rnd=false;
		step=0;
		wrds = [];
		$('#steps,#error').html('');
		_this.call('&prop=links&pllimit=500&titles='+encodeURIComponent(a), _this.nextStep);
	}
	return this;
}
var passaggi = 1;
var w,
initialLieves = 4;
lieves = 4;


	function setLeaves() {
		$('#lievesCont').html('');
		for (var i = 0; i < lieves; i++) {
			$('#lievesCont').append('<div></div>')
		}
	}
	var clickType = 'click';
	if(detectmob()) {
        clickType = 'touchstart';
    }  else {
        clickType = 'click';
    }
	$('#getWords').bind('click',function(){
		w=wk(passaggi);
		$(this).hide();
		$('#chain').html(' ').show();
		$('.info').html('').css({
			'transition-duration' : '1000ms'
		});
		$('#chain').html('');
		$('#end').html('');
		$('.getInfo').remove();
		$('#info').remove();
		$('#game').removeClass('gameover');
		$("div[id*='step']").html('').hide();
		$('#startWord').addClass('noevent');
		var v=$('#startWord').val().toLowerCase();;
		$('.thecube').show();
		$('#game').hide();
		w.getPages(v);
		setLeaves()

		$('.info').html('');
	});
	$('#steps').on(clickType, "#again", function(event) {
            event.preventDefault();
            $('#getWords').click();
            lieves = lieves+3;
            setLeaves();
    });
	$('#startWord').bind('focus',function(){
		$('#getWords').fadeIn();
		$('#lievesCont').fadeOut();
	});
	$('#startWord').bind('blur',function(){
		$('#lievesCont').fadeIn();
		$('#getWords').fadeOut();
	});
	$('#game').on(clickType, "a[class*='next']", function(event) {
            event.preventDefault();
            $('.info').html('');
            var toShow = $(this).attr('class');
            toShow = toShow.substring(toShow.indexOf("o") + 1);
            $("li[id*='chainstep"+(toShow-1)+"']").html($(this).html());
			var el = $(this).parent('div');
            el.addClass('green');
            var currDiv = $(this).closest('div[id]');
            currDiv.addClass('pnone');
            setTimeout(function(){
            	currDiv.removeClass('pnone');
            	el.removeClass('green');
            	$("div[id*='step"+toShow+"']").show();
            	currDiv.hide();
            }, 500);
    });
	$('#game').on(clickType, "a[class*='wrong']", function(event) {
            event.preventDefault();
            lieves--;
            setLeaves();
            $('.info').html('');
            if(lieves==-1) {
            	$('#end').hide();
            	$('#chain').hide();
            	$('h3').html('Hai Perso!');
            	lieves = initialLieves;
            	$(".final .getInfo").remove();
            	$('#game').addClass('gameover');
            	$("div[id*='step']").hide();
            	$("#steps").prepend('<h3>Hai Perso!<h3><h3>Passaggi:<h3>')
            	$("#steps").show();
            	$('#startWord').removeClass('noevent');
            	passaggi= 1;
            	setTimeout(function(){
            		$("#startWord").focus();
            	}, 2000);

            }
            var el = $(this).parent('div');
            el.addClass('red');
            el.addClass('pnone');
            setTimeout(function(){
            	el.removeClass('pnone');
            	el.removeClass('red');
            }, 500);
    });
    $('.info').on('click',  function(event) {
    		$('.getInfo').removeClass('loader');
            event.preventDefault();
            $('.info').css({
            	top: '150%'
            });
            setTimeout(function(){
            	//$('.info').html('');
            }, 200);
            $('body').removeClass('infoDisplayed');
    });
    $('.fade').on('click',  function(event) {
    		$('.getInfo').removeClass('loader');
            event.preventDefault();
            $('.info').css({
            	top: '150%'
            });
            setTimeout(function(){
            	//$('.info').html('');
            }, 200);
            $('body').removeClass('infoDisplayed');
    });
	$('#game, .final').on(clickType, '.getInfo', function(event) {
            event.preventDefault();
            $('.info').html('');
            $(this).addClass('loader')
            var word = $(this).prev('a').text();

            word == '' ? word=$(this).parent('div').text() : word;
            word = word.trim();
            $.ajax({
				url:'//it.wikipedia.org/w/api.php?action=query&prop=revisions&prop=extracts&exintro=&explaintext&format=json&titles='+encodeURIComponent(word),
			    cache: 'true',
			    dataType : 'jsonp',
				success: function(data) {
					//console.log(data);
					console.log(encodeURIComponent(word));
					var content = data.query.pages[Object.keys(data.query.pages)].extract;
					$('.info').html('');
					if(content=='' || content==undefined) {
						$('.info').html('<div style="text-align:center;"><div class="lacrime"></div></div>')
					} else {
						$('.info').html('<div>'+content+'</div>')
					}
					//$('.info').prepend('<div class="wiki"></div>');
					$('.info').css({
						top: '40%'
					});
					$('body').addClass('infoDisplayed');
		      },
				async:true
			});
    });
    $('#game').on(clickType, "a[class*='win']", function(event) {
            event.preventDefault();
            var el = $(this).parent('div');
            $('.info').html('');
            $('h3').html('Hai Vinto');
            $('#game').addClass('gameover');
        	$("div[id*='step']").hide();
        	$("#steps").prepend('<h3>Hai Vinto!<h3><h3>Passaggi:<h3>')
        	$("#steps").prepend('<div class="center" id="again">Gioca con '+(passaggi+2)+' Passaggi</div>')
        	$("#steps").show();
        	$("#chain").hide();
        	$("#end").hide();
        	$(".final .getInfo").remove();
        	passaggi++;
        	//$("#startWord").focus();
    });
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
});


