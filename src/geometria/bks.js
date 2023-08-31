var isMobile = detectmob();
		var hitDistance = 5;
$( document ).ready(function() {
    $('#canvasContainer').append(canvas);
    $('.primary').each(function(index, el) {
		 var selected = $(this).find('.selected').attr('id');
		 var curPrimary = $(this);
		 curPrimary.find('div[id]').hide();
		 curPrimary.find('.selected').removeClass('selected');
		 curPrimary.prepend("<div id='"+selected+"' class='selected'></div>");
    });
	drawAll();
	$('body').on('mousedown', function(event) {
		event.preventDefault();
		var selezionato = false;
		$.each(mainFigure.points, function( index, value ) {
	 		if(
				value[0]<event.pageX+hitDistance &&
				value[0]>event.pageX-hitDistance &&
				value[1]<event.pageY+hitDistance &&
				value[1]>event.pageY-hitDistance
				)
			{
				selezionato = true;
				down=true;
				pointer = index;

			}
		});
		if(!selezionato) pointer = 'undefined';
		$.each(mainFigure.circles, function( index, value ) {
	 		if(value!='niente') {
	 			if(value[0]==pointer) {
	 				console.log('centro:')
 					var diffX = mainFigure.points[value[1]][0]-mainFigure.points[value[0]][0]
 					var diffY = mainFigure.points[value[1]][1]-mainFigure.points[value[0]][1]
 					movecircle = true;
 					distCC = [diffX,diffY];
 					pointsForCM = [value[0],value[1]];
	 			}

	 		}
		});
		if(askmove) {
			askmove2 = true;
			forMove = [event.pageX,event.pageY]
		}
		if(askzoom) {
			askzoom2 = true;
			forZoom = [event.pageX,event.pageY]
		}
		if(askzoomM) {
			askzoom2M = true;
			forZoom2 = [event.pageX,event.pageY]
		}
	});
	var movecircle = false;
	var distCC = [];
	var pointsForCM = [];
	$('body').on('mouseup', function(event) {
		event.preventDefault();
		/* Act on the event */
		down = false;
		movecircle =false;
		drawAll();
		if(askmove2) {
			askmove2 = false;

		}
		if(askzoom2) {
			askzoom2 = false;

		}
		if(askzoom2M) {
			askzoom2M = false;

		}
		drawAll();
	});
	$( "body" ).mousemove(function( event ) {
		if(down && askselect) {
			if(pointer!=undefined) {
				if(mainFigure.points[pointer][2]==undefined) {
					mainFigure.points[pointer][0] = event.pageX;
					mainFigure.points[pointer][1] = event.pageY;
					drawAll();
				}
				if(mainFigure.points[pointer][3]=='circular') {
					var delta = {x: event.pageX - mainFigure.points[mainFigure.circles[mainFigure.points[pointer][4]][0]][0], y: event.pageY - mainFigure.points[mainFigure.circles[mainFigure.points[pointer][4]][0]][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points[pointer][5] = angle;
					drawAll();
				}
	 			if(movecircle) {
	 				if(mainFigure.points[pointsForCM[1]][2]==undefined) {
	 				mainFigure.points[pointsForCM[1]][0] = mainFigure.points[pointsForCM[0]][0]+distCC[0]
					mainFigure.points[pointsForCM[1]][1] = mainFigure.points[pointsForCM[0]][1]+distCC[1]
					}
	 			}
			}
		}
		if(askline2) {
			drawAll();
			drawPoint(event.pageX,event.pageY,5);
			drawLine([mainFigure.points[line1temp][0],mainFigure.points[line1temp][1],event.pageX,event.pageY]);
		}
		if(askretta2) {
			var before = getLineXY(mainFigure.points[line1temp], [event.pageX,event.pageY], -140.9);
			var after = getLineXY(mainFigure.points[line1temp], [event.pageX,event.pageY], 150.9);
			drawAll()
			ctx.beginPath();
		    ctx.moveTo(before[0], before[1]);
		    ctx.lineTo(after[0], after[1]);
		    ctx.stroke();
		}
		if(askcircle2) {
			drawAll();
			drawPoint(event.pageX,event.pageY,5);
			var a = mainFigure.points[centertemp][0] - event.pageX
			var b = mainFigure.points[centertemp][1] - event.pageY
			var c = Math.sqrt( a*a + b*b );
			drawCirlce2(mainFigure.points[centertemp][0],mainFigure.points[centertemp][1],c);
		}
		if(askmedium2) {
			drawAll();
			drawPoint(mainFigure.points[forMedium[0]][0],mainFigure.points[forMedium[0]][1],5,'green');
		}
		if(askerase) {
			var selezionato = false;
			$.each(mainFigure.circles, function( index, value ) {
				if(value!='niente') {
					var precision = 10;
					var a = mainFigure.points[value[0]][0] - mainFigure.points[value[1]][0]
					var b = mainFigure.points[value[0]][1] - mainFigure.points[value[1]][1]
					var curRadius = Math.sqrt( a*a + b*b );
					var a = mainFigure.points[value[0]][0] - event.pageX
					var b = mainFigure.points[value[0]][1] - event.pageY
					var curPoint = Math.sqrt( a*a + b*b );
					var ano = Math.abs(curPoint-curRadius)<10;
					if(ano){
						selezionato = true;
						pointer2 = ['circle',index];
					}
				}
			});

			$.each(mainFigure.lines, function( index, value ) {
				if(value!='niente') {
					var isretta = value[2]!=undefined;
					var ano = IsPointOnLine(mainFigure.points[value[0]],mainFigure.points[value[1]],[event.pageX,event.pageY],isretta)
					if(ano){
						selezionato = true;
						pointer2 = ['line',index];
					}
				}
			});

			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					down =true;
					pointer2 = ['point',index];

				}
			});
			if(!selezionato) pointer2 = 'undefined';
		}
		if(askmove2) {
			var diffX = forMove[0]-event.pageX;
			var diffY = forMove[1]-event.pageY;
			$.each(mainFigure.points, function( index, value ) {
				if(value!='niente') {
					value[0] = value[0]-diffX/30;
					value[1] = value[1]-diffY/30;
				}
			});
			drawAll();

		}
		if(askzoom2) {
			var diffX = forZoom[0]-event.pageX;
			var diffY = forZoom[1]-event.pageY;
			$.each(mainFigure.points, function( index, value ) {
				if(value!='niente') {
					// var diffY = forZoom[1]-event.pageY;
					// if(diffY<0) {

					// value[0] = value[0]/1.01;
					// value[1] = value[1]/1.01;
					// value[0] = value[0]+2.01;
					// value[1] = value[1]+2.01;

					// } else {
						value[0] = value[0]*1.01;
						value[1] = value[1]*1.01;
						value[0] = value[0]-2.01;
						value[1] = value[1]-2.01;
					// }
				}
			});
			var diffX = forZoom[0]-event.pageX;
			var diffY = forZoom[1]-event.pageY;
			$.each(mainFigure.points, function( index, value ) {
				if(value!='niente') {
					value[0] = value[0]-diffX/30;
					value[1] = value[1]-diffY/30;
				}
			});
			drawAll();
		}
		if(askzoom2M) {
			var diffX = forZoom2[0]-event.pageX;
			var diffY = forZoom2[1]-event.pageY;
			$.each(mainFigure.points, function( index, value ) {
				if(value!='niente') {
					value[0] = value[0]/1.01;
					value[1] = value[1]/1.01;
					value[0] = value[0]+2.01;
					value[1] = value[1]+2.01;
				}
			});
			var diffX = forZoom2[0]-event.pageX;
			var diffY = forZoom2[1]-event.pageY;
			$.each(mainFigure.points, function( index, value ) {
				if(value!='niente') {
					value[0] = value[0]-diffX/30;
					value[1] = value[1]-diffY/30;
				}
			});
			drawAll();
		}
	});
	$('body').on('click', function(event) {
		if(askpoint) {
			//askpoint=false;
			var selezionato = false;
			var indo;
			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					indo = index;
				}
			});
			if(selezionato) {
				console.log('cè già');
			}
			else {
				var calcCircle = isOnTheCircle(event.pageX,event.pageY);
				var isoncircle = calcCircle[0];
				var curcircle = calcCircle[1];
				var curcircle2 = calcCircle[2];
				var circlecounter = calcCircle[3];
				var circlesIntercepted = calcCircle[4];
				var calcLine = isOnTheLine(event.pageX,event.pageY);
				var isonline = calcLine[0];
				var whichline = calcLine[1];
				var linecounter = calcLine[2];
				var linesIntercepted = calcLine[3];
				if(isoncircle && isonline) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
					drawAll();
				}
				else if(circlecounter>=2) {
					var h1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0];
		 		 	var k1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][1]
					var r1 = Math.sqrt( a*a + b*b );
					var h2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0];
		 		 	var k2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][1]
					var r2 = Math.sqrt( a*a + b*b );
					var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
					if(ass!=false) {
						mainFigure.points.push([event.pageX,event.pageY,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
						drawAll();
					}
				}
				else if(linecounter>=2) {
					var linea1stx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][0];
					var linea1sty = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][1];
					var linea1enx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][0];
					var linea1eny = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][1];
					var linea2stx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][0];
					var linea2sty = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][1];
					var linea2enx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][0];
					var linea2eny = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][1];
					var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
					mainFigure.points.push([asss.x,asss.y,1,1,1,1,'line-line',linesIntercepted[0],linesIntercepted[1]]);
					drawAll();
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					drawAll();
				}
				else {
					if(isonline) {
						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
						var c = Math.sqrt( a*a + b*b );
						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
						var d = Math.sqrt( a*a + b*b );
						mainFigure.points.push([event.pageX,event.pageY,whichline,((c-d)*100/c)]);
						drawAll();
					}
					else {
						mainFigure.points.push([event.pageX,event.pageY]);
						drawAll();
					}
				}
			}
		}
		if(askline1) {
			var selezionato = false;
			var indo;
			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					indo = index;
				}
			});
			if(selezionato) {
				askline1 = false;
				setTimeout(function(){ askline2 = true; }, 10);
				line1temp = indo;
			}
			else {
				var calcCircle = isOnTheCircle(event.pageX,event.pageY);
				var isoncircle = calcCircle[0];
				var curcircle = calcCircle[1];
				var curcircle2 = calcCircle[2];
				var circlecounter = calcCircle[3];
				var circlesIntercepted = calcCircle[4];
				var calcLine = isOnTheLine(event.pageX,event.pageY);
				var isonline = calcLine[0];
				var whichline = calcLine[1];
				var linecounter = calcLine[2];
				var linesIntercepted = calcLine[3];
				if(isoncircle && isonline) {
					askline1 = false;
					setTimeout(function(){ askline2 = true; }, 10);
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
					line1temp = mainFigure.points.length-1;
					drawAll();
				}
				else if(circlecounter>=2) {
					askline1 = false;
					setTimeout(function(){ askline2 = true; }, 10);
					var h1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0];
		 		 	var k1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][1]
					var r1 = Math.sqrt( a*a + b*b );
					var h2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0];
		 		 	var k2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][1]
					var r2 = Math.sqrt( a*a + b*b );
					var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
					if(ass!=false) {
						mainFigure.points.push([event.pageX,event.pageY,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
						line1temp = mainFigure.points.length-1;
						drawAll();
					}
				}
				else if(linecounter>=2) {
					askline1 = false;
					setTimeout(function(){ askline2 = true; }, 10);
					var linea1stx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][0];
					var linea1sty = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][1];
					var linea1enx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][0];
					var linea1eny = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][1];
					var linea2stx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][0];
					var linea2sty = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][1];
					var linea2enx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][0];
					var linea2eny = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][1];
					var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
					mainFigure.points.push([asss.x,asss.y,1,1,1,1,'line-line',linesIntercepted[0],linesIntercepted[1]]);
					line1temp = mainFigure.points.length-1;
					drawAll();
				}
				else if(isoncircle) {
					askline1 = false;
					setTimeout(function(){ askline2 = true; }, 10);
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					line1temp = mainFigure.points.length-1;
					drawAll();
				}
				else {
					if(isonline) {
						askline1 = false;
						setTimeout(function(){ askline2 = true; }, 10);

						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
						var c = Math.sqrt( a*a + b*b );
						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
						var d = Math.sqrt( a*a + b*b );
						mainFigure.points.push([event.pageX,event.pageY,whichline,((c-d)*100/c)]);
						line1temp = mainFigure.points.length-1;
						drawAll();
					}
					else {
						askline1 = false;
						setTimeout(function(){ askline2 = true; }, 10);
						mainFigure.points.push([event.pageX,event.pageY]);
						line1temp = mainFigure.points.length-1;
						drawAll();
					}
				}



			}
		}
		if(askline2) {
			var selezionato = false;
			var indo;
			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					indo = index;
				}
			});
			if(selezionato) {
				askline2 = false;
				askline1 = true;
				mainFigure.lines.push([line1temp,indo]);
				drawAll();

			}
			else {
				var calcCircle = isOnTheCircle(event.pageX,event.pageY);
				var isoncircle = calcCircle[0];
				var curcircle = calcCircle[1];
				var curcircle2 = calcCircle[2];
				var circlecounter = calcCircle[3];
				var circlesIntercepted = calcCircle[4];
				var calcLine = isOnTheLine(event.pageX,event.pageY);
				var isonline = calcLine[0];
				var whichline = calcLine[1];
				var linecounter = calcLine[2];
				var linesIntercepted = calcLine[3];
				if(isoncircle && isonline) {
					askline2 = false;
					askline1 = true;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
					drawAll();
				}else if(circlecounter>=2) {
					askline2 = false;
					askline1 = true;
					var h1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0];
		 		 	var k1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][1]
					var r1 = Math.sqrt( a*a + b*b );
					var h2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0];
		 		 	var k2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][1]
					var r2 = Math.sqrt( a*a + b*b );
					var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
					if(ass!=false) {
						mainFigure.points.push([event.pageX,event.pageY,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
						mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
						drawAll();
					}

				}
				else if(linecounter>=2) {
					askline2 = false;
					askline1 = true;
					var linea1stx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][0];
					var linea1sty = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][1];
					var linea1enx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][0];
					var linea1eny = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][1];
					var linea2stx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][0];
					var linea2sty = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][1];
					var linea2enx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][0];
					var linea2eny = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][1];
					var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
					mainFigure.points.push([asss.x,asss.y,1,1,1,1,'line-line',linesIntercepted[0],linesIntercepted[1]]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
					drawAll();
				}
				else if(isoncircle) {
					askline2 = false;
					askline1 = true;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
					drawAll();
				}
				else if(isonline) {
					askline2 = false;
					askline1 = true;
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
					var c = Math.sqrt( a*a + b*b );
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
					var d = Math.sqrt( a*a + b*b );
					mainFigure.points.push([event.pageX,event.pageY,whichline,((c-d)*100/c)]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
					drawAll();
				}
				else {
					askline2 = false;
					askline1 = true;
					mainFigure.points.push([event.pageX,event.pageY]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
					drawAll();
				}
			}
		}
		if(askcircle) {
			var selezionato = false;
			var indo;
			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					indo = index;
				}
			});
			if(selezionato) {
				askcircle=false;
				setTimeout(function(){ askcircle2 = true; }, 10);
				centertemp = indo;
			}
			else {
				var calcCircle = isOnTheCircle(event.pageX,event.pageY);
				var isoncircle = calcCircle[0];
				var curcircle = calcCircle[1];
				var curcircle2 = calcCircle[2];
				var circlecounter = calcCircle[3];
				var circlesIntercepted = calcCircle[4];
				var calcLine = isOnTheLine(event.pageX,event.pageY);
				var isonline = calcLine[0];
				var whichline = calcLine[1];
				var linecounter = calcLine[2];
				var linesIntercepted = calcLine[3];
				if(isoncircle && isonline) {
					askcircle = false;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
					setTimeout(function(){ askcircle2 = true; }, 10);
					centertemp = mainFigure.points.length-1;
					drawAll();
				}
				else if(circlecounter>=2) {
					askcircle = false;
					var h1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0];
		 		 	var k1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][1]
					var r1 = Math.sqrt( a*a + b*b );
					var h2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0];
		 		 	var k2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][1]
					var r2 = Math.sqrt( a*a + b*b );
					var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
					if(ass!=false) {
						mainFigure.points.push([event.pageX,event.pageY,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
						setTimeout(function(){ askcircle2 = true; }, 10);
						centertemp = mainFigure.points.length-1;
						drawAll();
					}
				}
				else if(linecounter>=2) {
					askcircle = false;
					var linea1stx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][0];
					var linea1sty = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][1];
					var linea1enx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][0];
					var linea1eny = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][1];
					var linea2stx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][0];
					var linea2sty = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][1];
					var linea2enx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][0];
					var linea2eny = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][1];
					var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
					mainFigure.points.push([asss.x,asss.y,1,1,1,1,'line-line',linesIntercepted[0],linesIntercepted[1]]);
					setTimeout(function(){ askcircle2 = true; }, 10);
					centertemp = mainFigure.points.length-1;
					drawAll();
				}
				else if(isoncircle) {
					askcircle = false;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					setTimeout(function(){ askcircle2 = true; }, 10);
					centertemp = mainFigure.points.length-1;
					drawAll();
				}
				else if(isonline) {
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
					var c = Math.sqrt( a*a + b*b );
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
					var d = Math.sqrt( a*a + b*b );
					askcircle=false;
					setTimeout(function(){ askcircle2 = true; }, 10);
					mainFigure.points.push([event.pageX,event.pageY,whichline,((c-d)*100/c)]);
					centertemp = mainFigure.points.length-1;
					drawAll();
				}
				else {
					askcircle=false;
					mainFigure.points.push([event.pageX,event.pageY]);
					centertemp = mainFigure.points.length-1;
					setTimeout(function(){ askcircle2 = true; }, 10);
					drawAll();
				}
			}
		}
		if(askcircle2) {
			var selezionato = false;
			var indo;
			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					indo = index;
				}
			});
			if(selezionato) {
				askcircle2 = false;
				askcircle = true;
				mainFigure.circles.push([centertemp,indo])
				drawAll();

			}
			else {
				var calcCircle = isOnTheCircle(event.pageX,event.pageY);
				var isoncircle = calcCircle[0];
				var curcircle = calcCircle[1];
				var curcircle2 = calcCircle[2];
				var circlecounter = calcCircle[3];
				var circlesIntercepted = calcCircle[4];
				var calcLine = isOnTheLine(event.pageX,event.pageY);
				var isonline = calcLine[0];
				var whichline = calcLine[1];
				var linecounter = calcLine[2];
				var linesIntercepted = calcLine[3];
				if(isoncircle && isonline) {
					askcircle2 = false;
					askcircle = true;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
					drawAll();
				}
				else if(circlecounter>=2) {
					askcircle2 = false;
					askcircle = true;
					var h1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0];
		 		 	var k1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][1]
					var r1 = Math.sqrt( a*a + b*b );
					var h2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0];
		 		 	var k2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][1]
					var r2 = Math.sqrt( a*a + b*b );
					var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
					if(ass!=false) {
						mainFigure.points.push([event.pageX,event.pageY,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
						mainFigure.circles.push([centertemp,mainFigure.points.length-1])
						drawAll();
					}
				}
				else if(linecounter>=2) {
					askcircle2 = false;
					askcircle = true;
					var linea1stx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][0];
					var linea1sty = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][1];
					var linea1enx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][0];
					var linea1eny = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][1];
					var linea2stx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][0];
					var linea2sty = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][1];
					var linea2enx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][0];
					var linea2eny = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][1];
					var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
					mainFigure.points.push([asss.x,asss.y,1,1,1,1,'line-line',linesIntercepted[0],linesIntercepted[1]]);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
					drawAll();
				}
				else if(isoncircle) {
					askcircle2 = false;
					askcircle = true;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
					drawAll();
				}
				else if(isonline) {
					askcircle2 = false;
					askcircle = true;
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
					var c = Math.sqrt( a*a + b*b );
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
					var d = Math.sqrt( a*a + b*b );
					mainFigure.points.push([event.pageX,event.pageY,whichline,((c-d)*100/c)]);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
					drawAll();
				}
				else {
					askcircle2 = false;
					askcircle = true;
					mainFigure.points.push([event.pageX,event.pageY]);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
					drawAll();
				}
			}
		}
		if(askmedium) {
			if(pointer!='undefined') {
				askmedium = false;
				forMedium.push(pointer);
				setTimeout(function(){ askmedium2 = true; }, 10);
			}
		}
		if(askmedium2) {
			if(pointer!='undefined') {
				askmedium2 = false;
				forMedium.push(pointer);
				var medio =  medioPoint(mainFigure.points[forMedium[0]],mainFigure.points[forMedium[1]]);
				mainFigure.points.push([medio[0],medio[1],1,1,1,1,'medio',forMedium[0],forMedium[1]]);
				drawAll()
			}
		}
		if(askerase) {
			if(pointer2!='undefined') {
				if(pointer2[0]=='point') {
					cancella(pointer2[1]);
				}
				drawAll()
			}
		}
		if(askretta1) {
			var selezionato = false;
			var indo;
			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					indo = index;
				}
			});
			if(selezionato) {
				askretta1 = false;
				setTimeout(function(){ askretta2 = true; }, 10);
				line1temp = indo;
			}
			else {
				var calcCircle = isOnTheCircle(event.pageX,event.pageY);
				var isoncircle = calcCircle[0];
				var curcircle = calcCircle[1];
				var curcircle2 = calcCircle[2];
				var circlecounter = calcCircle[3];
				var circlesIntercepted = calcCircle[4];
				var calcLine = isOnTheLine(event.pageX,event.pageY);
				var isonline = calcLine[0];
				var whichline = calcLine[1];
				var linecounter = calcLine[2];
				var linesIntercepted = calcLine[3];
				if(isoncircle && isonline) {
					askretta1 = false;
					setTimeout(function(){ askretta2 = true; }, 10);
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
					line1temp = mainFigure.points.length-1;
					drawAll();
				}
				else if(circlecounter>=2) {
					askretta1 = false;
					setTimeout(function(){ askretta2 = true; }, 10);
					var h1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0];
		 		 	var k1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][1]
					var r1 = Math.sqrt( a*a + b*b );
					var h2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0];
		 		 	var k2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][1]
					var r2 = Math.sqrt( a*a + b*b );
					var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
					if(ass!=false) {
						mainFigure.points.push([event.pageX,event.pageY,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
						line1temp = mainFigure.points.length-1;
						drawAll();
					}
				}
				else if(linecounter>=2) {
					askretta1 = false;
					setTimeout(function(){ askretta2 = true; }, 10);
					var linea1stx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][0];
					var linea1sty = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][1];
					var linea1enx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][0];
					var linea1eny = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][1];
					var linea2stx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][0];
					var linea2sty = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][1];
					var linea2enx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][0];
					var linea2eny = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][1];
					var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
					mainFigure.points.push([asss.x,asss.y,1,1,1,1,'line-line',linesIntercepted[0],linesIntercepted[1]]);
					line1temp = mainFigure.points.length-1;
					drawAll();
				}
				else if(isoncircle) {
					askretta1 = false;
					setTimeout(function(){ askretta2 = true; }, 10);
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					line1temp = mainFigure.points.length-1;
					drawAll();
				}
				else {
					if(isonline) {
						askretta1 = false;
						setTimeout(function(){ askretta2 = true; }, 10);

						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
						var c = Math.sqrt( a*a + b*b );
						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
						var d = Math.sqrt( a*a + b*b );
						mainFigure.points.push([event.pageX,event.pageY,whichline,((c-d)*100/c)]);
						line1temp = mainFigure.points.length-1;
						drawAll();
					}
					else {
						askretta1 = false;
						setTimeout(function(){ askretta2 = true; }, 10);
						mainFigure.points.push([event.pageX,event.pageY]);
						line1temp = mainFigure.points.length-1;
						drawAll();
					}
				}



			}
		}
		if(askretta2) {
			var selezionato = false;
			var indo;
			$.each(mainFigure.points, function( index, value ) {
		 		if(
					value[0]<event.pageX+hitDistance &&
					value[0]>event.pageX-hitDistance &&
					value[1]<event.pageY+hitDistance &&
					value[1]>event.pageY-hitDistance
					)
				{
					selezionato = true;
					indo = index;
				}
			});
			if(selezionato) {
				askretta2 = false;
				askretta1 = true;
				mainFigure.lines.push([line1temp,indo]);
				drawAll();

			}
			else {
				var calcCircle = isOnTheCircle(event.pageX,event.pageY);
				var isoncircle = calcCircle[0];
				var curcircle = calcCircle[1];
				var curcircle2 = calcCircle[2];
				var circlecounter = calcCircle[3];
				var circlesIntercepted = calcCircle[4];
				var calcLine = isOnTheLine(event.pageX,event.pageY);
				var isonline = calcLine[0];
				var whichline = calcLine[1];
				var linecounter = calcLine[2];
				var linesIntercepted = calcLine[3];
				if(isoncircle && isonline) {
					askretta2 = false;
					askretta1 = true;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
					drawAll();
				}else if(circlecounter>=2) {
					askretta2 = false;
					askretta1 = true;
					var h1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0];
		 		 	var k1 = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[0]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[0]][1]][1]
					var r1 = Math.sqrt( a*a + b*b );
					var h2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0];
		 		 	var k2 = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1];
					var a = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][0] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][0]
					var b = mainFigure.points[mainFigure.circles[circlesIntercepted[1]][0]][1] - mainFigure.points[mainFigure.circles[circlesIntercepted[1]][1]][1]
					var r2 = Math.sqrt( a*a + b*b );
					var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
					if(ass!=false) {
						mainFigure.points.push([event.pageX,event.pageY,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
						mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
						drawAll();
					}

				}
				else if(linecounter>=2) {
					askretta2 = false;
					askretta1 = true;
					var linea1stx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][0];
					var linea1sty = mainFigure.points[mainFigure.lines[linesIntercepted[0]][0]][1];
					var linea1enx = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][0];
					var linea1eny = mainFigure.points[mainFigure.lines[linesIntercepted[0]][1]][1];
					var linea2stx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][0];
					var linea2sty = mainFigure.points[mainFigure.lines[linesIntercepted[1]][0]][1];
					var linea2enx = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][0];
					var linea2eny = mainFigure.points[mainFigure.lines[linesIntercepted[1]][1]][1];
					var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
					mainFigure.points.push([asss.x,asss.y,1,1,1,1,'line-line',linesIntercepted[0],linesIntercepted[1]]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
					drawAll();
				}
				else if(isoncircle) {
					askretta2 = false;
					askretta1 = true;
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
					drawAll();
				}
				else if(isonline) {
					askretta2 = false;
					askretta1 = true;
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
					var c = Math.sqrt( a*a + b*b );
					var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
					var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
					var d = Math.sqrt( a*a + b*b );
					mainFigure.points.push([event.pageX,event.pageY,whichline,((c-d)*100/c)]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
					drawAll();
				}
				else {
					askretta2 = false;
					askretta1 = true;
					mainFigure.points.push([event.pageX,event.pageY]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
					drawAll();
				}
			}
		}
	});
	$('body').on('click', '.primary', function(event) {
		event.preventDefault();
		askpoint = false;
		askcircle=false;
		askline1=false;
		askretta1=false;
		askmedium=false;
		askerase = false;
		askselect = false;
		askmove2 = false;
		askmove = false;
		askzoom = false;
		askzoom2 = false;
		askzoomM = false;
		askzoom2M = false;

	});
	$('body').on('click', '.primary .label', function(event) {
		event.preventDefault();
		$('.primary div[id][class!="selected"]').hide();
		$('.primary div[id][class*="selected"]').show();
		$(this).nextAll('div[id]').css('display', 'block');
		$('div').removeClass('inuse');
	});
	$('body').on('click', '.primary > div[id]', function(event) {
		event.preventDefault();
		$('div').removeClass('inuse');
		var selected = $(this).attr('id');
		var curPrimary = $(this).parent('div');
		curPrimary.find('.selected').remove();
		$('.primary').find('div[id][class!="selected"]').hide();
		curPrimary.prepend("<div id='"+selected+"' class='selected inuse'></div>");
	});
	$('body').on('click', '.primary #point', function(event) {
		setTimeout(function(){ askpoint=true; }, 10);
	});
	$('body').on('click', '.primary #zoom', function(event) {
		setTimeout(function(){ askzoom=true; }, 10);
	});
		$('body').on('click', '.primary #zoomm', function(event) {
		setTimeout(function(){ askzoomM=true; }, 10);
	});
	$('body').on('click', '.primary #line', function(event) {
		setTimeout(function(){ askline1=true; }, 10);
	});
	$('body').on('click', '.primary #circle', function(event) {
		setTimeout(function(){ askcircle=true; }, 10);
	});
	$('body').on('click', '.primary #medium', function(event) {
		forMedium = [];
		setTimeout(function(){ askmedium=true; }, 10);
	});
	$('body').on('click', '.primary #cancel', function(event) {
		setTimeout(function(){ askerase=true; }, 10);
	});
		$('body').on('click', '.primary #retta', function(event) {
		setTimeout(function(){ askretta1=true; }, 10);
	});
	$('body').on('click', '.primary #select', function(event) {
		setTimeout(function(){ askselect=true; }, 10);
	});
	$('body').on('click', '.primary #move', function(event) {
		setTimeout(function(){ askmove=true; }, 10);
	});
	$('body').on('click', '.primary #save', function(event) {
		localStorage.setItem('canvas', JSON.stringify(mainFigure));
	});
	$('body').on('click', '.primary #visector', function(event) {
		drawAllT();
	});
	$('body').on('click', '.primary #clear', function(event) {
		mainFigure = {'points':[],'lines':[],'circles':[]};
		drawAll();
	});
	$('body').on('click', '.primary #load', function(event) {
		var retrievedObject = localStorage.getItem('canvas');
		if(retrievedObject != null) {
			mainFigure = JSON.parse(retrievedObject);
		}
		drawAll();
	});
});
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = $(window).width();
var canvasHeight = $(window).height();
var down = false;
var pointer;
var pointer2;
var askpoint = false;
var askline1 = false;
var askline2 = false;
var askretta1 = false;
var askretta2 = false;
var askcircle = false;
var askcircle2 = false;
var askmedium = false;
var askmedium2 = false;
var askselect = false;
var askmove = false;
var askmove2 = false;
var forMove = [];
var askerase = false;
var askzoom = false;
var askzoom2 = false;
var askzoomM = false;
var askzoom2M = false;
var forZoom = [];
var forZoom2 = [];
var forMedium = [];
var line1temp;
var centertemp;
var mainFigure = {'points':[],'lines':[],'circles':[]};
canvas.width = canvasWidth;
canvas.height = canvasHeight;

