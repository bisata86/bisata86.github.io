

$(document).ready(function(){
	var currentpos = 0
	$('#stepb').addClass('disabled')
	$('#counter').html(currentpos)
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
		$('#counter').html(currentpos)
	});
	$('#controls .move > div').on('mouseenter',function(){
		clearInterval(hoverInterval)
		var that = $(this)
		hoverInterval= setInterval(function(){
			var cid = that.attr('id');
			if(cid=='x1') {
				$('#shape').attr('data-x',parseInt($('#shape').attr('data-x'))+1)
			}
			if(cid=='x2') {
				$('#shape').attr('data-x',parseInt($('#shape').attr('data-x'))-1)
			}
			if(cid=='y1') {
				$('#shape').attr('data-y',parseInt($('#shape').attr('data-y'))+1)
			}
			if(cid=='y2') {
				$('#shape').attr('data-y',parseInt($('#shape').attr('data-y'))-1)
			}
			if(cid=='z1') {
				$('#shape').attr('data-z',parseInt($('#shape').attr('data-z'))+1)
			}
			if(cid=='z2') {
				$('#shape').attr('data-z',parseInt($('#shape').attr('data-z'))-1)
			}
		},50)
	});
	$('#controls .move > div').on('mouseleave',function(){
		clearInterval(hoverInterval)
	});
	var hoverInterval;
	var mainInterval = setInterval(function(){
		updateCube();
	},100)
	function updateCube() {
		$('#shape').css('-webkit-transform','rotateX('+$('#shape').attr('data-x')+'deg) rotateY('+$('#shape').attr('data-y')+'deg) rotateZ('+$('#shape').attr('data-z')+'deg)')
	}

	for (var i = 0; i < 14; i++) {
		$('#shape').append('<div class="line"></div>')
	}

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