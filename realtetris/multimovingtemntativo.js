

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = $(window).width();
var canvasHeight = $(window).height();
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var cicli = 0;
var objects = [];
var enablekeyboard = false;
var specialrotateleft = false;
var specialrotateright = false;
var moveright = false;
var moveleft = false;
var fastdown = false;
var thefinalperim = [];
for (var i = 0; i <= canvas.width; i=i+5) {
	thefinalperim.push([i,canvas.height-70,0])
};
for (var i = 0; i <= canvas.height-70; i=i+5) {
	thefinalperim.push([0,i,270])
	thefinalperim.push([canvas.width-1,i,90])
};
var thepoint;
var theperimpoint;
var downspeed = 0;
var totalarea;
var perc = 0;
var totalperc = 0;
var disableEvents = false;
var keysDown = {};
var nrRimbalzi = 5;
var allmoving = false;
var gameover= false;
var liberiingiro = 0;
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	if(e.keyCode==65) { objects[objects.length-1].rotateleft = true; }
	if(e.keyCode==83)  { objects[objects.length-1].rotateright = true; }
	if(e.keyCode==37)  moveleft = true;
	if(e.keyCode==39)  moveright = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	if(e.keyCode==65) {  objects[objects.length-1].rotateleft = false; }
	if(e.keyCode==83) {  objects[objects.length-1].rotateright = false; }
	if(e.keyCode==37)  moveleft = false;
	if(e.keyCode==39)  moveright = false;
}, false);
$( document ).ready(function() {
	$('#canvasContainer').append(canvas);
	var main = function () {
		var now = Date.now();
		var delta = now - then;
		update(delta / 1000);
		render()
		then = now;
		requestAnimationFrame(main);
	};
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var then = Date.now();
	 main();
	 start();


	$( "body" ).on( 'mousedown touchstart', '#rotatel', function(e) {
		if(enablekeyboard) {  objects[objects.length-1].rotateleft = true; }
	 });
	 $( "body" ).on( 'mouseup touchend', '#rotatel', function(e) {
		if(enablekeyboard)  {  objects[objects.length-1].rotateleft = false; }
	 });
	$( "body" ).on( 'mousedown touchstart', '#rotater', function(e) {
		if(enablekeyboard) {  objects[objects.length-1].rotateright = true; }
	 });
	 $( "body" ).on( 'mouseup touchend', '#rotater', function(e) {
		if(enablekeyboard) {  objects[objects.length-1].rotateright = false; }
	 });
	 $( "body" ).on( 'mousedown touchstart', '#dx', function(e) {
		if(enablekeyboard)moveright = true;
	 });
	 $( "body" ).on( 'mouseup touchend', '#dx', function(e) {
		if(enablekeyboard)moveright = false;
	 });
	$( "body" ).on( 'mousedown touchstart', '#sx', function(e) {
		if(enablekeyboard)moveleft = true;
	 });
	$( "body" ).on( 'mouseup touchend', '#sx', function(e) {
		if(enablekeyboard)moveleft = false;
	 });
	 $( "body" ).on( 'mousedown touchstart', '#dw', function(e) {
		if(enablekeyboard)fastdown = true;
	 });
	 $( "body" ).on( 'mouseup touchend', '#dw', function(e) {
		if(enablekeyboard)fastdown = false;
	 });
});
var start = function() {
	objects.push(gertRandomShape());
	totalarea = (canvas.height-70-40) * (canvas.width-2);
}
var render = function() {

	ctx.fillStyle = 'white';
	if(disableEvents) ctx.globalAlpha = 0.5
	else ctx.globalAlpha = 1
	ctx.fillRect(0, 0,canvas.width,canvas.height);
	ctx.fillStyle = getRandomColor();

	for (var ikl = objects.length - 1; ikl >= 0; ikl--) {
				var drawPerim = false;
				var drawDeath = true;
				var drawPoints = false;
				if(!objects[ikl].start && !objects[ikl].erase) {
				ctx.fillStyle = objects[ikl].color;
				ctx.beginPath();
				$.each(objects[ikl], function(key,val) {
					if(key.indexOf('p')!=-1)
					  ctx.lineTo(val[0],val[1]);
				 });
				 ctx.fill();
				}
				if(objects[ikl].eraser) {
					$.each(objects[ikl], function(key,val) {
					if(key.indexOf('rim2')!=-1) {
						for (var ilp = val.length - 1; ilp >= 0; ilp--) {
							ctx.strokeStyle = 'red';
							drawcircle(val[ilp][0],val[ilp][1])
						};
					}
				});
				}

				 if(drawPerim)
				$.each(objects[ikl], function(key,val) {
					if(key.indexOf('rim2')!=-1) {
						for (var ilp = val.length - 1; ilp >= 0; ilp--) {

							if(val[ilp][3]==1) ctx.strokeStyle = 'red';
							else if(val[ilp][3]==2) ctx.strokeStyle = 'yellow';
							else if(val[ilp][3]==3) ctx.strokeStyle = 'green';
							else if(val[ilp][3]==4) ctx.strokeStyle = 'blue';
							else ctx.strokeStyle = 'transparent';

							drawcircle(val[ilp][0],val[ilp][1])
						};
					}
				});
				if(drawPoints && objects[ikl].fine==false) {
					$.each(objects[ikl], function(key,val) {
				    	if(key.indexOf('center')!=-1) {
				    			ctx.strokeStyle = 'red';
								drawcircle(val[0],val[1])

						}
				    });
				    $.each(objects[ikl], function(key,val) {
				    	if(key.indexOf('rcenter')!=-1) {
				    			ctx.strokeStyle = 'yellow';
								drawcircle(val[0],val[1])


						}
				    });
				    $.each(objects[ikl], function(key,val) {
				    	if(key.indexOf('rev')!=-1) {
				    			ctx.strokeStyle = 'blue';
								drawcircle(val[0],val[1])


						}
				    });
				}
	};
	if(drawDeath)
	for (var ill0 = thefinalperim.length - 1; ill0 >= 0; ill0--) {
		ctx.strokeStyle = 'yellow';
		drawcircle(thefinalperim[ill0][0],thefinalperim[ill0][1])
	};
}
var myperim = [];
var update = function (modifier) {
	if(!gameover)
	for (var i = objects.length - 1; i >= 0; i--) {
		//calculate perimeter
		if(objects[i].start) {
				var ilcane = [];
				var disatancebetweenpoints = 5;
				$.each(objects[i], function(key,val) {
					if(key.indexOf('p')!=-1) {
						ilcane.push(val)
					}

				});
				var rota = Math.floor(Math.random() * 45) + 0;
				objects[i].angle = 0;
			  	myperim = [];
				myperim.push([ilcane[0],ilcane[1]])
				myperim.push([ilcane[2],ilcane[3]])
				var first = divide()
				while((distanceBetween2(first[first.length-1],first[first.length-2]))>disatancebetweenpoints) {
					first = divide()
				}
				myperim = [];
				myperim.push([ilcane[1],ilcane[2]])
				myperim.push([ilcane[3],ilcane[0]])
				var second = divide()
				while((distanceBetween2(second[second.length-1],second[second.length-2]))>disatancebetweenpoints) {
					second = divide()
				}
				second.splice(second.indexOf(objects[i].p1),1)
				second.splice(second.indexOf(objects[i].p2),1)
				second.splice(second.indexOf(objects[i].p4),1)
				second.splice(second.indexOf(objects[i].p5),1)
				var hez =  $.merge( $.merge( [], first ), second );
				var lato1 = hez[hez.length-1][0];
				var lato2 = hez[hez.length-1][1];
				var lato3 = hez[hez.length-1][0];
				for (var iccs = hez.length - 1; iccs >= 0; iccs--) {
					if(hez[iccs][0]!=objects[i].p2[0] || hez[iccs][1]!=objects[i].p2[1]) {
						if((hez[iccs][0]!=objects[i].p1[0] || hez[iccs][1]!=objects[i].p1[1])) {
							if((hez[iccs][0]!=objects[i].p4[0] || hez[iccs][1]!=objects[i].p4[1])) {
								if((hez[iccs][0]!=objects[i].p5[0] || hez[iccs][1]!=objects[i].p5[1])) {
									if(objects[i].p2[0] == hez[iccs][0]) {
										hez[iccs].push((objects[i].angle+270)%360)
										hez[iccs].push('1')
									}
									else if(objects[i].p2[1] == hez[iccs][1]) {
										hez[iccs].push(objects[i].angle)
										hez[iccs].push('2')
									}
									else if(objects[i].p4[1] == hez[iccs][1]) {
										hez[iccs].push((objects[i].angle+180)%360)
										hez[iccs].push('3')
									}
									else {
										hez[iccs].push((objects[i].angle+90)%360)
										hez[iccs].push('4')
									}
								}
							}
						}
					}
					hez[iccs].push(i)
				};
				objects[i].angle = (360-(rota*2))%360;
				objects[i].rim2 = hez;
				for (var ionee = rota; ionee > 0; ionee--) {
					$.each(objects[i], function(key,val) {
						if(key.indexOf('rim')!=-1){
							for (var iko = objects[i].rim2.length - 1; iko >= 0; iko--) {
								var a = objects[i].rim2[iko][0]; var b = objects[i].rim2[iko][1];
								objects[i].rim2[iko][0] = objects[i].center[0]+(Math.cos(2/180*Math.PI)*(a-objects[i].center[0])-Math.sin(2/180*Math.PI)*(b-objects[i].center[1]));
								objects[i].rim2[iko][1] = objects[i].center[1]+(Math.sin(2/180*Math.PI)*(a-objects[i].center[0])+Math.cos(2/180*Math.PI)*(b-objects[i].center[1]));
								objects[i].rim2[iko][2] = (objects[i].rim2[iko][2]+(358))%360;
							};
						}
					});
				}
				var colpito = false;
				$.each(objects[i], function(key,val) {
					if(key.indexOf('rim2')!=-1) {
						for (var imk = val.length - 1; imk >= 0; imk--) {
							for (var dunno = thefinalperim.length - 1; dunno >= 0; dunno--) {
									if(
										val[imk][3]!=undefined &&
										val[imk][0]<thefinalperim[dunno][0]+2 &&
										val[imk][0]>thefinalperim[dunno][0]-2 &&
										val[imk][1]<thefinalperim[dunno][1]+2 &&
										val[imk][1]>thefinalperim[dunno][1]-2
										)
									{
										colpito = true;
										thepoint = [val[imk][0],val[imk][1],val[imk][2]]
										theperimpoint = [thefinalperim[dunno][0],thefinalperim[dunno][1],thefinalperim[dunno][2]]
										break;
									}
							};
						};
						if(colpito) {
							$('#points').addClass('end')
							gameover = true;
							return;
						}
						else {
							objects[i].start = false;
						}


					}
				});
		}
		//move and check if hitted
		if(!objects[i].fine) {
			$.each(objects[i], function(key,val) {
					if(moveleft  && enablekeyboard)  {
						if(key.indexOf('cent')!=-1) {
							val[0] = val[0]-2;
						}
						if(key.indexOf('rim')!=-1){
							for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
								objects[i].rim2[ik][0] = objects[i].rim2[ik][0]-2;
							};
						}
					}
					else if(moveright && enablekeyboard)  {
						if(key.indexOf('cent')!=-1) {
							val[0] = val[0]+2;
						}
						if(key.indexOf('rim')!=-1){
							for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
								objects[i].rim2[ik][0] = objects[i].rim2[ik][0]+2;
							};
						}
					}
					if((objects[i].rotateleft && enablekeyboard) || specialrotateleft)  {
						if(key.indexOf('cent')!=-1) {
								var a = val[0]; var b = val[1];
								val[0] = objects[i].center[0]+(Math.cos(2/180*Math.PI)*(a-objects[i].center[0])+Math.sin(2/180*Math.PI)*(b-objects[i].center[1]));
								val[1] = objects[i].center[1]+(-Math.sin(2/180*Math.PI)*(a-objects[i].center[0])+Math.cos(2/180*Math.PI)*(b-objects[i].center[1]));
						}
						if(key.indexOf('rim')!=-1){
							for (var iko = objects[i].rim2.length - 1; iko >= 0; iko--) {
								var a = objects[i].rim2[iko][0]; var b = objects[i].rim2[iko][1];
								objects[i].rim2[iko][0] = objects[i].center[0]+(Math.cos(2/180*Math.PI)*(a-objects[i].center[0])+Math.sin(2/180*Math.PI)*(b-objects[i].center[1]));
					 			objects[i].rim2[iko][1] = objects[i].center[1]+(-Math.sin(2/180*Math.PI)*(a-objects[i].center[0])+Math.cos(2/180*Math.PI)*(b-objects[i].center[1]));
					 			objects[i].rim2[iko][2] = (objects[i].rim2[iko][2]+(2))%360;
							};
						}

					}
					else if((objects[i].rotateright && enablekeyboard) || specialrotateright)  {
						if(key.indexOf('cent')!=-1) {
								var a = val[0]; var b = val[1];
								val[0] = objects[i].center[0]+(Math.cos(2/180*Math.PI)*(a-objects[i].center[0])-Math.sin(2/180*Math.PI)*(b-objects[i].center[1]));
								val[1] = objects[i].center[1]+(Math.sin(2/180*Math.PI)*(a-objects[i].center[0])+Math.cos(2/180*Math.PI)*(b-objects[i].center[1]));
						}
						if(key.indexOf('rim')!=-1){
							for (var iko = objects[i].rim2.length - 1; iko >= 0; iko--) {
								var a = objects[i].rim2[iko][0]; var b = objects[i].rim2[iko][1];
								objects[i].rim2[iko][0] = objects[i].center[0]+(Math.cos(2/180*Math.PI)*(a-objects[i].center[0])-Math.sin(2/180*Math.PI)*(b-objects[i].center[1]));
								objects[i].rim2[iko][1] = objects[i].center[1]+(Math.sin(2/180*Math.PI)*(a-objects[i].center[0])+Math.cos(2/180*Math.PI)*(b-objects[i].center[1]));
								objects[i].rim2[iko][2] = (objects[i].rim2[iko][2]+(358))%360;
							};
						}

					}
					var colpito = false;
					if(key.indexOf('rim2')!=-1) {
						for (var imk = val.length - 1; imk >= 0; imk--) {
							for (var dunno = thefinalperim.length - 1; dunno >= 0; dunno--) {
									if(
										val[imk][3]!=undefined &&
										val[imk][0]<thefinalperim[dunno][0]+3 &&
										val[imk][0]>thefinalperim[dunno][0]-3 &&
										val[imk][1]<thefinalperim[dunno][1]+3 &&
										val[imk][1]>thefinalperim[dunno][1]-3
										)
									{
										colpito = true;
										thepoint = [val[imk][0],val[imk][1],val[imk][2]]
										theperimpoint = [thefinalperim[dunno][0],thefinalperim[dunno][1],thefinalperim[dunno][2]]
										break;
									}
							};
						};
						if(colpito) {
							objects[i].hits.push(thepoint);
							//rotateleft = false;
							objects[i].rotateleft = false;
							objects[i].rotateright = false;
							specialrotateleft = false;
							specialrotateright = false;
							disableEvents =true;
							if(objects[i].inerzia<=0) objects[i].inerzia = 1;
							//else objects[i].inerzia = objects[i].inerzia-1;
							objects[i].revgrcenter = objects[i].grcenter;
							objects[i].grcenter = thepoint;
							objects[i].moving = false;
							if(objects[i].eraser) {
								var fromshapenr;
								for (var cujj = objects.length - 1; cujj >= 0; cujj--) {
									if(cujj!=i)
									for (var ivvo = objects[cujj].rim2.length - 1; ivvo >= 0; ivvo--) {
										if(theperimpoint[0]==objects[cujj].rim2[ivvo][0] && theperimpoint[1]==objects[cujj].rim2[ivvo][1]) {
											fromshapenr = cujj;
											break;
										}
									};
								};
								if(fromshapenr!=undefined)  {
									 objects[fromshapenr].erase = true;
									 objects[i].erase = true;

									for (var ivvol = objects[fromshapenr].rim2.length - 1; ivvol >= 0; ivvol--) {
										var toerase = thefinalperim.indexOf(objects[fromshapenr].rim2[ivvol])
										if(toerase!=-1) {
											thefinalperim.splice(toerase,1)
										}
									}
									 console.log('tirarli giu tutti')
									 var figure = [];
									 for (var iggi = thefinalperim.length - 1; iggi >= 0; iggi--) {
									 	if(thefinalperim[iggi][1]<theperimpoint[1]
									 	 && thefinalperim[iggi][3]!=undefined
									 	 //&& thefinalperim[iggi][4]!=i
									 	 ) {
									 		//console.log('si')
									 		if(figure.indexOf(thefinalperim[iggi][4])==-1) figure.push(thefinalperim[iggi][4]);
									 	}
									 };

									 console.log(figure)
									if(figure.length>0) {
										 liberiingiro = figure.length;
										 for (var ijji = figure.length - 1; ijji >= 0; ijji--) {
										 	console.log('attivo il nr: '+ijji)
										 	objects[figure[ijji]].hits = [];
										 	// objects[figure[ijji]].moving = true;
										 	// objects[figure[ijji]].start = false;
										 	// objects[figure[ijji]].rotateleft = false;
										 	// objects[figure[ijji]].rotateright = false;
										 	for (var iggi = thefinalperim.length - 1; iggi >= 0; iggi--) {
										 		if(thefinalperim[iggi][3]!=undefined && thefinalperim[iggi][4]==figure[ijji]) {
													thefinalperim.splice(iggi,1)
										 		}
										 	}
										 	objects[figure[ijji]].fine = false;
										 };
										 allmoving = true;
									} else {
										end();
									}

									objects[i].eraser = false;
									objects[i].fine = true;



								} else {
									console.log('eraser a vuoto')
									end();
									objects[i].erase = true;
									objects[i].fine = true;
									objects[i].eraser = false;

								}
							}
							else {
								handleCollision();
							}
						}
					}
			});
			if(objects[i].rotateleft || specialrotateleft) {
				objects[i].angle = (objects[i].angle+(2))%360;
			} else if (objects[i].rotateright || specialrotateright) {
				objects[i].angle = (objects[i].angle+(358))%360;
			}
		}
		if(!objects[i].fine) {
			if(disableEvents) {
				$('#controls').addClass('disabled');
				enablekeyboard = false;
			}else {
				$('#controls').removeClass('disabled');
				enablekeyboard = true;
			}
			var theMaxY = canvasHeight;
			for (var iglo = thefinalperim.length - 1; iglo >= 0; iglo--) {
				//console.log(thefinalperim[])
				if(thefinalperim[iglo][1] != 568 && thefinalperim[iglo][0]>2 && thefinalperim[iglo][0]<canvasWidth-10)
				if(thefinalperim[iglo][1]<theMaxY) theMaxY = thefinalperim[iglo][1];
			};
			var theMaxY2 = 0;
			for (var iglo = objects[i].rim2.length - 1; iglo >= 0; iglo--) {
				if(objects[i].rim2[iglo][1]>theMaxY2) theMaxY2 = objects[i].rim2[iglo][1];
			};
			//handle collisions
			if(!objects[i].moving && thepoint[1]>objects[i].center[1]) {
					//console.log('gestisco duro: '+objects[i].inerzia);
					if(objects[i].inerzia==0) {
						if(objects[i].initinerzia-objects[i].hits.length>=0)
						objects[i].inerzia=objects[i].initinerzia-objects[i].hits.length;
						objects[i].moving=true;
					}
					else {
						if(!((theperimpoint[2]>45 && theperimpoint[2]<135) || (theperimpoint[2]>225 && theperimpoint[2]<315))) {
							$.each(objects[i], function(key,val) {
								if(key.indexOf('cent')!=-1) {
									val[1] = val[1]-objects[i].inerzia;
								}
								if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
									for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
										val[ik][1] = val[ik][1]-objects[i].inerzia;
									};
								}
							});
						}

						objects[i].inerzia--;

						//bounce upright
						if(objects[i].center[0]>thepoint[0]) {
							var bounceangle = 2
							var center = objects[i].center;
							objects[i].angle = (objects[i].angle+(360-bounceangle))%360;
							$.each(objects[i], function(key,val) {
								if(key.indexOf('cent')!=-1) {
										var a = val[0]; var b = val[1];
										val[0] = center[0]+(Math.cos(bounceangle/180*Math.PI)*(a-center[0])-Math.sin(bounceangle/180*Math.PI)*(b-center[1]));
										val[1] = center[1]+(Math.sin(bounceangle/180*Math.PI)*(a-center[0])+Math.cos(bounceangle/180*Math.PI)*(b-center[1]));
								}
								if(key.indexOf('rim')!=-1){
									for (var iko = objects[i].rim2.length - 1; iko >= 0; iko--) {
										var a = objects[i].rim2[iko][0]; var b = objects[i].rim2[iko][1];
										objects[i].rim2[iko][0] = center[0]+(Math.cos(bounceangle/180*Math.PI)*(a-center[0])-Math.sin(bounceangle/180*Math.PI)*(b-center[1]));
										objects[i].rim2[iko][1] = center[1]+(Math.sin(bounceangle/180*Math.PI)*(a-center[0])+Math.cos(bounceangle/180*Math.PI)*(b-center[1]));
										objects[i].rim2[iko][2] = (objects[i].rim2[iko][2]+(360-bounceangle))%360;
									};
								}
							});
						}
						//bounce upleft
						else if(objects[i].center[0]<thepoint[0]) {
							var bounceangle = 2
							var center = objects[i].center;
							objects[i].angle = (objects[i].angle+(bounceangle))%360;
							$.each(objects[i], function(key,val) {
								if(key.indexOf('cent')!=-1) {
										var a = val[0]; var b = val[1];
										val[0] = center[0]+(Math.cos(bounceangle/180*Math.PI)*(a-center[0])+Math.sin(bounceangle/180*Math.PI)*(b-center[1]));
										val[1] = center[1]+(-Math.sin(bounceangle/180*Math.PI)*(a-center[0])+Math.cos(bounceangle/180*Math.PI)*(b-center[1]));
								}
								if(key.indexOf('rim')!=-1){
									for (var iko = objects[i].rim2.length - 1; iko >= 0; iko--) {
										var a = objects[i].rim2[iko][0]; var b = objects[i].rim2[iko][1];
										objects[i].rim2[iko][0] = center[0]+(Math.cos(bounceangle/180*Math.PI)*(a-center[0])+Math.sin(bounceangle/180*Math.PI)*(b-center[1]));
										objects[i].rim2[iko][1] = center[1]+(-Math.sin(bounceangle/180*Math.PI)*(a-center[0])+Math.cos(bounceangle/180*Math.PI)*(b-center[1]));
										objects[i].rim2[iko][2] = (objects[i].rim2[iko][2]+(bounceangle))%360;
									};
								}
							});
						}

					};
			}
			//move down
			else if(objects[i].moving && (fastdown || (40 in keysDown && enablekeyboard))) {   // && (theMaxY>20+theMaxY2)) {

				$.each(objects[i], function(key,val) {
					if(key.indexOf('cent')!=-1) {
						val[1] = val[1]+5;
					}
					if(key.indexOf('rim')!=-1){
						for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
							objects[i].rim2[ik][1] = objects[i].rim2[ik][1]+5;
						};
					}
				});

			} else  {
				// if((theMaxY>20+theMaxY2)) $('#dw').removeClass('disabled');
				// else $('#dw').addClass('disabled');
				$.each(objects[i], function(key,val) {
					if(key.indexOf('cent')!=-1) {
						val[1] = val[1]+1;
					}
					if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
						for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
							val[ik][1] = val[ik][1]+1;
						};
					}
				});
			}
		}
	};

	function handleCollision() {

		if(objects[i].hits.length>100) {
			end();
			console.log('bug');
		}
		if(objects[i].hits.length>15
				&& distanceBetween2(objects[i].hits[objects[i].hits.length-1],objects[i].hits[objects[i].hits.length-3]) < 15
			//	&& distanceBetween2(objects[i].hits[objects[i].hits.length-2],objects[i].hits[objects[i].hits.length-4]) < 10
				//&& distanceBetween2(thepoint,objects[i].revgrcenter)>10
				&& ((objects[i].hits[objects[i].hits.length-1][0] > objects[i].center[0]) && (objects[i].hits[objects[i].hits.length-2][0] < objects[i].center[0]) || (objects[i].hits[objects[i].hits.length-1][0] < objects[i].center[0]) && (objects[i].hits[objects[i].hits.length-2][0] > objects[i].center[0]))
				  ) {
		 	console.log('atterraggio su più punti');
			end();
		}
		 else   {
			if(thepoint[1]>objects[i].center[1]) {
				//colpo sotto
				if((theperimpoint[2]>45 && theperimpoint[2]<135) || (theperimpoint[2]>225 && theperimpoint[2]<315)) {
				 	//console.log('parete verticale')
					if(objects[i].center[0]>thepoint[0]) {
						$.each(objects[i], function(key,val) {
							if(key.indexOf('cent')!=-1) {
								val[0] = val[0]+3;
							}
							if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
								for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
									val[ik][0] = val[ik][0]+3;
								}
							}
						});
					}
					else {
						$.each(objects[i], function(key,val) {
							if(key.indexOf('cent')!=-1) {
								val[0] = val[0]-3;
							}
							if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
								for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
									val[ik][0] = val[ik][0]-3;
								};
							}
						});
					}
				} else if((theperimpoint[2]<10 || theperimpoint[2]>350)) {
					//console.log('parete base:');
					if(objects[i].center[0]>thepoint[0]) {
						$.each(objects[i], function(key,val) {
							if(key.indexOf('cent')!=-1) {
								val[0] = val[0]+1;
							}
							if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
								for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
									val[ik][0] = val[ik][0]+1;
								}
							}
						});
					}
					else {
						$.each(objects[i], function(key,val) {
							if(key.indexOf('cent')!=-1) {
								val[0] = val[0]-1;
							}
							if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
								for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
									val[ik][0] = val[ik][0]-1;
								};
							}
						});

					}
				} else {
						//console.log('parete normale');
						if(objects[i].center[0]>thepoint[0]) {
							$.each(objects[i], function(key,val) {
								if(key.indexOf('cent')!=-1) {
									val[0] = val[0]+2;
								}
								if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
									for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
										val[ik][0] = val[ik][0]+2;
									}
								}
							});
						}
						else {
							$.each(objects[i], function(key,val) {
								if(key.indexOf('cent')!=-1) {
									val[0] = val[0]-2;
								}
								if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
									for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
										val[ik][0] = val[ik][0]-2;
									};
								}
							});

						}
				}
			}
			else {
				//colpo sopra
					if(objects[i].center[0]>thepoint[0]) {
					specialrotateright =true;
				}
				else {
					specialrotateleft =true;
				}


			}

		}
	}
	function end() {
		if(!allmoving) {
			objects[i].fine = true;
			disableEvents = false;
			//rotateleft=false;
			objects[i].rotateleft = false;
			objects[i].rotateright=false;
			specialrotateleft=false;
			specialrotateright=false;
			moveright = false;
			moveleft = false;
			fastdown = false;
			if(!objects[i].eraser) {
				for (var ippl = objects[i].rim2.length - 1; ippl >= 0; ippl--) {
					if(objects[i].rim2[ippl][3]!=undefined) {
								thefinalperim.push(objects[i].rim2[ippl])
					}
				};
				perc = objects[i].area/totalarea*100;
				totalperc += objects[i].area/totalarea*100;
				$('#statusbar').append("<div style='width:"+perc+"%; background:"+objects[i].color+"'></div>")
				$('#points').html(parseInt(totalperc)+'%');
				objects.push(gertRandomShape())
			} else  {
				objects.push(gertRandomShape());
			}
		} else {
			console.log(liberiingiro)
			objects[i].fine = true;
			disableEvents = false;
			//rotateleft=false;
			objects[i].rotateleft = false;
			objects[i].rotateright=false;
			specialrotateleft=false;
			specialrotateright=false;
			moveright = false;
			moveleft = false;
			fastdown = false;
			for (var ippl = objects[i].rim2.length - 1; ippl >= 0; ippl--) {
					if(objects[i].rim2[ippl][3]!=undefined) {
								thefinalperim.push(objects[i].rim2[ippl])
					}
			};
			perc = objects[i].area/totalarea*100;
			totalperc += objects[i].area/totalarea*100;
			$('#statusbar').append("<div style='width:"+perc+"%; background:"+objects[i].color+"'></div>")
			$('#points').html(parseInt(totalperc)+'%');
			liberiingiro--;
			if(liberiingiro==0) {
				allmoving = false;
				objects.push(gertRandomShape());
			}

		}
	}
}

