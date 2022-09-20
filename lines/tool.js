

$(document).ready(function(){

	$('body').append('<div class="dimensions"></div>')
	for (var i = 1; i <= 3; i++) {
		$('.dimensions').append('<select class="dimension'+i+'"></select>');
		for (var l = 3; l < 10 ; l++) {
			$('.dimension'+i).append('<option value="'+l+'">'+l+'</option>')
		}
	}
	$('.dimensions').append('<input class="setDiensions" type="button" value="ok"></input>');

	$('.setDiensions').on('click',function(){
		dim1 = $('.dimension1').val();
		dim2 = $('.dimension2').val();
		dim3 = $('.dimension3').val();
		var fract1 = 100 / (dim1-1);
		var fract2 = 100 / (dim2-1);
		$('#shape').css('width','100px');
		$('#shape').css('height',(100/dim1*dim2)+'px');
		for (var l = 1; l < 4 ; l++) {
			$('#shape').append('<div class="face'+l+' face"></div>');
			for (var k = 0; k < (dim1); k++) {
				for (var j = 0; j < (dim2); j++) {
					var style = 'left:calc('+(k*fract1)+'% - 2.5px);top:calc('+(j*fract2)+'% - 2.5px);'
					$('.face'+l).append('<div class="point" style="'+style+'"></div>');
				}
			}
		}
		var v = $('.point').eq(1).position().top - $('.point').eq(0).position().top
		$('.face1').css('transform','translateZ('+v+'px)');
		$('.face2').css('transform','translateZ('+(-v)+'px)');
		$('.dimensions').remove();
	})


	$('.dimension1').val(4);
	$('.dimension2').val(5);
	$('.dimension3').val(3);
	$('.setDiensions').click();


	var currentpos = 0
	var nointlengths = [0,3,'asda',2,Math.sqrt(5),2,'asdasd',9.5,'uuyyu',2,Math.sqrt(2), 2,'fall',5,'ultimo',2.5,'asdasd',Math.sqrt(2),2,(2/5*4),2,10,10]
	$('#stepb').addClass('disabled')
	$('#counter span').eq(0).html(currentpos)
	$('.linesControls > div').click(function(){
		var cid = $(this).attr('id');
		if(cid=='stepf') {
			$('.line').eq(currentpos).addClass('complete').css('height',50*trasf(nointlengths[currentpos+1])+'%');
			console.log()
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
		if(currentpos==20) {
			$('#stepf').addClass('disabled')
		} else {
			$('#stepf').removeClass('disabled')
		}
		$('#counter span').eq(0).html(currentpos)
		// if(nointlengths[currentpos]) {
		// 	$('#counter div').eq(0).html('Len: '+nointlengths[currentpos])
		// 	$('#counter div').eq(1).html('Sum: '+sums(currentpos) )
		// }
		// else 
		// 	$('#counter div').html('')

		function trasf(s) {
			if(s=='2*radq(2)') s = Math.sqrt(8);
			if(s=='2*radq(3)') s = 2*Math.sqrt(3);
			if(s=='radq(2)') s = Math.sqrt(2);
			return parseFloat(s).toFixed(3)
		}

		function sums(c){
			var sum = 0;
			for (var i = 0; i <= c; i++) {
				sum += parseFloat(trasf(nointlengths[i]))

			}
			console.log(sum)
			return sum.toFixed(3);
		}

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
		var cVal = $(this).val();
		if(cVal=='trivial') {
			$('.noint').remove();
			$('#counter span').eq(1).html(20)
			$('#shape').append('<div class="trivial"></div>')
			for (var i = 0; i < 14; i++) {
				$('.trivial').append('<div class="line"></div>')
			}
		}
		if(cVal=='nointersection') {
			$('.trivial').remove();
			$('#counter span').eq(1).html(20)
			$('#shape').append('<div class="noint"></div>')
			for (var i = 0; i < 20; i++) {
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
			$('#shape').attr('data-s',1)
			$('.line').removeClass('complete')
			currentpos = 0;
			$('#counter span').eq(0).html(currentpos)
			$('#counter div').eq(0).html('')
			$('#counter div').eq(1).html('')
			$('#stepb').addClass('disabled')
			$('#stepf').removeClass('disabled')
			

			moving = {};
			$('.move .selected[id!="faces"]').removeClass('selected')
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
				if(cid=='zin') {
					if(parseFloat($('#shape').attr('data-s'))<1.5) {
						$('#shape').attr('data-s',parseFloat($('#shape').attr('data-s'))+.1)
					}
				}
				if(cid=='zout') {
					if(parseFloat($('#shape').attr('data-s'))>.5) {
						$('#shape').attr('data-s',parseFloat($('#shape').attr('data-s'))-.1)
					}
				}
		}
	});
	$('.play').on('click',function(){
		$('.line').removeClass('complete');
		$('#stepf').hide();
		$('#controls').hide();
		$('#stepb').hide();
		$('.play').hide();
		var count = 0
		currentpos = 0;
		var d = setInterval(function(){
			$('#stepf').click();
			count++;
			if(count==20) {
				clearInterval(d);
				$('#stepf').show();
				$('#stepb').show();
				$('.play').show();
			}
		},1500)
		
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
	},100)
	var hoverInterval;
	var mainInterval = setInterval(function(){
		updateCube();
	},100)
	function updateCube() {
		$('#shape').css('-webkit-transform','rotateX('+$('#shape').attr('data-x')+'deg) rotateY('+$('#shape').attr('data-y')+'deg) rotateZ('+$('#shape').attr('data-z')+'deg) translateZ(100px)')
		$('#container').css('-webkit-transform', 'scale('+$('#shape').attr('data-s')+')')
	}

	/*$('#shape').append('<div class="trivial"></div>')
	for (var i = 0; i < 14; i++) {
		$('.trivial').append('<div class="line"></div>')
	}*/
	$('#y1').click();
	$('#zin').click();
	$('#zin').click();
	$('#zin').click();
	$('#zin').click();
	$('.type').val('nointersection').trigger('change');
});