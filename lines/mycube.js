

$(document).ready(function(){
	var currentpos = 0
	$('#stepb').addClass('disabled')
	$('#counter span').eq(0).html(currentpos)
	$('.linesControls > div').click(function(){
		var cid = $(this).attr('id');
		if(cid=='stepf') {
			$('.line').eq(currentpos).addClass('complete');
			currentpos++;
		}
		if(cid=='stepb') {
			$('.line').eq(currentpos-1).removeClass('complete');
			currentpos--;
		}
		if(currentpos==0) {
			$('#stepb').addClass('disabled')
		} else {
			$('#stepb').removeClass('disabled')
		}
		if(currentpos==14) {
			$('#stepf').addClass('disabled')
		} else {
			$('#stepf').removeClass('disabled')
		}
		$('#counter span').eq(0).html(currentpos)
	});
	$('#controls .move > div').on('mouseenter',function(){
		clearInterval(hoverInterval)
		// var that = $(this)
		// hoverInterval= setInterval(function(){
		// 	var cid = that.attr('id');
		// 	if(cid=='x1') {
		// 		$('#shape').attr('data-x',parseInt($('#shape').attr('data-x'))+1)
		// 	}
		// 	if(cid=='x2') {
		// 		$('#shape').attr('data-x',parseInt($('#shape').attr('data-x'))-1)
		// 	}
		// 	if(cid=='y1') {
		// 		$('#shape').attr('data-y',parseInt($('#shape').attr('data-y'))+1)
		// 	}
		// 	if(cid=='y2') {
		// 		$('#shape').attr('data-y',parseInt($('#shape').attr('data-y'))-1)
		// 	}
		// 	if(cid=='z1') {
		// 		$('#shape').attr('data-z',parseInt($('#shape').attr('data-z'))+1)
		// 	}
		// 	if(cid=='z2') {
		// 		$('#shape').attr('data-z',parseInt($('#shape').attr('data-z'))-1)
		// 	}
		// },50)
	});
	$('#controls .move > div').on('mouseleave',function(){
		clearInterval(hoverInterval)
	});
	$('.type').on('change',function(){
		$('.line').remove();
		currentpos = 0
		$('#stepb').addClass('disabled')
		$('#stepf').removeClass('disabled')
		$('#counter span').eq(0).html(currentpos)
		console.log($(this).val())
		var cVal = $(this).val();
		if(cVal=='trivial') {
			$('.noint').remove();
			$('#counter span').eq(1).html(14)
			$('#shape').append('<div class="trivial"></div>')
			for (var i = 0; i < 14; i++) {
				$('.trivial').append('<div class="line"></div>')
			}
		}
		if(cVal=='nointersection') {
			$('.trivial').remove();
			$('#counter span').eq(1).html(14)
			$('#shape').append('<div class="noint"></div>')
			for (var i = 0; i < 14; i++) {
				$('.noint').append('<div class="line"></div>')
			}
		}
	});
	$('#controls .move > div').on('click',function(){
		//clearInterval(spininterval);
		var that = $(this)
		var cid = that.attr('id');	
		if(cid=='faces') {
			$(this).toggleClass('selected');
			$('body').toggleClass('faces')
		}
		else if(cid=='reset') {
			$('#shape').attr('data-x',-15)
			$('#shape').attr('data-y',15)
			$('#shape').attr('data-z',0)
			moving = {};
			$('.move .selected').removeClass('selected')
		} else {
				if(cid=='x1') {
					if(moving.x1) {
						moving.x1 = false;
						$(this).removeClass('selected')
					}
					else {
						moving.x1 = true;
						moving.x2 = false;
						$('#x2').removeClass('selected')
						$(this).addClass('selected')
					}
				}
				if(cid=='x2') {
					if(moving.x2) {
						moving.x2 = false;
						$(this).removeClass('selected')
					}
					else {
						moving.x2 = true;
						moving.x1 = false;
						$('#x1').removeClass('selected')
						$(this).addClass('selected')
					}
				}
				if(cid=='y1') {
					if(moving.y1) {
						moving.y1 = false;
						$(this).removeClass('selected')
					}
					else {
						moving.y1 = true;
						moving.y2 = false;
						$('#y2').removeClass('selected')
						$(this).addClass('selected')
					}
				}
				if(cid=='y2') {
					if(moving.y2) {
						moving.y2 = false;
						$(this).removeClass('selected')
					}
					else {
						moving.y2 = true;
						moving.y1 = false;
						$('#y1').removeClass('selected')
						$(this).addClass('selected')
					}
				}
				if(cid=='z1') {
					if(moving.z1) {
						moving.z1 = false;
						$(this).removeClass('selected')
					}
					else {
						moving.z1 = true;
						moving.z2 = false;
						$('#z2').removeClass('selected')
						$(this).addClass('selected')
					}
				}
				if(cid=='z2') {
					if(moving.z2) {
						moving.z2 = false;
						$(this).removeClass('selected')
					}
					else {
						moving.z2 = true;
						moving.z1	 = false;
						$('#z1').removeClass('selected')
						$(this).addClass('selected')
					}
				}
		}
	});
	var moving = {};
	var spininterval;
	spininterval = setInterval(function(){
		if(moving.x1) {
			$('#shape').attr('data-x',parseInt($('#shape').attr('data-x'))+1)
		}
		if(moving.x2) {
			$('#shape').attr('data-x',parseInt($('#shape').attr('data-x'))-1)
		}
		if(moving.y1) {
			$('#shape').attr('data-y',parseInt($('#shape').attr('data-y'))+1)
		}
		if(moving.y2) {
			$('#shape').attr('data-y',parseInt($('#shape').attr('data-y'))-1)
		}
		if(moving.z1) {
			$('#shape').attr('data-z',parseInt($('#shape').attr('data-z'))+1)
		}
		if(moving.z2) {
			$('#shape').attr('data-z',parseInt($('#shape').attr('data-z'))-1)
		}
		console.log('aaaa')
	},100)
	var hoverInterval;
	var mainInterval = setInterval(function(){
		updateCube();
	},100)
	function updateCube() {
		$('#shape').css('-webkit-transform','rotateX('+$('#shape').attr('data-x')+'deg) rotateY('+$('#shape').attr('data-y')+'deg) rotateZ('+$('#shape').attr('data-z')+'deg) translateZ(100px)')
	}

	$('#shape').append('<div class="trivial"></div>')
	for (var i = 0; i < 14; i++) {
		$('.trivial').append('<div class="line"></div>')
	}
	$('#y1').click();
	$('.type').val('nointersection').trigger('change');
	// setTimeout(function(){
	// 	$('.line').eq(0).addClass('complete');
	// 	setTimeout(function(){
	// 		$('.line').eq(1).addClass('complete');
	// 		setTimeout(function(){
	// 			$('.line').eq(2).addClass('complete');
	// 			setTimeout(function(){
	// 				$('.line').eq(3).addClass('complete');
	// 			},1000)
	// 		},1000)
	// 	},1000)
	// },1000)

});