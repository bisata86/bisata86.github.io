var isMobile = detectmob();
var hitDistance = 5;
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
var askrettaperp1 = false;
var askrettaperp2 = false;
var askrettapar1 = false;
var askrettapar2 = false;
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
var selezionatow = false;
var showhide = false;
var pointer23;
var line1temp;
var perptemp;
var centertemp;
var mainFigure = {'points':[],'lines':[],'circles':[]};
canvas.width = canvasWidth;
canvas.height = canvasHeight;
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
		if(true) {
			pointer23 = [];
			selezionatow = false;
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
						selezionatow = true;
						pointer23 = ['circle',index];
					}
				}
			});

			$.each(mainFigure.lines, function( index, value ) {
				if(value!='niente') {
					var isretta = value[2]!=undefined;
					var ano = IsPointOnLine(mainFigure.points[value[0]],mainFigure.points[value[1]],[event.pageX,event.pageY],isretta)
					if(ano){
						selezionatow = true;
						pointer23 = ['line',index];
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
					selezionatow = true;
					pointer23 = ['point',index];

				}
			});
			drawAll();
		}
		if(down && askselect) {
			if(pointer!=undefined && mainFigure.points[pointer][mainFigure.points[pointer].length-1]!='hided') {
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
				if(mainFigure.points[pointer][2]!=undefined && mainFigure.points[pointer][5]==undefined && mainFigure.points[pointer][8]==undefined  && mainFigure.lines[mainFigure.points[pointer][2]]!='niente') {
						console.log(mainFigure.points[pointer])
						var whichline = mainFigure.points[pointer][2];
						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
						var c = Math.sqrt( a*a + b*b );
						var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - event.pageX
						var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - event.pageY
						var d = Math.sqrt( a*a + b*b );
						var a = mainFigure.points[mainFigure.lines[whichline][1]][0] - event.pageX
						var b = mainFigure.points[mainFigure.lines[whichline][1]][1] - event.pageY
						var e = Math.sqrt( a*a + b*b );
						var percentage = (c-d)*100/c;
						if((e<c || d<c)) {
					    	if(e>c) {
					    		percentage = (c+(d))*100/c
					      	}
					  	}
					  	 else if(e>d)  {
					  		 percentage = (c+(d))*100/c
					  	}
					  	if(mainFigure.lines[whichline][2]!=true) {
					  		if(percentage>0 && percentage<100)
					  			mainFigure.points[pointer][3] = percentage;
					  	} else {
					  		mainFigure.points[pointer][3] = percentage;
					  	}
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
		if(askrettaperp2) {
			if(pointer23[0]=='line') {
				var mio = mainFigure.lines[pointer23[1]]
				var icsdif = mainFigure.points[mio[0]][0]-mainFigure.points[mio[1]][0]
				var ipsdif = mainFigure.points[mio[0]][1]-mainFigure.points[mio[1]][1]
				var before = getLineXY(mainFigure.points[perptemp], [mainFigure.points[perptemp][0]+icsdif,mainFigure.points[perptemp][1]+ipsdif], -1);
				var after = getLineXY(mainFigure.points[perptemp], [mainFigure.points[perptemp][0]+icsdif,mainFigure.points[perptemp][1]+ipsdif], 1);
				ctx.beginPath();
			    ctx.moveTo(before[0], before[1]);
			    ctx.lineTo(after[0], after[1]);
			    ctx.stroke();
			}
		}
		if(askrettapar2) {
			if(pointer23[0]=='line') {
				var mio = mainFigure.lines[pointer23[1]]
				var icsdif = mainFigure.points[mio[0]][0]-mainFigure.points[mio[1]][0]
				var ipsdif = mainFigure.points[mio[0]][1]-mainFigure.points[mio[1]][1]
				var before = getLineXY(mainFigure.points[partemp], [mainFigure.points[partemp][0]+icsdif,mainFigure.points[partemp][1]+ipsdif], -150.9);
				var after = getLineXY(mainFigure.points[partemp], [mainFigure.points[partemp][0]+icsdif,mainFigure.points[partemp][1]+ipsdif], 150.9);
				var ilmedio = medioPoint(after,before);
				var teo = rotate(after[0], after[1], mainFigure.points[partemp][0], mainFigure.points[partemp][1], 90)
			    drawPoint(before[0],before[1],50, 'yellow')
			    drawPoint(teo[0],teo[1],50, 'blue')
			    var be = getLineXY([teo[0], teo[1]], [mainFigure.points[partemp][0], mainFigure.points[partemp][1]], 1);
			    var be2 = getLineXY([teo[0], teo[1]], [mainFigure.points[partemp][0], mainFigure.points[partemp][1]], -1);
			    ctx.beginPath();
			    ctx.moveTo(be[0], be[1]);
			    ctx.lineTo(be2[0], be2[1]);
			    ctx.stroke();
			}
		}
		if(askcircle2) {
			drawAll();
			drawPoint(event.pageX,event.pageY,5);
			var a = mainFigure.points[centertemp][0] - event.pageX
			var b = mainFigure.points[centertemp][1] - event.pageY
			var c = Math.sqrt( a*a + b*b );
			drawCirlce2(mainFigure.points[centertemp][0],mainFigure.points[centertemp][1],c);
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
					value[0] = value[0]+diffX/30;
					value[1] = value[1]+diffY/30;
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
		if(true) {
			selezionatow = false;
			pointer23 = []
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
						selezionatow = true;
						pointer23 = ['circle',index];
					}
				}
			});

			$.each(mainFigure.lines, function( index, value ) {
				if(value!='niente') {
					var isretta = value[2]!=undefined;
					var ano = IsPointOnLine(mainFigure.points[value[0]],mainFigure.points[value[1]],[event.pageX,event.pageY],isretta)
					if(ano){
						selezionatow = true;
						pointer23 = ['line',index];
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
					selezionatow = true;
					pointer23 = ['point',index];

				}
			});
		}

		if(askpoint) {
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
				}
				else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
				}
				else if(isonline) {
					doOnlineProcedure(whichline,event.pageX,event.pageY);
				} else {
					mainFigure.points.push([event.pageX,event.pageY]);
				}
				drawAll();
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					line1temp = mainFigure.points.length-1;
				}
				else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					line1temp = mainFigure.points.length-1;
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					line1temp = mainFigure.points.length-1;
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					line1temp = mainFigure.points.length-1;
				}
				else if(isonline){
					doOnlineProcedure(whichline,event.pageX,event.pageY);
					line1temp = mainFigure.points.length-1;
				}
				else {
					mainFigure.points.push([event.pageX,event.pageY]);
					line1temp = mainFigure.points.length-1;
				}
			}
			askline1 = false;
			setTimeout(function(){ askline2 = true; }, 10);
			drawAll();
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
				mainFigure.lines.push([line1temp,indo]);
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
				}else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
				}
				else if(isonline) {
					doOnlineProcedure(whichline,event.pageX,event.pageY);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
				}
				else {
					mainFigure.points.push([event.pageX,event.pageY]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1]);
				}
			}
			askline2 = false;
			askline1 = true;
			drawAll();
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					centertemp = mainFigure.points.length-1;
				}
				else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					centertemp = mainFigure.points.length-1;
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					centertemp = mainFigure.points.length-1;
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					centertemp = mainFigure.points.length-1;
				}
				else if(isonline) {
					doOnlineProcedure(whichline,event.pageX,event.pageY);
					centertemp = mainFigure.points.length-1;
				}
				else {
					mainFigure.points.push([event.pageX,event.pageY]);
					centertemp = mainFigure.points.length-1;
				}
			}
			askcircle=false;
			setTimeout(function(){ askcircle2 = true; }, 10);
			drawAll();
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
				mainFigure.circles.push([centertemp,indo])
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
				}
				else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
				}
				else if(isonline) {
					doOnlineProcedure(whichline,event.pageX,event.pageY);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
				}
				else {
					mainFigure.points.push([event.pageX,event.pageY]);
					mainFigure.circles.push([centertemp,mainFigure.points.length-1])
				}
			}
			askcircle2 = false;
			askcircle = true;
			drawAll();
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					line1temp = mainFigure.points.length-1;
				}
				else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					line1temp = mainFigure.points.length-1;
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					line1temp = mainFigure.points.length-1;
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					line1temp = mainFigure.points.length-1;
				}
				else {
					if(isonline) {
						doOnlineProcedure(whichline,event.pageX,event.pageY);
						line1temp = mainFigure.points.length-1;
					}
					else {
						mainFigure.points.push([event.pageX,event.pageY]);
						line1temp = mainFigure.points.length-1;
					}
				}
			}
			askretta1 = false;
			setTimeout(function(){ askretta2 = true; }, 10);
			drawAll();
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
				mainFigure.lines.push([line1temp,indo,true]);
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
				}else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
				}
				else if(isonline) {
					doOnlineProcedure(whichline,event.pageX,event.pageY);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
				}
				else {
					mainFigure.points.push([event.pageX,event.pageY]);
					mainFigure.lines.push([line1temp,mainFigure.points.length-1,true]);
				}
			}
			askretta2 = false;
			askretta1 = true;
			drawAll();
		}
		if(askrettaperp1) {
			perptemp = [];
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
				perptemp = indo;
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					perptemp = mainFigure.points.length-1;
				}
				else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					perptemp = mainFigure.points.length-1;
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					perptemp = mainFigure.points.length-1;
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					perptemp = mainFigure.points.length-1;
				}
				else {
					if(isonline) {
						doOnlineProcedure(whichline,event.pageX,event.pageY);
						perptemp = mainFigure.points.length-1;
					}
					else {
						mainFigure.points.push([event.pageX,event.pageY]);
						perptemp = mainFigure.points.length-1;
					}
				}
			}
			askrettaperp1 = false;
			setTimeout(function(){ askrettaperp2 = true; }, 10);
			drawAll();
		}
		if(askrettaperp2) {
			var selezionato = false;
			var indo;
			if(pointer23[0]=='line') {
				var mio = mainFigure.lines[pointer23[1]]
				var icsdif = mainFigure.points[mio[0]][0]-mainFigure.points[mio[1]][0]
				var ipsdif = mainFigure.points[mio[0]][1]-mainFigure.points[mio[1]][1]
				mainFigure.points.push([mainFigure.points[perptemp][0]+icsdif,mainFigure.points[perptemp][1]+ipsdif,'lockedperp',pointer23[1],perptemp]);
				mainFigure.lines.push([perptemp,mainFigure.points.length-1,true]);
				askrettaperp2 = false;
				askrettaperp1 = true;
				drawAll();
			}
		}
		if(askrettapar1) {
			perptemp = [];
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
				partemp = indo;
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
					doLineCircleProcedure(event.pageX,event.pageY,curcircle,whichline,curcircle2);
					partemp = mainFigure.points.length-1;
				}
				else if(circlecounter>=2) {
					doLineCircleCircleProcedure(event.pageX,event.pageY,circlesIntercepted);
					partemp = mainFigure.points.length-1;
				}
				else if(linecounter>=2) {
					doLineLineLineProcedure(linesIntercepted);
					parptemp = mainFigure.points.length-1;
				}
				else if(isoncircle) {
					var delta = {x: event.pageX - mainFigure.points[curcircle][0], y: event.pageY - mainFigure.points[curcircle][1]};
					var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
					var angle = Math.atan2(delta.y, delta.x);
					mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,'circular',curcircle2,angle]);
					partemp = mainFigure.points.length-1;
				}
				else {
					if(isonline) {
						doOnlineProcedure(whichline,event.pageX,event.pageY);
						partemp = mainFigure.points.length-1;
					}
					else {
						mainFigure.points.push([event.pageX,event.pageY]);
						partemp = mainFigure.points.length-1;
					}
				}
			}
			askrettapar1 = false;
			setTimeout(function(){ askrettapar2 = true; }, 10);
			drawAll();
		}
		if(askrettapar2) {
			var selezionato = false;
			var indo;
			if(pointer23[0]=='line') {
				// var mio = mainFigure.lines[pointer23[1]]
				// var icsdif = mainFigure.points[mio[0]][0]-mainFigure.points[mio[1]][0]
				// var ipsdif = mainFigure.points[mio[0]][1]-mainFigure.points[mio[1]][1]
				// var before = getLineXY(mainFigure.points[partemp], [mainFigure.points[partemp][0]+icsdif,mainFigure.points[partemp][1]+ipsdif], -150.9);
				// var after = getLineXY(mainFigure.points[partemp], [mainFigure.points[partemp][0]+icsdif,mainFigure.points[partemp][1]+ipsdif], 150.9);
				// var ilmedio = medioPoint(after,before);
				// var teo2 = rotate(after[0]+icsdif, after[1]+ipsdif, ilmedio[0], ilmedio[1], 270)
				// mainFigure.points.push([teo2[0],teo2[1],'lockedpar',pointer23[1],partemp]);
				// mainFigure.lines.push([partemp,mainFigure.points.length-1,true]);

				var mio = mainFigure.lines[pointer23[1]]
				var icsdif = mainFigure.points[mio[0]][0]-mainFigure.points[mio[1]][0]
				var ipsdif = mainFigure.points[mio[0]][1]-mainFigure.points[mio[1]][1]
				var before = getLineXY(mainFigure.points[partemp], [mainFigure.points[partemp][0]+icsdif,mainFigure.points[partemp][1]+ipsdif], -150.9);
				var after = getLineXY(mainFigure.points[partemp], [mainFigure.points[partemp][0]+icsdif,mainFigure.points[partemp][1]+ipsdif], 150.9);
				var ilmedio = medioPoint(after,before);
				var teo = rotate(after[0], after[1], mainFigure.points[partemp][0], mainFigure.points[partemp][1], 90)
			    drawPoint(before[0],before[1],50, 'yellow')
			    drawPoint(teo[0],teo[1],50, 'blue')
			    var be = getLineXY([teo[0], teo[1]], [mainFigure.points[partemp][0], mainFigure.points[partemp][1]], 1);
			    var be2 = getLineXY([teo[0], teo[1]], [mainFigure.points[partemp][0], mainFigure.points[partemp][1]], -1);
			    ctx.beginPath();
			    ctx.moveTo(be[0], be[1]);
			    ctx.lineTo(be2[0], be2[1]);
			    ctx.stroke();
			    mainFigure.points.push([be[0],be[1],'lockedpar',pointer23[1],partemp]);
				mainFigure.lines.push([partemp,mainFigure.points.length-1,true]);


				askrettapar2 = false;
				askrettapar1 = true;
				drawAll();
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

				forMedium.push(pointer);
				var medio =  medioPoint(mainFigure.points[forMedium[0]],mainFigure.points[forMedium[1]]);
				mainFigure.points.push([medio[0],medio[1],1,1,1,1,'medio',forMedium[0],forMedium[1]]);
				drawAll()
				askmedium2 = false;
				askmedium = true;
				forMedium = [];
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
		if(showhide) {
			if(pointer23==undefined) {}
			else if(pointer23[0]=='point') {
				mainFigure.points[pointer23[1]].push('hided')
				drawAll()
			}

		}
	});
	$('body').on('click', '.primary', function(event) {
		event.preventDefault();
	});
	$('body').on('click', '.primary .label', function(event) {
		event.preventDefault();
		$('.primary div[id][class!="selected"]').hide();
		$('.primary div[id][class*="selected"]').show();
		$(this).nextAll('div[id]').css('display', 'block');
		$('div').removeClass('inuse');
		reset()
	});
	$('body').on('click', '.primary > div[id]', function(event) {
		event.preventDefault();
		reset()
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
	$('body').on('click', '.primary #parallel', function(event) {
		setTimeout(function(){ askrettaperp1=true; }, 10);
	});
	$('body').on('click', '.primary #perpendicolar', function(event) {
		setTimeout(function(){ askrettapar1=true; }, 10);
	});
	$('body').on('click', '.primary #select', function(event) {
		setTimeout(function(){ askselect=true; }, 10);
	});
	$('body').on('click', '.primary #showhide', function(event) {
		setTimeout(function(){ showhide=true; }, 10);
	});
	$('body').on('click', '.primary #move', function(event) {
		setTimeout(function(){ askmove=true; }, 10);
	});
	$('body').on('click', '.primary #save', function(event) {
		localStorage.setItem('canvas', JSON.stringify(mainFigure));
	});
	$('body').on('click', '.primary #savetxt', function(event) {
		saveTextAsFile()
	});
	$('body').on('click', '.primary #loadtxt', function(event) {
		$('#fileToLoad').click();
		document.getElementById("fileToLoad").files[0]=undefined
		loadFileAsText()
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
		$('#select').click();
	});
});
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
		var pcolor;
		if(mainFigure.points[index]!='niente') {
	 		if(value[2]!=undefined && value[6]==undefined && value[8]==undefined  && mainFigure.lines[value[2]]!='niente') {
				if(value[2]=='lockedperp') {
					var mio = mainFigure.lines[value[3]]
					var icsdif = mainFigure.points[mio[0]][0]-mainFigure.points[mio[1]][0]
					var ipsdif = mainFigure.points[mio[0]][1]-mainFigure.points[mio[1]][1]
					var external = getLineXY(mainFigure.points[value[4]],[mainFigure.points[value[4]][0]+icsdif,mainFigure.points[value[4]][1]+ipsdif],10)
					mainFigure.points[index][0]= external[0]
					mainFigure.points[index][1]= external[1]

				}
				else if(value[2]=='lockedpar') {
					var mio = mainFigure.lines[value[3]]
					var icsdif = mainFigure.points[mio[0]][0]-mainFigure.points[mio[1]][0]
					var ipsdif = mainFigure.points[mio[0]][1]-mainFigure.points[mio[1]][1]
					var before = getLineXY(mainFigure.points[value[4]], [mainFigure.points[value[4]][0]+icsdif,mainFigure.points[value[4]][1]+ipsdif], -150.9);
					var after = getLineXY(mainFigure.points[value[4]], [mainFigure.points[value[4]][0]+icsdif,mainFigure.points[value[4]][1]+ipsdif], 150.9);
					var teo = rotate(after[0], after[1], mainFigure.points[value[4]][0], mainFigure.points[value[4]][1], 90)
					var be = getLineXY([teo[0], teo[1]], [mainFigure.points[value[4]][0], mainFigure.points[value[4]][1]], 1);
					mainFigure.points[index][0]= be[0];
					mainFigure.points[index][1]= be[1];
				}
				else if(value[4]=='regblack')  {
					//console.log('black: '+value)
					if(true) {
						var a = waypoint(mainFigure.points[mainFigure.lines[value[2]][0]], mainFigure.points[mainFigure.lines[value[2]][1]], 1-(value[3]/100));
						mainFigure.points[index][0]= a[0];
						mainFigure.points[index][1]= a[1];
						if(value[value.length-1]=='hided') pcolor = 'transparent'; else pcolor='black';
						drawPoint(a[0],a[1],5,pcolor);
					}
				}

	 		} else if(value.length==2 && mainFigure.lines[value[2]]!='niente') {
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
				mainFigure.points[index][0] = mainFigure.points[point1][0] + Math.cos(angle) * len;
				mainFigure.points[index][1] = mainFigure.points[point1][1] +  Math.sin(angle) * len;
				if(value[value.length-1]=='hided') pcolor = 'transparent'; else pcolor='blue';
				drawPoint(mainFigure.points[index][0],mainFigure.points[index][1],5,pcolor);
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
	 		 	if(intersections!=false && intersections!=undefined) {
	 		 		console.log(intersections)
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
		 		 		mainFigure.points[index][0] = intersections[0][0];
		 		 		mainFigure.points[index][1] = intersections[0][1];
		 		 		if(value[value.length-1]=='hided') pcolor = 'transparent'; else pcolor='yellow';
		 		 		drawPoint(intersections[0][0],intersections[0][1],5,pcolor);
		 		 	}
		 		 	else if(condition2  && intersections[1]!=undefined) {
		 		 		mainFigure.points[index][0] = intersections[1][0];
		 		 		mainFigure.points[index][1] = intersections[1][1];
		 		 		if(value[value.length-1]=='hided') pcolor = 'transparent'; else pcolor='yellow';
		 		 		drawPoint(intersections[1][0],intersections[1][1],5,pcolor);
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
				var control = false;
	 		 	if(mainFigure.lines[value[8]][2]==undefined && mainFigure.lines[value[7]][2]==undefined) {
	 		 		if(asss.onLine1 && asss.onLine2) {
	 		 			control = true;
	 		 		}
	 		 	} else if(mainFigure.lines[value[8]][2]!=undefined && mainFigure.lines[value[7]][2]!=undefined) {
	 		 		control = true;
	 		 	} else if(mainFigure.lines[value[7]][2]!=undefined) {
	 		 		if(asss.onLine2) {
	 		 			control = true;
	 		 		}
	 		 	} else if(mainFigure.lines[value[8]][2]!=undefined) {
	 		 		if(asss.onLine1) {
	 		 			control = true;
	 		 		}
	 		 	}
	 		 	if(control) {
	 		 		mainFigure.points[index][0] = asss.x;
	 		 		mainFigure.points[index][1] = asss.y;
	 		 		if(value[value.length-1]=='hided') pcolor = 'transparent'; else pcolor='yellow';
		 		 	drawPoint(asss.x,asss.y,5,pcolor);
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
 			mainFigure.points[index] = 'niente';
 		}
	});
	//if(selezionatow) {
		display(pointer23,[event.pageX,event.pageY])
	//}
}

