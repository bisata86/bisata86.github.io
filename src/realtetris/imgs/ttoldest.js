

function nonmodificareIvaloriRealitime() {
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = $(window).width();
var canvasHeight = $(window).height();
if(canvasWidth>500 || canvasHeight>800) {
	canvasWidth = 500;
	canvasHeight = 800;
	$('body').addClass('adapt');
}
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
for (var i = 0; i <= canvas.width; i=i+6) {
	thefinalperim.push([i,canvas.height-70,0])
};
for (var i = 0; i <= canvas.height-70; i=i+6) {
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
var figure = [];
var bombReady = false;
var bombImage = new Image();
var myperim = [];
var debugcollisions = false;
var drawPerim = false;
var drawDeath = false;
var drawPoints = false;
var disatancebetweenpoints = 7;
var gamevel = 10;
var myInterval;
bombImage.onload = function () {
	bombReady = true;
};
bombImage.src = "imgs/bomb.png";
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
		update();
		requestAnimationFrame(main);
	};
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	main();
	start();
	$( "body" ).on( 'mousedown touchstart', '#rotatel', function(e) {
		if(enablekeyboard) {  if(!objects[objects.length-1].eraser) objects[objects.length-1].rotateleft = true; }
	 });
	 $( "body" ).on( 'mouseup touchend', '#rotatel', function(e) {
		if(enablekeyboard)  {  objects[objects.length-1].rotateleft = false; }
	 });
	$( "body" ).on( 'mousedown touchstart', '#rotater', function(e) {
		if(enablekeyboard) {  if(!objects[objects.length-1].eraser) objects[objects.length-1].rotateright = true; }
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
	else ctx.globalAlpha = 0.8
	ctx.fillRect(0, 0,canvas.width,canvas.height);
	ctx.fillStyle = getRandomColor();

	for (var ikl = objects.length - 1; ikl >= 0; ikl--) {
				if(!objects[ikl].erase) {
					if(objects[ikl].eraser) {
						$.each(objects[ikl], function(key,val) {
							if (bombReady) {
								ctx.drawImage(bombImage, objects[ikl].p1[0]-9, objects[ikl].p1[1]-18, 50, 50);
						}
					});
					} else {
						if(!objects[ikl].start) {
							ctx.fillStyle = objects[ikl].color;
							ctx.beginPath();
							$.each(objects[ikl], function(key,val) {
								if(key.indexOf('p')!=-1)
								  ctx.lineTo(val[0],val[1]);
							 });
							 ctx.fill();
						}
					}
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
var update = function () {
	//console.log(thefinalperim.length)
	if(!gameover) {
		for (var i = objects.length - 1; i >= 0; i--) {
			//calculate perimeter
			if(objects[i].start) {
					var ilcane = [];
					$.each(objects[i], function(key,val) {
						if(key.indexOf('p')!=-1) {
							ilcane.push(val)
						}

					});
					var rota = Math.floor(Math.random() * 45) + 0;
					if(objects[i].eraser) rota = 0;
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
											//val[imk][3]!=undefined &&
											val[imk][0]<thefinalperim[dunno][0]+10 &&
											val[imk][0]>thefinalperim[dunno][0]-10 &&
											val[imk][1]<thefinalperim[dunno][1]+10 &&
											val[imk][1]>thefinalperim[dunno][1]-10
											)
										{
											colpito = true;
											thepoint = [val[imk][0],val[imk][1],val[imk][2]]
											theperimpoint = [thefinalperim[dunno][0],thefinalperim[dunno][1],thefinalperim[dunno][2]]
											break;
										}
								};
							};
						}
					});
					if(colpito) {
						$('#points').addClass('end')
						gameover = true;
						return false;
					}
					else {
						objects[i].start = false;
					}
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
						if(((objects[i].rotateleft && enablekeyboard) || specialrotateleft) && !objects[i].eraser)  {
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
						else if(((objects[i].rotateright && enablekeyboard) || specialrotateright) && !objects[i].eraser)  {
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
								changevel()
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
										$('.obj_'+fromshapenr).addClass('no');
										totalperc -= objects[fromshapenr].area/totalarea*100;
										$('#points').html(parseInt(totalperc)+'%');
										for (var ivvol = objects[fromshapenr].rim2.length - 1; ivvol >= 0; ivvol--) {
											var toerase = thefinalperim.indexOf(objects[fromshapenr].rim2[ivvol])
											if(toerase!=-1) {
												thefinalperim.splice(toerase,1)
											}
										}

										//tutti giu
										 figure = [];
										 var  figureordinato = [];

										 for (var iggi = thefinalperim.length - 1; iggi >= 0; iggi--) {
										 	if(thefinalperim[iggi][1]<theperimpoint[1]
										 	 && thefinalperim[iggi][3]!=undefined
										 	 //&& thefinalperim[iggi][4]!=i
										 	 ) {
										 		//console.log('si')
										 		if(figure.indexOf(thefinalperim[iggi][4])==-1) {
										 			figure.push(thefinalperim[iggi][4]);
										 			figureordinato.push([thefinalperim[iggi][4],thefinalperim[iggi][1]])

										 		}

										 	}
										 };
										 //console.log(figure)
										figure = ordinalo(figureordinato)

										if(figure.length>0) {

											// $.each(figure, function(key,val) {
											// 	console.log(key+' :'+val)
											// });


											 liberiingiro = figure.length;
											 for (var ijji = figure.length - 1; ijji >= 0; ijji--) {
											 	for (var iggi = thefinalperim.length - 1; iggi >= 0; iggi--) {
											 		if(thefinalperim[iggi][3]!=undefined && thefinalperim[iggi][4]==figure[ijji]) {
														thefinalperim.splice(iggi,1)
											 		}
											 	}
											 };


											 // var themindist = 10000;
												// for (var hjk = thefinalperim.length - 1; hjk >= 0; hjk--) {
												// 	var curdi = distanceBetween2(thefinalperim[hjk],objects[figure[0]].grcenter);
												// 	if(curdi<themindist) themindist = curdi;
												// };

												// if(themindist>10) {
												// 	objects[figure[0]].fine = false;
												//  	objects[figure[0]].moving = true;
												//  	objects[figure[0]].hits = [];
											 // 	} else {
											 // 		for (var ippl = objects[figure[0]].rim2.length - 1; ippl >= 0; ippl--) {
												// 		if(objects[figure[0]].rim2[ippl][3]!=undefined) {
												// 			thefinalperim.push(objects[figure[0]].rim2[ippl])
												// 		}
												// 	};
												// 	 allmoving = true;
												// 	end()
											 // 	}

											objects[figure[0]].fine = false;
											objects[figure[0]].moving = true;
											objects[figure[0]].hits = [];
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
							var bounceangle = 1;
							objects[i].inerzia--;
							var center = objects[i].center;
							//bounce upright
							if(objects[i].center[0]>thepoint[0]) {

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
							val[1] = val[1]+3;
						}
						if(key.indexOf('rim')!=-1){
							for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
								objects[i].rim2[ik][1] = objects[i].rim2[ik][1]+3;
							};
						}
					});

				} else  {
					// if((theMaxY>20+theMaxY2)) $('#dw').removeClass('disabled');
					// else $('#dw').addClass('disabled');
					var spdow = 1+(objects.length/50);
					if(enablekeyboard) spdow = 1;
						$.each(objects[i], function(key,val) {
							if(key.indexOf('cent')!=-1) {
								val[1] = val[1]+spdow;
							}
							if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
								for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
									val[ik][1] = val[ik][1]+spdow;
								};
							}
						});

				}
			}
		};
	render()
	}
	function handleCollision() {
		//console.log(objects[i].inerzia)
		if(objects[i].hits.length>300) {
			end();
			console.log('bug');
		}
		if(objects[i].hits.length>15
				&& distanceBetween2(objects[i].hits[objects[i].hits.length-1],objects[i].hits[objects[i].hits.length-3]) < 15
			//	&& distanceBetween2(objects[i].hits[objects[i].hits.length-2],objects[i].hits[objects[i].hits.length-4]) < 10
				&& distanceBetween2(objects[i].grcenter,objects[i].revgrcenter)>10
				&& ((objects[i].hits[objects[i].hits.length-1][0] > objects[i].center[0]) && (objects[i].hits[objects[i].hits.length-2][0] < objects[i].center[0]) || (objects[i].hits[objects[i].hits.length-1][0] < objects[i].center[0]) && (objects[i].hits[objects[i].hits.length-2][0] > objects[i].center[0]))
				  ) {
		 	if(debugcollisions)console.log('atterraggio su più punti');
			end();
		}
		 else   {
			if(thepoint[1]>objects[i].center[1]) {
				if(debugcollisions)console.log('colpo sotto');
				if((theperimpoint[2]>45 && theperimpoint[2]<135) || (theperimpoint[2]>225 && theperimpoint[2]<315)) {
				 	if(debugcollisions)console.log('parete verticale')
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
				} else if((theperimpoint[2]<10 || theperimpoint[2]>350)) {
					if(debugcollisions)console.log('parete base:');
					// if(objects[i].center[0]>thepoint[0]) {
					// 	$.each(objects[i], function(key,val) {
					// 		if(key.indexOf('cent')!=-1) {
					// 			val[0] = val[0]+1;
					// 		}
					// 		if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
					// 			for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
					// 				val[ik][0] = val[ik][0]+1;
					// 			}
					// 		}
					// 	});
					// }
					// else {
					// 	$.each(objects[i], function(key,val) {
					// 		if(key.indexOf('cent')!=-1) {
					// 			val[0] = val[0]-1;
					// 		}
					// 		if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
					// 			for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
					// 				val[ik][0] = val[ik][0]-1;
					// 			};
					// 		}
					// 	});

					// }
				} else {
						if(debugcollisions)console.log('parete normale');
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
				}
			}
			else {
				if(debugcollisions)console.log('colpo sopra')
				if((theperimpoint[2]>45 && theperimpoint[2]<135) || (theperimpoint[2]>225 && theperimpoint[2]<315)) {
				 	if(debugcollisions)console.log('parete verticale')
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
				} else if((theperimpoint[2]<10 || theperimpoint[2]>350)) {
					if(debugcollisions)console.log('parete base:');
					// if(objects[i].center[0]>thepoint[0]) {
					// 	$.each(objects[i], function(key,val) {
					// 		if(key.indexOf('cent')!=-1) {
					// 			val[0] = val[0]+1;
					// 		}
					// 		if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
					// 			for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
					// 				val[ik][0] = val[ik][0]+1;
					// 			}
					// 		}
					// 	});
					// }
					// else {
					// 	$.each(objects[i], function(key,val) {
					// 		if(key.indexOf('cent')!=-1) {
					// 			val[0] = val[0]-1;
					// 		}
					// 		if(key.indexOf('rim2')!=-1 && key.indexOf('p')==-1){
					// 			for (var ik = objects[i].rim2.length - 1; ik >= 0; ik--) {
					// 				val[ik][0] = val[ik][0]-1;
					// 			};
					// 		}
					// 	});

					// }
				} else {
						if(debugcollisions)console.log('parete normale');
						if(objects[i].center[0]>thepoint[0]) {
							$.each(objects[i], function(key,val) {
								if(key.indexOf('cent')!=+1) {
									val[0] = val[0]-1;
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
				$('#statusbar').append("<div class='obj_"+i+"' style='width:0;'></div>")
				$(".obj_"+i).attr("style","width:"+perc+"%; background:"+objects[i].color);
				//$('#statusbar').append("<div class='obj_"+i+"' style='width:"+perc+"%; background:"+objects[i].color+"'></div>")
				$('#points').html(parseInt(totalperc)+'%');
				objects.push(gertRandomShape())
			} else  {
				objects.push(gertRandomShape());
			}
		} else {
			objects[i].fine = true;
			disableEvents = true;
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
			liberiingiro--;
			if(liberiingiro==0) {
				allmoving = false;
				disableEvents = false;
				objects.push(gertRandomShape());
			} else {
				figure.splice(0,1);
				//if(finda(thefinalperim,objects[figure[0]].grcenter)!=-1) {
				//besac
					var themindist = 10000;
					var themindist2 = 10000;
					for (var hjk = thefinalperim.length - 1; hjk >= 0; hjk--) {
						if(thefinalperim[hjk][0]>5 && thefinalperim[hjk][0]<canvasWidth-5) {
							var curdi = distanceBetween2(thefinalperim[hjk],objects[figure[0]].grcenter);
							if(curdi<themindist) themindist = curdi;
							var curdi2 = distanceBetween2(thefinalperim[hjk],objects[figure[0]].revgrcenter);
							if(curdi2<themindist2) themindist2 = curdi2;
						}
					};
					//console.log(themindist)
					if(themindist>10 && themindist2>10) {
						objects[figure[0]].fine = false;
					 	objects[figure[0]].moving = true;
					 	objects[figure[0]].hits = [];
				 	} else {
				 		for (var ippl = objects[figure[0]].rim2.length - 1; ippl >= 0; ippl--) {
							if(objects[figure[0]].rim2[ippl][3]!=undefined) {
								thefinalperim.push(objects[figure[0]].rim2[ippl])
							}
						};
						end()
				 	}



			}

		}
		console.log(thefinalperim.length);
		var torem = [];
		// for (var hjk = 0; hjk < thefinalperim.length-1; hjk++) {
		// 		if(distanceBetween2(thefinalperim[hjk],thefinalperim[hjk+1])<2) {
		// 			thefinalperim.splice(hjk,1);
		// 			//torem.push(hjk);
		// 			//break;
		// 		}
		// };
		// for (var wer = torem.length - 1; wer >= 0; wer--) {
		// 	thefinalperim.splice(torem[wer],1);
		// };
		//console.log(thefinalperim.length);
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
	clearInterval(myInterval);
		var squareh = (canvasHeight/850)*Math.floor(Math.random() * (150)) + 60;
		var squarew = (canvasWidth/850)*Math.floor(Math.random() * (150)) + 30;

		var mindim = squareh >= squarew ?  squarew : squareh;
		var initinerzia = 5;
		var eraserc;
		if(objects.length%7==0 && objects.length != 0) eraserc = true; else eraserc = false;
		if(eraserc) {
		  squareh = 25;
		  squarew = 25;
		}
		clearInterval(myInterval);
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
function ordinalo(starting) {
		var temp = starting.slice(0);
		for	(var tu = 0; tu<temp.length; tu++) {
			var temmm = temp[tu];
			temp[tu] = temp[fmin(temp,tu)]
			temp[fmin(temp,tu)] = temmm
		}
		function fmin(arrayo,finoa) {
			var min = 0, minc;
			for	(var t = arrayo.length-1; t>=finoa; t--) {
				if(arrayo[t][1]>min) {
					min = arrayo[t][1];
					minc = t;
				}
			}
			return minc;
		}
		var nuovoa = [];
		for	(var tu = 0; tu<temp.length; tu++) {
			nuovoa.push(temp[tu][0])
		}
		return nuovoa;
}
function finda(array,element) {
	var trovato = -1;
	for	(var tuna = 0; tuna<array.length; tuna++) {
		if(array[tuna][0]==element[0] && array[tuna][1]==element[1]) {
		trovato = tuna;
		break;
		}
	}
	return trovato;
}
function changevel() {
	clearInterval(myInterval);
	myInterval = setInterval(function(){ update(); }, 10);
}
}
nonmodificareIvaloriRealitime();