function divide() {
		var myperim2 = [];
		$.each(myperim, function(key,val) {
			myperim.push([val[0],medioPoint(val[0],val[1])])
			myperim.push([val[1],medioPoint(val[0],val[1])])
			vro = Math.sqrt( (val[0][0]-medioPoint(val[0],val[1])[0])*(val[0][0]-medioPoint(val[0],val[1])[0]) + (val[0][1]-medioPoint(val[0],val[1])[1])*(val[0][1]-medioPoint(val[0],val[1])[1]) );
		});
		myperim2 = [];
		for (var iccs = myperim.length - 1; iccs >= 0; iccs--) {
			if(!(cie(myperim2,myperim[iccs][0]))) myperim2.push(myperim[iccs][0])
			if(!(cie(myperim2,myperim[iccs][1]))) myperim2.push(myperim[iccs][1])

		};
		return myperim2;
}
var drawrectangle = function (one, two) {
	ctx.fillRect(one, two, 4, 4);
}
var drawcircle = function (one, two) {
	ctx.beginPath();
	ctx.arc(one,two,1,0,2*Math.PI);
	ctx.stroke();
}
function getRandomColor() {
	 var letters = '0123456789ABCDEF'.split('');
	 var color = '#';
	 for (var i = 0; i < 6; i++ ) {
		  color += letters[Math.floor(Math.random() * 16)];
	 }
	 return color;
}
function gertRandomShape(){
		var squareh = Math.floor(Math.random() * (100)) + 50;
		var squarew = Math.floor(Math.random() * (100)) + 20;
		var mindim = squareh >= squarew ?  squarew : squareh;
		var initinerzia = 5;
		var eraserc;
		if(objects.length%3==0 && objects.length!=0) eraserc = true; else eraserc = false;
		if(eraserc) {
		  squareh = 10;
		  squarew = 10;
		}
		var quadrato = {p1:[(canvas.width/2)-(squarew/2),0],p2:[(canvas.width/2)+(squarew/2),0],p4:[(canvas.width/2)+(squarew/2),squareh],p5:[(canvas.width/2)-(squarew/2),squareh],center:[(canvas.width/2),(squareh)/2],grcenter:[(canvas.width/2),(squareh)/2],revgrcenter:[(canvas.width/2),(squareh)/2],fine:false,moving:true,hitted:0,angle:0,area:(squareh)*squarew,color:getRandomColor(),inerzia:initinerzia,initinerzia:initinerzia,mindim:mindim,start:true,hits:[],erase:false,eraser:eraserc,rotateleft:false,rotateright:false};
		return quadrato;
}
function medioPoint(a,b) {
	return [(b[0]+a[0])/2,(b[1]+a[1])/2];
}
function cie(array,coppia) {
	var eccolo = false;
	for (var iggl = array.length - 1; iggl >= 0; iggl--) {
		if(array[iggl][0]==coppia[0] && array[iggl][1]==coppia[1]) {
			eccolo = true;
			break;
		}
	};
	return eccolo;
}
function distanceBetween2(f,s) {
	var x1 = f[0];
	var y1 = f[1];
	var x2 =  s[0];
	var y2 =  s[1];
	return  Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));

}