function doOnlineProcedure(whichline,one,two) {
	var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - mainFigure.points[mainFigure.lines[whichline][1]][0]
	var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - mainFigure.points[mainFigure.lines[whichline][1]][1]
	var c = Math.sqrt( a*a + b*b );
	var a = mainFigure.points[mainFigure.lines[whichline][0]][0] - one
	var b = mainFigure.points[mainFigure.lines[whichline][0]][1] - two
	var d = Math.sqrt( a*a + b*b );
	var a = mainFigure.points[mainFigure.lines[whichline][1]][0] - one
	var b = mainFigure.points[mainFigure.lines[whichline][1]][1] - two
	var e = Math.sqrt( a*a + b*b );
	var percentage = (c-d)*100/c;
	if((e<c || d<c)) {
    	if(e>c) {
    		percentage = (c+(d))*100/c
      	}
  	}
  	 else if(e>d)  {
  		 percentage = (c+(d))*100/c
  	}
	var ago = waypoint(mainFigure.points[mainFigure.lines[whichline][0]], mainFigure.points[mainFigure.lines[whichline][1]], 1-(percentage/100));
	var isonretta;
	if(mainFigure.lines[whichline][2]==true) {
		isonretta = true;
	} else isonretta = false;
	mainFigure.points.push([ago[0],ago[1],whichline,(percentage),'regblack',isonretta]);
}
function doLineCircleProcedure(one,two,curcircle,whichline,curcircle2) {
	var delta = {x: one - mainFigure.points[curcircle][0], y: two - mainFigure.points[curcircle][1]};
	var len = Math.sqrt(delta.x*delta.x + delta.y*delta.y);
	var angle = Math.atan2(delta.y, delta.x);
	mainFigure.points.push([mainFigure.points[curcircle][0] + Math.cos(angle) * len,mainFigure.points[curcircle][1] +  Math.sin(angle) * len,1,1,1,1,'line-circle',whichline,curcircle2,angle]);
}
function doLineCircleCircleProcedure(one,two,circlesIntercepted) {
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
		mainFigure.points.push([one,two,1,1,1,1,'circle-circle',circlesIntercepted[0],circlesIntercepted[1]]);
	}
}
function doLineLineLineProcedure(linesIntercepted) {
	console.log(linesIntercepted)
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
}
function reset() {
		askpoint = false;
		askcircle=false;
		askcircle2=false;
		askline1=false;
		askline2=false;
		askretta1=false;
		askretta2=false;
		askrettaperp1=false;
		askrettaperp2=false;
		askrettapar1=false;
		askrettapar2=false;
		askmedium=false;
		askmedium2=false;
		askerase = false;
		askselect = false;
		askmove2 = false;
		askmove = false;
		askzoom = false;
		askzoom2 = false;
		askzoomM = false;
		askzoom2M = false;
		showhide = false;
}
