var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var canvasWidth = $(window).width();;
var canvasHeight = $(window).height();;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var cicli = 0;
var objects = [];
var enablekeyboard = false;
var rotateleft = false;
var rotateright = false;
var specialrotateleft = false;
var specialrotateright = false;
var moveright = false;
var moveleft = false;
var fastdown = false;
var thefinalperim = [];
for (var i = 0; i <= canvas.width; i++) {
	thefinalperim.push([i,canvas.height-70])
};
for (var i = 0; i <= canvas.height-70; i++) {
	thefinalperim.push([0,i])
	thefinalperim.push([canvas.width-1,i])
};
var thepoint;
var downspeed = 0;
var totalarea;
var perc = 0;
var totalperc = 0;
var disableEvents = false;
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
$( document ).ready(function() {
	 $('#canvasContainer').append(canvas);
	 var main = function () {
		var now = Date.now();
		var delta = now - then;
		update(delta / 1000);

		then = now;
		requestAnimationFrame(main);
	};
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var then = Date.now();
	 main();
	 start();


	$( "body" ).on( 'mousedown touchstart', '#rotatel', function(e) {
		if(enablekeyboard) rotateleft = true;
	 });
	 $( "body" ).on( 'mouseup touchend', '#rotatel', function(e) {
		if(enablekeyboard)rotateleft = false;
	 });
	$( "body" ).on( 'mousedown touchstart', '#rotater', function(e) {
		if(enablekeyboard)rotateright = true;
	 });
	 $( "body" ).on( 'mouseup touchend', '#rotater', function(e) {
		if(enablekeyboard)rotateright = false;
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
	totalarea = (canvas.height-70-50) * (canvas.width-2);
}
var render = function() {
	ctx.fillStyle = 'lightgray';
	ctx.fillRect(0, 0,canvas.width,canvas.height);
	ctx.fillStyle = getRandomColor();

	for (var ikl = objects.length - 1; ikl >= 0; ikl--) {
				var drawPerim = false;
				var drawDeath = false;
				ctx.fillStyle = objects[ikl].color;
				 ctx.beginPath();
				$.each(objects[ikl], function(key,val) {
					if(key.indexOf('p')!=-1)
					  ctx.lineTo(val[0],val[1]);
				 });
				 ctx.fill();
				 if(drawPerim)
				$.each(objects[ikl], function(key,val) {
					if(key.indexOf('rim2')!=-1)
						for (var ilp = val.length - 1; ilp >= 0; ilp--) {
							ctx.fillStyle = 'green';
							drawrectangle(val[ilp][0],val[ilp][1])
							//ctx.fillStyle = 'red';
						};
				 });
				// $.each(objects[ikl], function(key,val) {
			  //   	if(key.indexOf('center')!=-1) {
			  //   			ctx.fillStyle = 'red';
					// 		drawrectangle(val[0],val[1])
					// 		//ctx.fillStyle = 'black';

					// }
			  //   });
			  //   $.each(objects[ikl], function(key,val) {
			  //   	if(key.indexOf('rcenter')!=-1) {
			  //   			ctx.fillStyle = 'red';
					// 		drawrectangle(val[0],val[1])


					// }
			  //   });
	};
	if(drawDeath)
	for (var ill0 = thefinalperim.length - 1; ill0 >= 0; ill0--) {
		ctx.fillStyle = 'yellow';
		drawrectangle(thefinalperim[ill0][0],thefinalperim[ill0][1])
		ctx.fillStyle = 'red';
	};
}
var update = function (modifier) {
		for (var i = objects.length - 1; i >= 0; i--) {
			var rightCounter = 0;
			var rightCounter2 = 0;
			var leftCounter = 0;
			var leftCounter2 = 0;
			var nrPoints = 0;
			var gap = 10;
			checkagain();
			function checkagain() {
				$.each(objects[i], function(key,val) {
					if(key.indexOf('p')!=-1) nrPoints++;
					if(key.indexOf('p')!=-1 && val[0]<canvas.width-gap) rightCounter++;
					if(key.indexOf('p')!=-1 && val[0]<canvas.width-gap-1) rightCounter2++;
					if(key.indexOf('p')!=-1 && val[0]>gap) leftCounter++;
					if(key.indexOf('p')!=-1 && val[0]>gap+1) leftCounter2++;
				});
			}
			$.each(objects[i], function(key,val) {
				if(!objects[i].fine) {
					var ilcane = [];
					$.each(objects[i], function(key,val) {
						if(key.indexOf('p')!=-1) {
							ilcane.push(val)
						}

					});
					//console.log(ilcane)
					var myperim = [];
					for (var il = 0; il < ilcane.length ; il++) {
						if(il==ilcane.length-1) myperim.push([ilcane[il],ilcane[0]])
						else myperim.push([ilcane[il],ilcane[il+1]])
					};
					//console.log(myperim)

					//console.log(segments)
					divide();


					function divide() {
						var vro;
						var counter = 0;
						$.each(myperim, function(key,val) {
							myperim.push([val[0],medioPoint(val[0],val[1])])
							myperim.push([val[1],medioPoint(val[0],val[1])])
							//myperim.shift();
							counter++;
							vro = Math.sqrt( (val[0][0]-medioPoint(val[0],val[1])[0])*(val[0][0]-medioPoint(val[0],val[1])[0]) + (val[0][1]-medioPoint(val[0],val[1])[1])*(val[0][1]-medioPoint(val[0],val[1])[1]) );
						});
						if(counter<100)
						//if(vro>10)
						divide();
						else {
							var myperim2 = [];
							for (var iccs = myperim.length - 1; iccs >= 0; iccs--) {
								if(!(cie(myperim2,myperim[iccs][0]))) myperim2.push(myperim[iccs][0])
								if(!(cie(myperim2,myperim[iccs][1]))) myperim2.push(myperim[iccs][1])
							};
							//objects[i].rim = myperim
							objects[i].rim2 = myperim2;
						}

					}
					  // if(objects[i].moving && (key.indexOf('p')!=-1 || key.indexOf('cent')!=-1)) {
					  // 	if(fastdown || (40 in keysDown && enablekeyboard)) {
					  // 		val[1] = val[1]+3;
					  // 	} else {
					  // 		val[1] = val[1]+1;
					  // 	}
					  // }
					  if(moveleft || (37 in keysDown && enablekeyboard))  {
						if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
							if(leftCounter==nrPoints)
							if(leftCounter2==nrPoints)
							val[0] = val[0]-2;
						}
					}
					else if(moveright || (39 in keysDown && enablekeyboard))  {
						if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
							if(rightCounter==nrPoints)
							if(rightCounter2==nrPoints)
							val[0] = val[0]+2;
						}
					}
					if(rotateleft || (83 in keysDown && enablekeyboard))  {
						if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
							var a = val[0]; var b = val[1];
							//if(objects[i].center[0]+(Math.cos(1/180*Math.PI)*(a-objects[i].center[0])+Math.sin(1/180*Math.PI)*(b-objects[i].center[1]))>10) {
								val[0] = objects[i].grcenter[0]+(Math.cos(1/180*Math.PI)*(a-objects[i].grcenter[0])+Math.sin(1/180*Math.PI)*(b-objects[i].grcenter[1]));
								val[1] = objects[i].grcenter[1]+(-Math.sin(1/180*Math.PI)*(a-objects[i].grcenter[0])+Math.cos(1/180*Math.PI)*(b-objects[i].grcenter[1]));
							//}
						}
					}
					else if(rotateright || (65 in keysDown && enablekeyboard))  {
						if(key.indexOf('p')!=-1  || key.indexOf('cent')!=-1) {
							var a = val[0]; var b = val[1];
							val[0] = objects[i].grcenter[0]+(Math.cos(1/180*Math.PI)*(a-objects[i].grcenter[0])-Math.sin(1/180*Math.PI)*(b-objects[i].grcenter[1]));
							val[1] = objects[i].grcenter[1]+(+Math.sin(1/180*Math.PI)*(a-objects[i].grcenter[0])+Math.cos(1/180*Math.PI)*(b-objects[i].grcenter[1]));
						}
					}
					if(specialrotateleft) {
						if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
							//console.log(i)
							var a = val[0]; var b = val[1];
							val[0] = objects[i].grcenter[0]+(Math.cos(2/180*Math.PI)*(a-objects[i].grcenter[0])+Math.sin(2/180*Math.PI)*(b-objects[i].grcenter[1]));
							val[1] = objects[i].grcenter[1]+(-Math.sin(2/180*Math.PI)*(a-objects[i].grcenter[0])+Math.cos(2/180*Math.PI)*(b-objects[i].grcenter[1]));

						}

					} else if (specialrotateright) {
						if(key.indexOf('p')!=-1  || key.indexOf('cent')!=-1) {
							var a = val[0]; var b = val[1];
							val[0] = objects[i].grcenter[0]+(Math.cos(2/180*Math.PI)*(a-objects[i].grcenter[0])-Math.sin(2/180*Math.PI)*(b-objects[i].grcenter[1]));
							val[1] = objects[i].grcenter[1]+(+Math.sin(2/180*Math.PI)*(a-objects[i].grcenter[0])+Math.cos(2/180*Math.PI)*(b-objects[i].grcenter[1]));
						}
					}
					if(objects[i].inerzia == 0) {
						end()
					}
					function end() {
							var theMinX =  10000;
							objects[i].fine = true;
							for (var ippl = objects[i].rim2.length - 1; ippl >= 0; ippl--) {
								if(objects[i].rim2[ippl][1]<theMinX) {
									theMinX = objects[i].rim2[ippl][1];
								}
								thefinalperim.push(objects[i].rim2[ippl])
							};
								if(theMinX<(40+60)) {
									alert(parseInt(totalperc)+'%')
								} else {
								perc = objects[i].area/totalarea*100;
								totalperc += objects[i].area/totalarea*100;
								$('#statusbar').append("<div style='width:"+perc+"%; background:"+objects[i].color+"'></div>")
								//totalarea = totalarea - objects[i].area;
								objects.push(gertRandomShape());
								disableEvents = false;
								rotateleft=false;
								rotateright=false;
								specialrotateleft=false;
								specialrotateright=false;
								moveright = false;
								moveleft = false;
								fastdown = false;
								return;


							}
					}

					var colpito = false;
					if(key.indexOf('rim2')!=-1) {
						colpito = false;
						for (var imk = val.length - 1; imk >= 0; imk--) {
							for (var dunno = thefinalperim.length - 1; dunno >= 0; dunno--) {
									if(
										val[imk][0]<thefinalperim[dunno][0]+1 &&
										val[imk][0]>thefinalperim[dunno][0]-1 &&
										val[imk][1]<thefinalperim[dunno][1]+1 &&
										val[imk][1]>thefinalperim[dunno][1]-1
										)
									{

										colpito = true;
										thepoint = [val[imk][0],val[imk][1]]
										break;
									}
							};
							if(colpito) {
									//console.log('colpito')
									disableEvents =true;
									//if(objects[i].inerzia>0 && objects[i].center[1]<thepoint[1])
									if(objects[i].inerzia>0)
									objects[i].inerzia = objects[i].inerzia-1;

									rotateleft = false;
									rotateright = false;
									specialrotateleft = false;
									specialrotateright = false;

										objects[i].grcenter = thepoint;




									objects[i].moving = false;
									return;
							} else {

							}
						};
					}
				}


			 });
			if(!objects[i].fine) {

				if(disableEvents) {
					$('#controls').addClass('disabled');
					enablekeyboard = false;
				}else {
					$('#controls').removeClass('disabled');
					enablekeyboard = true;
				}
				if(rotateleft)	objects[i].angle = (objects[i].angle-(1))%360
				if(rotateright)	objects[i].angle = (objects[i].angle+(1))%360
				console.log(objects[i].angle)

				 $.each(objects[i], function(key,val) {
				  if((key.indexOf('p')!=-1 || key.indexOf('cent')!=-1)) {
						//console.log(cicli)
						if(cicli>4) {cicli = 0; objects[i].moving = true; }
						 if(!objects[i].moving) {
							if(thepoint[0]<1) val[0] = val[0]+objects[i].inerzia
							else if(thepoint[0]>canvas.width-5) val[0] = val[0]-objects[i].inerzia
							if(objects[i].center[1]<thepoint[1] && objects[i].center[0]>thepoint[0]) {
								// val[1] = val[1]-objects[i].inerzia/2
								// val[0] = val[0]+objects[i].inerzia/2
								// specialrotateright = true;
							}
							else if(objects[i].center[1]<thepoint[1] && objects[i].center[0]<thepoint[0]) {
								// val[1] = val[1]-objects[i].inerzia/2
								// val[0] = val[0]-objects[i].inerzia/2
								// specialrotateleft = true;
							}
							else if(objects[i].center[1]>thepoint[1] && objects[i].center[0]>thepoint[0]) {
								val[1] = val[1]+objects[i].inerzia/2
								val[0] = val[0]+objects[i].inerzia/2
								specialrotateright = true;
							}
							else if(objects[i].center[1]>thepoint[1] && objects[i].center[0]<thepoint[0]) {
								val[1] = val[1]+objects[i].inerzia/2
								val[0] = val[0]-objects[i].inerzia/2
								specialrotateleft = true;
							}
						 }
						else if(objects[i].moving &&(fastdown || (40 in keysDown && enablekeyboard))) {
							val[1] = val[1]+4;
						} else if(objects[i].moving) {
							val[1] = val[1]+1;
						}
					 }

				 });
				 cicli++;
				 //console.log(objects[i].moving)
			}

		};
	render();
}
var drawrectangle = function (one, two) {
	//ctx.fillStyle = 'red';
	ctx.fillRect(one, two, 2, 2);
};
function getRandomColor() {
	 var letters = '0123456789ABCDEF'.split('');
	 var color = '#';
	 for (var i = 0; i < 6; i++ ) {
		  color += letters[Math.floor(Math.random() * 16)];
	 }
	 return color;
}
function gertRandomShape(){
	var choice  = Math.floor(Math.random() * 4) + 1;
	if(choice==10) {
		var squareh = Math.floor(Math.random() * 200) + 50;
		var squarew = Math.floor(Math.random() * 200) + 50;
		return {p1:[(canvas.width/2),40],p4:[(canvas.width/2)+(squarew/2),squareh],p5:[(canvas.width/2)-(squarew/2),squareh],center:[(canvas.width/2),squareh/2],grcenter:[(canvas.width/2),squareh/2],fine:false,moving:true,hitted:0,area:squarew*squareh/2,color:getRandomColor()};
	}
	else if(true) {
	//squares
		var squareh = Math.floor(Math.random() * (canvas.width/5)) + 70;
		var squarew = Math.floor(Math.random() * (canvas.width/5)) + 70;
		var quadrato = {p1:[(canvas.width/2)-(squarew/2),40],p2:[(canvas.width/2)+(squarew/2),40],p4:[(canvas.width/2)+(squarew/2),squareh],p5:[(canvas.width/2)-(squarew/2),squareh],center:[(canvas.width/2),(40+squareh)/2],grcenter:[(canvas.width/2),(40+squareh)/2],fine:false,moving:true,hitted:0,angle:0,area:(squareh-40)*squarew,color:getRandomColor(),inerzia:10};
		var rota = Math.floor(Math.random() * 360) + 0;
		for (var i = rota; i >= 0; i--) {
			$.each(quadrato, function(key,val) {
				if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
					var a = val[0]; var b = val[1];
					val[0] = quadrato.grcenter[0]+(Math.cos(1/180*Math.PI)*(a-quadrato.grcenter[0])+Math.sin(1/180*Math.PI)*(b-quadrato.grcenter[1]));
					val[1] = quadrato.grcenter[1]+(-Math.sin(1/180*Math.PI)*(a-quadrato.grcenter[0])+Math.cos(1/180*Math.PI)*(b-quadrato.grcenter[1]));

				}
			});
		};

		return quadrato;


	} else if(choice==1) {
		//ombrello
		var ombrello =  {p1:[5,12],p2:[55,12],p3:[103,35],p4:[119,25],p5:[109,42],p6:[133,73],p7:[144,135],p8:[100,105],p9:[74,79],p10:[15,135],p11:[1,122],p12:[12,110],p13:[8,123],p14:[14,127],p15:[67,72],p16:[35,47],center:[72,75],grcenter:[72,75],fine:false,moving:true,hitted:0,area:7000,color:getRandomColor()};
						var choice2  = Math.floor(Math.random() * 3) + 1;
						$.each(ombrello, function(key,val) {
							if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
								val[1] = 40+(val[1]/choice2);
								val[0] = ((canvas.width/2)-50)+(val[0]/choice2);
							}
						});
						ombrello.area = (ombrello.area)/choice2;
		return ombrello;
	} else if(choice==2) {
		var bottiglia =  {p1:[69,3],p2:[81,3],p3:[82,38],p4:[93,52],p5:[92,140],p6:[59,140],p7:[59,52],p8:[68,38],center:[72,75],grcenter:[72,75],fine:false,moving:true,hitted:0,area:5000,color:getRandomColor()};
		var choice2  = Math.floor(Math.random() * 3) + 1;
		$.each(bottiglia, function(key,val) {
			if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
				val[1] = 40+(val[1]/choice2);
				val[0] = ((canvas.width/2)-50)+(val[0]/choice2);
			}
		});
		bottiglia.area = (bottiglia.area)/choice2;
		return bottiglia;
	} else if(choice==3) {
			var cappello =  {p1:[40,19],p2:[75,11],p3:[103,11],p4:[110,15],p5:[115,63],p6:[118,86],p7:[132,87],p8:[143,95],p9:[142,104],p10:[128,115],p11:[98,128],p12:[62,136],p13:[29,134],p14:[23,129],p15:[21,121],p16:[34,110],p17:[21,121],p18:[34,110],p19:[39,107],p20:[33,84],p21:[22,59],p22:[14,36],center:[72,75],grcenter:[72,75],fine:false,moving:true,hitted:0,area:5000,color:getRandomColor()};
			var choice2  = Math.floor(Math.random() * 3) + 1;
			$.each(cappello, function(key,val) {
				if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
					val[1] = 40+(val[1]/choice2);
					val[0] = ((canvas.width/2)-50)+(val[0]/choice2);
				}
			});
			cappello.area = (cappello.area)/choice2;
			return cappello;
	} else if (choice==4) {
		var chiave =  {p1:[46,30],p2:[61,32],p3:[71,41],p4:[74,50],p5:[73,58],p6:[126,111],p7:[113,127],p8:[59,73],p9:[47,74],p10:[37,68],p11:[30,58],p12:[30,46],p13:[43,60],p14:[55,54],p15:[58,44],center:[80,80],grcenter:[80,80],fine:false,moving:true,hitted:0,area:5000,color:getRandomColor()};
		$.each(chiave, function(key,val) {
			if(key.indexOf('p')!=-1 || key.indexOf('cent')!=-1) {
				val[1] = 40+(val[1]);
				val[0] = ((canvas.width/2)-50)+(val[0]);
			}
		});
		chiave.area = (chiave.area);
		return chiave;
	}
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