function isOnTheLine(uno,due) {
	var isonline = false;
	var whichline;
	var linecounter = 0;
	var linesIntercepted = [];
	$.each(mainFigure.lines, function( index, value ) {
		if(value!='niente') {
		var isretta = value[2]!=undefined;
		var ano = IsPointOnLine(mainFigure.points[value[0]],mainFigure.points[value[1]],[uno,due],isretta)
			if(ano){
				isonline = true;
				whichline = index;
				linecounter++;
				linesIntercepted.push(index);
			}
		}
	});
	return [isonline,whichline,linecounter,linesIntercepted]
}
function isOnTheCircle(uno,due) {
	var isoncircle = false;
	var curcircle;
	var curcircle2;
	var circlecounter = 0;
	var circlesIntercepted = [];
	$.each(mainFigure.circles, function( index, value ) {
		if(value!='niente') {
			var precision = 10;
			var a = mainFigure.points[value[0]][0] - mainFigure.points[value[1]][0]
			var b = mainFigure.points[value[0]][1] - mainFigure.points[value[1]][1]
			var curRadius = Math.sqrt( a*a + b*b );
			var a = mainFigure.points[value[0]][0] - uno
			var b = mainFigure.points[value[0]][1] - due
			var curPoint = Math.sqrt( a*a + b*b );
			var ano = Math.abs(curPoint-curRadius)<10;
			if(ano){
				isoncircle = true;
				curcircle = value[0];
				curcircle2 = index;
				circlecounter++;
				circlesIntercepted.push(index);
			}
		}
	});
	return [isoncircle,curcircle,curcircle2,circlecounter,circlesIntercepted]
}
function isPointOnCircle(uno,due,circle) {
		var isoncircle = false;
		var value = mainFigure.circles[circle];
		var precision = 10;
		var a = mainFigure.points[value[0]][0] - mainFigure.points[value[1]][0]
		var b = mainFigure.points[value[0]][1] - mainFigure.points[value[1]][1]
		var curRadius = Math.sqrt( a*a + b*b );
		var a = mainFigure.points[value[0]][0] - uno
		var b = mainFigure.points[value[0]][1] - due
		var curPoint = Math.sqrt( a*a + b*b );
		var ano = Math.abs(curPoint-curRadius)<10;
		if(ano){
			isoncircle = true;
		}
	return isoncircle
}
function cancella(val) {
	var toerase = [];
	$.each(mainFigure.lines, function( index, value ) {
		if(value[0]==val || value[1]==val) {
			console.log('cancellare linea '+index)
			var isretta = value[2]!=undefined;
			$.each(mainFigure.points, function( index2, value2 ) {
				if(IsPointOnLine(mainFigure.points[value[0]],mainFigure.points[value[1]],value2,isretta)) {
					if(value[0]!=index2 && value[1]!=index2 && value[3]!=undefined)
					toerase.push(index2);
				}
			});
			mainFigure.lines[index] = ['niente'];
		}
	});
	var toerase2 = [];
	$.each(mainFigure.circles, function( index, value ) {
		if(value[0]==val || value[1]==val) {
			console.log('cancellare cerchio '+index)
			$.each(mainFigure.points, function( index2, value2 ) {
				if(isPointOnCircle(value2[0],value2[1],index)) {
					if(value[0]!=index2 && value[1]!=index2)
					toerase2.push(index2);
				}
			});
			mainFigure.circles[index] = ['niente'];
		}
	});
	mainFigure.points[pointer2[1]] = 'niente';
	$.each(toerase, function( index, value ) {
		cancella(value);
	});
	$.each(toerase2, function( index, value ) {
		cancella(value);
	});
}

function drawAll(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	$.each(mainFigure.lines, function( index, value ) {
		if(value!='niente') {
			if(value[2]==undefined) {
			drawLine([mainFigure.points[value[0]][0],mainFigure.points[value[0]][1],mainFigure.points[value[1]][0],mainFigure.points[value[1]][1]]);
			} else {
				var before = getLineXY(mainFigure.points[value[0]], mainFigure.points[value[1]], -140.9);
				var after = getLineXY(mainFigure.points[value[0]], mainFigure.points[value[1]], 150.9);
				ctx.beginPath();
			    ctx.moveTo(before[0], before[1]);
			    ctx.lineTo(after[0], after[1]);
			    ctx.stroke();
			}
		}
	});
	$.each(mainFigure.circles, function( index, value ) {
		if(value!='niente') {
			var a = mainFigure.points[value[0]][0] - mainFigure.points[value[1]][0]
			var b = mainFigure.points[value[0]][1] - mainFigure.points[value[1]][1]
			var c = Math.sqrt( a*a + b*b );
			drawCirlce2(mainFigure.points[value[0]][0],mainFigure.points[value[0]][1],c);
		}
	});
	$.each(mainFigure.points, function( index, value ) {
		if(mainFigure.points[index]!='niente') {
	 		if(value[2]!=undefined && value[5]==undefined && value[8]==undefined  && mainFigure.lines[value[2]]!='niente') {
				var a = waypoint(mainFigure.points[mainFigure.lines[value[2]][0]], mainFigure.points[mainFigure.lines[value[2]][1]], 1-(value[3]/100));
				mainFigure.points[index]= [a[0],a[1],value[2],value[3]] ;
				drawPoint(a[0],a[1],5,'black');
	 		} else if(value[5]==undefined && value[8]==undefined && mainFigure.lines[value[2]]!='niente') {
	 		 	drawPoint(value[0],value[1],5,'red');
	 		}
	 		if(value[3]=='circular' && mainFigure.circles[value[4]]!='niente') {
	 		 	//currcircle
	 		 	var point1 = mainFigure.circles[value[4]][0]
	 		 	var point2 = mainFigure.circles[value[4]][1]
	 		 	var a = mainFigure.points[point1][0] - mainFigure.points[point2][0]
				var b = mainFigure.points[point1][1] - mainFigure.points[point2][1]
				var len = Math.sqrt( a*a + b*b );
				var angle = value[5];
				mainFigure.points[index] = [mainFigure.points[point1][0] + Math.cos(angle) * len,mainFigure.points[point1][1] +  Math.sin(angle) * len,value[2],value[3],value[4],value[5]] ;
				drawPoint(mainFigure.points[index][0],mainFigure.points[index][1],5,'blue');
	 		}
	 		if(value[6]=='line-circle' && mainFigure.lines[mainFigure.points[index][7]]!='niente' && mainFigure.circles[mainFigure.points[index][8]]!='niente') {
	 		 	var x1 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][0]][0];
	 		 	var y1 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][0]][1];
	  		 	var x2 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][1]][0];
	 		 	var y2 = mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][1]][1];
	 		 	var m = (y1-y2)/(x1-x2);
	 		 	var n = (-x1*m)+y1;
	 		 	var h = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][0];
	 		 	var k = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][1];
				var ar = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][0] - mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][1]][0]
				var ba = mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][0]][1] - mainFigure.points[mainFigure.circles[mainFigure.points[index][8]][1]][1]
				var r = Math.sqrt( ar*ar + ba*ba );
	 		 	var intersections = findCircleLineIntersections(r, h, k, m, n);
	 		 	if(intersections!=false) {
	 		 		var isretta = mainFigure.lines[mainFigure.points[index][7]][2]!=undefined;
		 		 	var condition1 = intersections[0]!=undefined && IsPointOnLine(mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][0]],mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][1]],intersections[0],isretta);
		 		 	var condition2 = intersections[1]!=undefined && IsPointOnLine(mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][0]],mainFigure.points[mainFigure.lines[mainFigure.points[index][7]][1]],intersections[1],isretta);

		 		 	if(condition1 && condition2) {
		 		 		var dist1 = distanceBetween2(mainFigure.points[index],intersections[0]);
		 		 		var dist2 = distanceBetween2(mainFigure.points[index],intersections[1]);
		 		 		if(dist1>dist2) {
		 		 			condition1 = false;
		 		 			condition2 = true;
		 		 		} else {
		 		 			condition1 = true;
		 		 			condition2 = false;
		 		 		}
		 		 	}
		 		 	if(condition1 && intersections[0]!=undefined) {
		 		 		mainFigure.points[index] = [intersections[0][0],intersections[0][1],value[2],value[3],value[4],value[5],value[6],value[7],value[8]] ;
		 		 		drawPoint(intersections[0][0],intersections[0][1],5,'yellow');
		 		 	}
		 		 	else if(condition2  && intersections[1]!=undefined) {
		 		 		mainFigure.points[index] = [intersections[1][0],intersections[1][1],value[2],value[3],value[4],value[5],value[6],value[7],value[8]] ;
		 		 		drawPoint(intersections[1][0],intersections[1][1],5,'yellow');
		 		 	}
	 		 	}
	 		 	else {

	 		 	}
	 		}
	 		else if(value[6]=='line-line'  && mainFigure.lines[value[7]]!='niente'   && mainFigure.lines[value[8]]!='niente') {
				var linea1stx = mainFigure.points[mainFigure.lines[value[7]][0]][0];
				var linea1sty = mainFigure.points[mainFigure.lines[value[7]][0]][1];
				var linea1enx = mainFigure.points[mainFigure.lines[value[7]][1]][0];
				var linea1eny = mainFigure.points[mainFigure.lines[value[7]][1]][1];
				var linea2stx = mainFigure.points[mainFigure.lines[value[8]][0]][0];
				var linea2sty = mainFigure.points[mainFigure.lines[value[8]][0]][1];
				var linea2enx = mainFigure.points[mainFigure.lines[value[8]][1]][0];
				var linea2eny = mainFigure.points[mainFigure.lines[value[8]][1]][1];
				var asss = checkLineIntersection(linea1stx,linea1sty,linea1enx,linea1eny,linea2stx,linea2sty,linea2enx,linea2eny);
				if(asss.onLine1 && asss.onLine2) {
	 				mainFigure.points[index] = [asss.x,asss.y,value[2],value[3],value[4],value[5],value[6],value[7],value[8]] ;
	 		 		drawPoint(asss.x,asss.y,5,'yellow');
	 		 	} else {
	 		 		console.log('smontare')
	 		 	}
	 		}
	 		else if(value[6]=='circle-circle'  && mainFigure.circles[value[7]]!='niente' && mainFigure.circles[value[8]]!='niente') {
				var h1 = mainFigure.points[mainFigure.circles[value[7]][0]][0];
	 		 	var k1 = mainFigure.points[mainFigure.circles[value[7]][0]][1];
				var a = mainFigure.points[mainFigure.circles[value[7]][0]][0] - mainFigure.points[mainFigure.circles[value[7]][1]][0]
				var b = mainFigure.points[mainFigure.circles[value[7]][0]][1] - mainFigure.points[mainFigure.circles[value[7]][1]][1]
				var r1 = Math.sqrt( a*a + b*b );
				var h2 = mainFigure.points[mainFigure.circles[value[8]][0]][0];
	 		 	var k2 = mainFigure.points[mainFigure.circles[value[8]][0]][1];
				var a = mainFigure.points[mainFigure.circles[value[8]][0]][0] - mainFigure.points[mainFigure.circles[value[8]][1]][0]
				var b = mainFigure.points[mainFigure.circles[value[8]][0]][1] - mainFigure.points[mainFigure.circles[value[8]][1]][1]
				var r2 = Math.sqrt( a*a + b*b );
				var ass = findCircleCircleIntersections(h1,k1,r1,h2,k2,r2)
				if(ass!=false) {

					var dista1 = distanceBetween2(mainFigure.points[index],ass[0]);
					var dista2 = distanceBetween2(mainFigure.points[index],ass[1]);
					if(dista2>=dista1) {
						mainFigure.points[index] = [ass[0][0],ass[0][1],value[2],value[3],value[4],value[5],value[6],value[7],value[8]] ;
	 		 			drawPoint(ass[0][0],ass[0][1],5,'yellow');
					} else {
						mainFigure.points[index] = [ass[1][0],ass[1][1],value[2],value[3],value[4],value[5],value[6],value[7],value[8]] ;
	 		 			drawPoint(ass[1][0],ass[1][1],5,'yellow');
					}

	 		 	} else {
	 		 		console.log('intersezione andata')
	 		 		console.log(mainFigure.points[index]='niente')
	 		 	}
	 		}
	 		else if(value[6]=='medio' && mainFigure.points[index][7]!='niente') {
	 			var medio =  medioPoint(mainFigure.points[value[7]],mainFigure.points[value[8]]);
				mainFigure.points[index] = [medio[0],medio[1],1,1,1,1,'medio',value[7],value[8]];
				drawPoint(mainFigure.points[index][0],mainFigure.points[index][1],5,'green');
	 		}
 		} else {
 			mainFigure.points[index] = [];
 		}
	});
}
function drawAllT(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	$.each(mainFigure.lines, function( index, value ) {
		if(value!='niente')
		drawLine([mainFigure.points[value[0]][0],mainFigure.points[value[0]][1],mainFigure.points[value[1]][0],mainFigure.points[value[1]][1]]);

	});
	$.each(mainFigure.circles, function( index, value ) {
		if(value!='niente') {
			var a = mainFigure.points[value[0]][0] - mainFigure.points[value[1]][0]
			var b = mainFigure.points[value[0]][1] - mainFigure.points[value[1]][1]
			var c = Math.sqrt( a*a + b*b );
			drawCirlce2(mainFigure.points[value[0]][0],mainFigure.points[value[0]][1],c);
		}
	});
	$.each(mainFigure.points, function( index, value ) {
		if(mainFigure.points[index]!='niente') {
			drawPoint(mainFigure.points[index][0],mainFigure.points[index][1],5,'orange');
		}
	});
}
function getLineXY(startPt, endPt, extent) {
    var dx = endPt[0] - startPt[0];
    var dy = endPt[1] - startPt[1];
    var X = startPt[0] + dx * extent;
    var Y = startPt[1] + dy * extent;
    return [X,Y]
}
