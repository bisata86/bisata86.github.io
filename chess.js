//scachcidibesaz
//single-auto-steps//
var mode = 'single';
var auto;
var turno;
var steps;
var currentMove = {};
$( document ).ready(function() {





	var body = document.documentElement;
	if (body.requestFullscreen) {
	body.requestFullscreen();
	} else if (body.webkitrequestFullscreen) {
	body.webkitrequestFullscreen();
	} else if (body.mozrequestFullscreen) {
	body.mozrequestFullscreen();
	} else if (body.msrequestFullscreen) {
	body.msrequestFullscreen();
	}
	var isMobile = detectmob();
	var click = isMobile ? 'touchstart' : 'mousedown';
	var endClick = isMobile ? 'touchend' : 'mouseup';
	var mouseMove = isMobile ? 'touchmove' : 'mousemove';
	if(mode=='single') {
		auto = false;
		turno = false;
		steps = false
		$('#muovi').remove()
		$('#passo').remove()
	}
	if(mode=='auto') {
		auto = true;
		turno = true;
		steps = false
		$('#muovi').remove()
		$('#passo').remove()
	}
	if(mode=='steps') {
		auto = true;
		turno = false;
		steps = true
	}
	checkWindow()
	$( window ).resize(function() {
	  checkWindow();
	});
	var partita  = {};
	//localStorage.setItem('partita', JSON.stringify(partita);
	creaScacchiera(partita);
	disegnaScacchiera(partita);
	if(mode!='steps') {
		$( "body" ).on( click,'.scacchiera div[class*="bianco"]', function(event) {
		  $('.copia').remove();
		  $('.casella').removeClass('nascondi')
		  if($('.scacchiera').hasClass('mossaAi')) {
		  } else {
			  $('div').removeClass('highlight')
			  var laClasse = $( this ).attr('class');
			  var a  = possibilita(laClasse,$( this ).prevAll().length,partita);
			  var b  = possibilitaDiMangiare(laClasse,$( this ).prevAll().length,partita);
			  if(a.length>0) {
			  	$( ".scacchiera" ).addClass('ricezione');
			  	currentMove.posizioneCorrente = $( this ).prevAll().length;
			  }
			  for (var i = a.length - 1; i >= 0; i--) {
			  	$('.casella').eq(a[i]).addClass('highlight')
			  };
			  for (var i = b.length - 1; i >= 0; i--) {
			  	//$('.casella').eq(b[i]).addClass('highlight2')
			  };
			  for (var i = a.length - 1; i >= 0; i--) {
			  	  simulazione = JSON.parse(JSON.stringify(partita));
				  simulaMuovi(simulazione,currentMove.posizioneCorrente,a[i])
				  if(controllaScacco(simulazione,'nero')) {
				  	 $('.casella').eq(a[i]).removeClass('highlight')
				  }
			  };
			   if(!isMobile) {
				  $(this).addClass('nascondi');
				  $('body').append('<div class="copia '+laClasse+'"></div>');
				}
			  $('.copia').css({
				top: event.pageY-$('.casella').width()/2,
				left: event.pageX-$('.casella').width()/2,
				width: $('.casella').width(),
				height: $('.casella').height()
			});
			}
		});
		$( "body" ).on( click,'.nascondi', function(event) {
		  $('.copia').remove();
		  $('.casella').removeClass('nascondi').removeClass('highlight')
		});
		$( "body" ).on( 'mousemove', function(event) {
			//console.log('no'+event.pageX)
			$('.copia').css({
				top: event.pageY-$('.casella').eq(0).width()/2,
				left: event.pageX-$('.casella').eq(0).width()/2
			});
		});
		$( "body" ).on( endClick,'.scacchiera.ricezione div[class*="highlight"]', function() {
			$( ".scacchiera" ).removeClass('ricezione');
			$('.copia').remove();
			$('#prima').removeClass('disabled');
			$('.scacchiera').addClass('mossaAi')
		  	$('div').removeClass('highlight');
		  	currentMove.posizioneFinale = $( this ).prevAll().length;
			muovi(partita);
		  	setTimeout(function(){
		  		muoviI(partita);
		  		$('.scacchiera').removeClass('mossaAi')
		  		var retrievedObject = localStorage.getItem('mosse');
				var mosse;
				if(retrievedObject != null) {
					mosse = JSON.parse(retrievedObject);
				}
				if(historyCounter==1) {
		  			mosse.push(partita);
		  		} else {
		  			$('#dopo').attr('class', 'disabled');
		  			mosse.splice(((mosse.length+1)-historyCounter),10000000)
		  			mosse.push(partita);
		  			historyCounter=1;
		  		}

		  		localStorage.setItem('mosse', JSON.stringify(mosse));
				if(true) { //controlo la fine
					var hisMove = []
					var achi = 'bianco';
					var avversario = 'nero'
					var hisMove = []
					$.each(partita.caselle, function(index, val) {
						if(val.colore==achi) {
							hisMove.push({starting:index})
							var construzione = val.occupata+val.colore;
							var a  = possibilita(construzione,index,partita);
							var endings = [];
							for (var i = a.length - 1; i >= 0; i--) {
							  	endings.push(a[i])
							};
							hisMove[hisMove.length-1].endings = endings;
						}
					});
					var arrayMosse = [];
					$.each(hisMove, function(index, val) {
						if(val.endings.length!=0) {
							arrayMosse.push(val)
						}
					});
					if(true) { //rimuovo le mosse in scacco
						var darimuovere = []
						var simulazione;
						$.each(arrayMosse, function(index, val) {
							$.each(val.endings, function(index2, val2) {
								simulazione = JSON.parse(JSON.stringify(partita));
								simulaMuovi(simulazione,val.starting,val2);
								if(controllaScacco(simulazione,avversario)) {
						  	 		darimuovere.push([index,index2])
						 		}
							});
						});
						$.each(darimuovere, function(index, val) {
							arrayMosse[val[0]].endings[val[1]] = -1;
						});
						var arrayMosse2 = [];
						$.each(arrayMosse, function(index, val) {
							arrayMosse2.push({starting:val.starting,endings:[]})
							$.each(val.endings, function(index2, val2) {
								if(val2!=-1)
								arrayMosse2[arrayMosse2.length-1].endings.push(val2);
							});
						});
						arrayMosse = arrayMosse2;
						var arrayMosse2 = [];
						$.each(arrayMosse, function(index, val) {
							if(val.endings.length!=0) {
								arrayMosse2.push({starting:val.starting,endings:val.endings})
							}
						});
						//return arrayMosse2;
					}

			   		var check = 0;
					$.each(arrayMosse2, function(index, val) {
						$.each(val.endings, function(index2, val2) {
							check++;
						});
					});
					if(check==0)  {
						alert('hai perso')
						console.log('hai perso')
					}
				}
		    }, 500);
		});
		var historyCounter = 1;
		$('#prima').attr('class', 'disabled');
		$('#dopo').attr('class', 'disabled');
		$( "body" ).on( click,'#prima', function() {
			$('#dopo').removeClass('disabled');
			var retrievedObject = localStorage.getItem('mosse');
			if(retrievedObject != null) {
				partita = JSON.parse(retrievedObject);

				if(historyCounter==partita.length-1) {
					$('#prima').attr('class', 'disabled');
				} else {
					$('#prima').removeClass('disabled');
				}
				partita = partita[partita.length-1-historyCounter]
				historyCounter++;
			}
			disegnaScacchiera(partita)
		});
		$( "body" ).on( click,'#dopo', function() {
			$('#prima').removeClass('disabled');
			var retrievedObject = localStorage.getItem('mosse');
			if(retrievedObject != null) {
				partita = JSON.parse(retrievedObject);

				if(historyCounter==2) {
					$('#dopo').attr('class', 'disabled');
				} else {
					$('#dopo').removeClass('disabled');
				}
				partita = partita[partita.length+1-historyCounter]
				historyCounter--;
			}

			disegnaScacchiera(partita)

		});
	}
	if(steps || true) {
		$( "body" ).on( "click",'#passo', function() {
			muoviI(partita);
		});
		$( "body" ).on( "click",'#muovi', function() {
			muovi(partita);
			$('.scacchieraTemp').remove();
		});
	}
});
function checkWindow() {
	if(window.innerHeight<window.innerWidth)  $('body').addClass('landscape').removeClass('portrait')
	else $('body').addClass('portrait').removeClass('landscape')
}
function controllaScacco(partita,chi) {
		//disegnaScacchieraTemp(partita)
		var hisMove = []
		if(auto) {
			var achi = turno ? 'nero' : 'bianco';
		} else {
			var achi = chi;
		}
		$.each(partita.caselle, function(index, val) {
			if(val.colore==achi) {
			hisMove.push({starting:index})
			var construzione = val.occupata+val.colore;
			var a  = possibilita(construzione,index,partita);
			var endings = [];
			for (var i = a.length - 1; i >= 0; i--) {
			  	endings.push(a[i])
			  };
			hisMove[hisMove.length-1].endings = endings;
			}
		});
		var arrayMosse = [];
		$.each(hisMove, function(index, val) {
			if(val.endings.length!=0) {
				arrayMosse.push(val)
			}
		});
		var scacco = false;
		$.each(arrayMosse, function(index, val) {
			$.each(val.endings, function(index2, val2) {
					if(partita.caselle[val2].occupata=='re') {
						scacco = true;
					}
			});
		});
		return scacco;
}
function muovi(partita) {
	var pezzo = partita.caselle[currentMove.posizioneCorrente].occupata;
	var colore = partita.caselle[currentMove.posizioneCorrente].colore;
	partita.caselle[currentMove.posizioneCorrente] = {colore:'no',occupata:'no'}
   	partita.caselle[currentMove.posizioneFinale] = {colore:colore,occupata:pezzo}
   	if(pezzo.indexOf('pedone')!=-1) {
   		if(colore=='bianco'){
   			if(currentMove.posizioneFinale<8) {
   				partita.caselle[currentMove.posizioneFinale] = {colore:colore,occupata:'regina'}
   			}
   		}
   		if(colore=='nero'){
   			if(currentMove.posizioneFinale>55) {
   				partita.caselle[currentMove.posizioneFinale] = {colore:colore,occupata:'regina'}
   			}
   		}
   	}
   	currentMove = {};
	disegnaScacchiera(partita)
}
function simulaMuovi(partita,from,to) {
	var pezzo = partita.caselle[from].occupata;
	var colore = partita.caselle[from].colore;
	partita.caselle[from] = {colore:'no',occupata:'no'}
   	partita.caselle[to] = {colore:colore,occupata:pezzo}
   	if(pezzo.indexOf('pedone')!=-1) {
   		if(colore=='bianco'){
   			if(to<8) {
   				partita.caselle[to] = {colore:colore,occupata:'regina'}
   			}
   		}
   		if(colore=='nero'){
   			if(to>55) {
   				partita.caselle[to] = {colore:colore,occupata:'regina'}
   			}
   		}
   	}
    //disegnaScacchieraTemp(partita)
}
function muoviI(partita) {
	if(auto) {
		turno = !turno;
	}

	var attacko = trovaAttacco(partita);
	$.each(attacko, function(index, val) {
		$.each(val.endings, function(index2, val2) {
			$('.casella').eq(val2).addClass('highlight2')
		});
	});

	var arrayMosse = trovaLeMosse(partita);
	$.each(arrayMosse, function(index, val) {
		$.each(val.endings, function(index2, val2) {
			$('.casella').eq(val2).addClass('highlight')
		});
	});

	var attackoNemico = trovaAttaccoNemico(partita);
	$.each(attackoNemico, function(index, val) {
		$.each(val.endings, function(index2, val2) {
			$('.casella').eq(val2).addClass('highlight3')
		});
	});



	if(arrayMosse.length==0) {
		if(auto) {
			if(turno) alert('vince il nero')
			else alert('vince il bianco')
		}
		else  {
			alert('hai vinto');
			$('.casella').removeClass('highlight').removeClass('highlight2').removeClass('highlight3')
		}
	}  else {
		faiCalcoliComplicatissimi(arrayMosse,partita);
		if(!steps) muovi(partita)
		if(auto) {
			if(!steps) setTimeout(function(){  muoviI(partita); }, 500);
		}
	}
}
function trovaLeMosse(partita,achi) {
	var hisMove = []
	if(achi!=undefined) {

	}
	else if(auto) {
		var achi = turno ? 'nero' : 'bianco';
		var avversario = turno ? 'bianco' : 'nero';
	} else {
		var achi = 'nero';
		var avversario = 'bianco'
	}
	var hisMove = []
	$.each(partita.caselle, function(index, val) {
		if(val.colore==achi) {
			hisMove.push({starting:index})
			var construzione = val.occupata+val.colore;
			var a  = possibilita(construzione,index,partita);
			var endings = [];
			for (var i = a.length - 1; i >= 0; i--) {
			  	endings.push(a[i])
			};
			hisMove[hisMove.length-1].endings = endings;
		}
	});
	var arrayMosse = [];
	$.each(hisMove, function(index, val) {
		if(val.endings.length!=0) {
			arrayMosse.push(val)
		}
	});
	if(true) { //rimuovo le mosse in scacco
		console.log('sono il '+achi)
		var darimuovere = []
		var simulazione;
		$.each(arrayMosse, function(index, val) {
			$.each(val.endings, function(index2, val2) {
				simulazione = JSON.parse(JSON.stringify(partita));
				simulaMuovi(simulazione,val.starting,val2);
				if(controllaScacco(simulazione,avversario)) {
		  	 		darimuovere.push([index,index2])
		 		}
			});
		});
		console.log(darimuovere)
		$.each(darimuovere, function(index, val) {
			arrayMosse[val[0]].endings[val[1]] = -1;
		});
		var arrayMosse2 = [];
		$.each(arrayMosse, function(index, val) {
			arrayMosse2.push({starting:val.starting,endings:[]})
			$.each(val.endings, function(index2, val2) {
				if(val2!=-1)
				arrayMosse2[arrayMosse2.length-1].endings.push(val2);
			});
		});
		arrayMosse = arrayMosse2;
		var arrayMosse2 = [];
		$.each(arrayMosse, function(index, val) {
			if(val.endings.length!=0) {
				arrayMosse2.push({starting:val.starting,endings:val.endings})
			}
		});
		return arrayMosse2;
	}
}
function trovaAttacco(partita,achi) {
	var hisMove = []
	if(achi!=undefined) {

	}
	else if(auto) {
		var achi = turno ? 'nero' : 'bianco';
		var avversario = turno ? 'bianco' : 'nero';
	} else {
		var achi = 'nero';
		var avversario = 'bianco'
	}
	var hisMove = []
	$.each(partita.caselle, function(index, val) {
		if(val.colore==achi) {
			hisMove.push({starting:index})
			var construzione = val.occupata+val.colore;
			var b  = possibilitaDiMangiare(construzione,index,partita);
			var endings = [];
			for (var i = b.length - 1; i >= 0; i--) {
			  	endings.push(b[i])
			};
			hisMove[hisMove.length-1].endings = endings;
		}
	});
	var arrayMosse = [];
	$.each(hisMove, function(index, val) {
		if(val.endings.length!=0) {
			arrayMosse.push(val)
		}
	});
	if(true) { //rimuovo le mosse in scacco
		var darimuovere = []
		var simulazione;
		$.each(arrayMosse, function(index, val) {
			$.each(val.endings, function(index2, val2) {
				simulazione = JSON.parse(JSON.stringify(partita));
				simulaMuovi(simulazione,val.starting,val2);
				if(controllaScacco(simulazione,avversario)) {
		  	 		darimuovere.push([index,index2])
		 		}
			});
		});
		$.each(darimuovere, function(index, val) {
			arrayMosse[val[0]].endings[val[1]] = -1;
		});
		var arrayMosse2 = [];
		$.each(arrayMosse, function(index, val) {
			arrayMosse2.push({starting:val.starting,endings:[]})
			$.each(val.endings, function(index2, val2) {
				if(val2!=-1)
				arrayMosse2[arrayMosse2.length-1].endings.push(val2);
			});
		});
		arrayMosse = arrayMosse2;
		var arrayMosse2 = [];
		$.each(arrayMosse, function(index, val) {
			if(val.endings.length!=0) {
				arrayMosse2.push({starting:val.starting,endings:val.endings})
			}
		});
		return arrayMosse2;
	}
}
function trovaAttaccoNemico(partita) {
	var hisMove = []
	if(auto) {
		var achi = !turno ? 'nero' : 'bianco';
		var avversario = !turno ? 'bianco' : 'nero';
	} else {
		var achi = 'bianco';
		var avversario = 'nero'
	}
	var hisMove = []
	$.each(partita.caselle, function(index, val) {
		if(val.colore==achi) {
			hisMove.push({starting:index})
			var construzione = val.occupata+val.colore;
			var b  = possibilitaDiMangiare(construzione,index,partita);
			var endings = [];
			for (var i = b.length - 1; i >= 0; i--) {
			  	endings.push(b[i])
			};
			hisMove[hisMove.length-1].endings = endings;
		}
	});
	var arrayMosse = [];
	$.each(hisMove, function(index, val) {
		if(val.endings.length!=0) {
			arrayMosse.push(val)
		}
	});
	if(true) { //rimuovo le mosse in scacco
		var darimuovere = []
		var simulazione;
		$.each(arrayMosse, function(index, val) {
			$.each(val.endings, function(index2, val2) {
				simulazione = JSON.parse(JSON.stringify(partita));
				simulaMuovi(simulazione,val.starting,val2);
				if(controllaScacco(simulazione,avversario)) {
		  	 		darimuovere.push([index,index2])
		 		}
			});
		});
		$.each(darimuovere, function(index, val) {
			arrayMosse[val[0]].endings[val[1]] = -1;
		});
		var arrayMosse2 = [];
		$.each(arrayMosse, function(index, val) {
			arrayMosse2.push({starting:val.starting,endings:[]})
			$.each(val.endings, function(index2, val2) {
				if(val2!=-1)
				arrayMosse2[arrayMosse2.length-1].endings.push(val2);
			});
		});
		arrayMosse = arrayMosse2;
		var arrayMosse2 = [];
		$.each(arrayMosse, function(index, val) {
			if(val.endings.length!=0) {
				arrayMosse2.push({starting:val.starting,endings:val.endings})
			}
		});
		return arrayMosse2;
	}
}
function faiCalcoliComplicatissimi(arrayMosse,partita) {
	var conto = 0;
	$.each(arrayMosse, function(index, val) {
		conto += val.endings.length
	});
	console.log(conto+' mosse possibili')


		//besaz AI
		var coloreCorrente = partita.caselle[arrayMosse[0].starting].colore;
		var statoCorrente = dammiStato(coloreCorrente,partita);
		console.log(statoCorrente)
		// console.log('-------')
		// console.log('le mosse: ')
		var sit = provaleTutte(arrayMosse,partita)


		var attaccateEscoperte = [];
		$.each(sit, function(index, val) {
			 	$.each(val.pedineAttaccate, function(index2, val2) {
			 		// console.log('attaccate:'); console.log(val2)
			 		// console.log('scoperte:'); console.log(val.pedineScoperte)
			 		 if(val.pedineScoperte.indexOf(val2)!=-1) {
			 		 	 //console.log('in posizione '+val2+' attaccata e scoperta, pessima mossa');
			 		 	 attaccateEscoperte.push(index)
			 		 }
			 	});
		});
		// console.log('--------------------------------');
		// console.log('mosse da non fare?');
		if(attaccateEscoperte.length>0) {
			console.log('eliminate')
			var lenuoveMosse = [];
			if(attaccateEscoperte.length<sit.length/2) {
				$.each(sit, function(index, val) {
					if(attaccateEscoperte.indexOf(index)==-1) {
						lenuoveMosse.push(val);
					} else {
						if(convertiInValore(partita.caselle[val.lamossa[0]].occupata)<=convertiInValore(partita.caselle[val.lamossa[1]].occupata))
						lenuoveMosse.push(val);
						else console.log(val)
						// console.log('col '+partita.caselle[val.lamossa[0]].occupata);
						// console.log('averi mangiato');
						// console.log('il '+partita.caselle[val.lamossa[1]].occupata)
					}
				});
				// console.log(sit)//sit = lenuoveMosse;
				 //console.log('elimino '+(sit.length-lenuoveMosse.length)+' mosse dannose')
				sit = lenuoveMosse;
			}
			console.log('-----------')


		}
		var scoperte = []
		//console.log(sit)
		if(true) {//mangia
			var mosseInCuiMangio = [];
			//console.log(sit)
			$.each(sit, function(index, val) {
				 //console.log(val)
				 if(statoCorrente.avversario>val.avversario) {
				 	console.log('posso mangiare in posizione: '+val.lamossa[1]);
				 	mosseInCuiMangio.push(index)
				 }

			});
			$.each(mosseInCuiMangio, function(index, val) {
				  //console.log(sit[val]);
				 if(sit[val].enemyattack.indexOf(sit[val].lamossa[1])!=-1) {
				 	 console.log('è coperta, valori:')
				 	 console.log('con il: '+partita.caselle[sit[val].lamossa[0]].occupata+' '+partita.caselle[sit[val].lamossa[0]].colore+' e vale: '+convertiInValore(partita.caselle[sit[val].lamossa[0]].occupata));
				 	 console.log('mangio il: '+partita.caselle[sit[val].lamossa[1]].occupata+' '+partita.caselle[sit[val].lamossa[1]].colore+' e vale: '+convertiInValore(partita.caselle[sit[val].lamossa[1]].occupata));
				 	 console.log('differenza: '+Math.abs(convertiInValore(partita.caselle[sit[val].lamossa[1]].occupata)-convertiInValore(partita.caselle[sit[val].lamossa[0]].occupata)))
				 	if(convertiInValore(partita.caselle[sit[val].lamossa[1]].occupata)>=convertiInValore(partita.caselle[sit[val].lamossa[0]].occupata)) {
				 			console.log('mangio lo stesso')
				 			scoperte.push(val)
				 	}
				 } else {
				 	console.log('è scoperta, valori:')
				 	console.log('con il: '+partita.caselle[sit[val].lamossa[0]].occupata+' '+partita.caselle[sit[val].lamossa[0]].colore+' e vale: '+convertiInValore(partita.caselle[sit[val].lamossa[0]].occupata));
				 	console.log('mangio il: '+partita.caselle[sit[val].lamossa[1]].occupata+' '+partita.caselle[sit[val].lamossa[1]].colore+' e vale: '+convertiInValore(partita.caselle[sit[val].lamossa[1]].occupata));

				 	scoperte.push(val)
				 }
			});
		}
		if(scoperte.length>0) {
			var byDate = scoperte.slice(0);
			// $.each(byDate, function(index, val) {
			// 	console.log(sit[val])
			// })
			byDate.sort(function(a,b) {
				return sit[a].avversario - sit[b].avversario; //mangiare quello che ha più valore
			    //return sit[a].pedineScoperte.length - sit[b].pedineScoperte.length;
			});
			// $.each(byDate, function(index, val) {
			// 	console.log(sit[val])
			// })
			console.log('mangio la pedina scoperta che mi conviene')
			currentMove.posizioneCorrente = sit[byDate[0]].lamossa[0];
			currentMove.posizioneFinale = sit[byDate[0]].lamossa[1];
		}
		else {


					var byDate = sit.slice(0);
  					var byDue = byDate;
					if(statoCorrente.avversario>10 || true) {



					console.log('ordino per pedine sotto attacco')
					byDate.sort(function(a,b) {
					    return a.totaleAttaccate - b.totaleAttaccate;
					});
					$.each(byDate, function(index, val) {
						 	//console.log(val)
					});
					var byDue = [];
					if(byDate.length>0) {
						console.log('rimuovo per pedine sotto attacco')
						$.each(byDate, function(index, val) {
							 if(val.totaleAttaccate==byDate[0].totaleAttaccate) {
							 	//console.log(index)
							 	byDue.push(val)
							 } else console.log(val)
						});
					} else byDue = byDate;

					console.log('ordino per pedine scoperte')
					byDate = byDue.slice(0);
					byDate.sort(function(a,b) {
				    return a.totaleScoperte - b.totaleScoperte;
					});
					//console.log('muovo per proteggere');
					var byDue = [];
					if(byDate.length>0) {
						console.log('rimuovo  per pedine scoperte')
						$.each(byDate, function(index, val) {
							 if(val.totaleScoperte==byDate[0].totaleScoperte) {
							 	byDue.push(val)
							 }  else console.log(val)
						});
					} else byDue = byDate;



					}

					console.log('ordino per pedine che attacco')
					byDate = byDue.slice(0);
					byDate.sort(function(a,b) {
				    return b.totaleCheAttacco - a.totaleCheAttacco;
					});
					var byDue = [];
					if(byDate.length>0) {
						console.log('rimuovo  per pedine che attacco')
						$.each(byDate, function(index, val) {
							 if(val.totaleCheAttacco==byDate[0].totaleCheAttacco) {
							 	byDue.push(val)
							 }  else console.log(val)
						});
					} else byDue = byDate;
					byDate = byDue;

					$.each(byDate, function(index, val) {
						 	console.log(val)
					});



					currentMove.posizioneCorrente = byDate[0].lamossa[0];
					currentMove.posizioneFinale = byDate[0].lamossa[1];

			}
}
function ordinaErimuovi(lemosse) {
}
function provaleTutte(arrayMosse,partita) {
	var coloreCorrente = partita.caselle[arrayMosse[0].starting].colore;
	var coloreAvversario = coloreCorrente=='bianco' ? 'nero' : 'bianco';
	var simulazione = [];
	var lamossa;
	var situazioni = [];
	$.each(arrayMosse, function(index, val) {
		$.each(val.endings, function(index2, val2) {
			simulazione = JSON.parse(JSON.stringify(partita));
			simulaMuovi(simulazione,val.starting,val2)
			lamossa = [val.starting,val2]
			situazioni.push(dammiStato(coloreCorrente,simulazione,lamossa))
		});
	});
	return(situazioni)
}
function dammiStato(coloreCorrente,partita,lamossa) {
	coloreCorrente;
	var coloreAvversario = coloreCorrente=='bianco' ? 'nero' : 'bianco';
	var statoattuale1 = 0;
	var statoattuale2 = 0;
	var pedineAttaccate = [];
	var pedineScoperte = [];
	var pedineCheAttacco = [];


	var attack = [];
	var cane = trovaAttacco(partita,coloreCorrente);
	$.each(cane, function(index, val) {
		$.each(val.endings, function(index2, val2) {
			if(attack.indexOf(val2)==-1) {
		  		attack.push(val2)
		  	}
		});
	});
	var enemyattack = [];
	var cane = trovaAttacco(partita,coloreAvversario);
	$.each(cane, function(index, val) {
		$.each(val.endings, function(index2, val2) {
			if(enemyattack.indexOf(val2)==-1) {
		  		enemyattack.push(val2)
		  	}
		});
	});
	$.each(partita.caselle, function(index, val) {
		if(val.colore==coloreCorrente) {
			if(enemyattack.indexOf(index)!=-1) pedineAttaccate.push(index)
			if(attack.indexOf(index)==-1) pedineScoperte.push(index)
			if(val.occupata=='pedone') statoattuale1=statoattuale1+1;
			if(val.occupata=='cavallo' || val.occupata=='alfiere') statoattuale1=statoattuale1+3;
			if(val.occupata=='torre') statoattuale1=statoattuale1+5;
			if(val.occupata=='regina') statoattuale1=statoattuale1+9;
		}
		else if(val.colore==coloreAvversario) {
			if(attack.indexOf(index)!=-1) pedineCheAttacco.push(index)
			if(val.occupata=='pedone') statoattuale2=statoattuale2+1;
			if(val.occupata=='cavallo' || val.occupata=='alfiere') statoattuale2=statoattuale2+3;
			if(val.occupata=='torre') statoattuale2=statoattuale2+5;
			if(val.occupata=='regina') statoattuale2=statoattuale2+9;
		}
	});
	var totaleAttaccate = 0;
		$.each(pedineAttaccate, function(index, val) {
			 totaleAttaccate+=convertiInValore(partita.caselle[val].occupata);
	});
	var totaleCheAttacco = 0;
		$.each(pedineCheAttacco, function(index, val) {
			 totaleCheAttacco+=convertiInValore(partita.caselle[val].occupata);
	});
	var totaleScoperte = 0;
		$.each(pedineScoperte, function(index, val) {
			 totaleScoperte+=convertiInValore(partita.caselle[val].occupata);
	});
	return {corrente:statoattuale1,avversario:statoattuale2,pedineCheAttacco:pedineCheAttacco,totaleCheAttacco:totaleCheAttacco,pedineAttaccate:pedineAttaccate,totaleAttaccate:totaleAttaccate,pedineScoperte:pedineScoperte,totaleScoperte:totaleScoperte,lamossa:lamossa!=undefined ? lamossa : 'stato corrente',attack:attack,enemyattack:enemyattack};
}
function convertiInValore(pedina) {
	if(pedina=='pedone') return 1;
	if(pedina=='cavallo' || pedina=='alfiere') return 3;
	if(pedina=='torre') return 5;
	if(pedina=='regina') return 9;
	if(pedina=='re') return 10;
}
function creaScacchiera(partita) {
	$('body').append("<div class='scacchiera'></div>");
    partita.caselle = []
	for (var i = 8; i > 0; i--) {
		 for (var il = 8; il > 0; il--) {
		 	if(i==2)
    		partita.caselle.push({colore:'bianco',occupata:'pedone'})
    		else if(i==7)
    		partita.caselle.push({colore:'nero',occupata:'pedone'})
    		else if(i==8 && (il == 2 || il == 7))
    		partita.caselle.push({colore:'nero',occupata:'cavallo'})
    		else if(i==1 && (il == 2 || il == 7))
    		partita.caselle.push({colore:'bianco',occupata:'cavallo'})
    		else if(i==8 && (il == 3 || il == 6))
    		partita.caselle.push({colore:'nero',occupata:'alfiere'})
    		else if(i==1 && (il == 3 || il == 6))
    		partita.caselle.push({colore:'bianco',occupata:'alfiere'})
    		else if(i==8 && (il == 1 || il == 8))
    		partita.caselle.push({colore:'nero',occupata:'torre'})
    		else if(i==1 && (il == 1 || il == 8))
    		partita.caselle.push({colore:'bianco',occupata:'torre'})
    		else if(i==8 && il == 4)
    		partita.caselle.push({colore:'nero',occupata:'re'})
    		else if(i==1 && il == 4)
    		partita.caselle.push({colore:'bianco',occupata:'re'})
    		else if(i==8 && il == 5)
    		partita.caselle.push({colore:'nero',occupata:'regina'})
    		else if(i==1 && il == 5)
    		partita.caselle.push({colore:'bianco',occupata:'regina'})
    		else
    		partita.caselle.push({colore:'no',occupata:'no'})
    	};
	};
	if(mode=='single') {
		$('body').append("<div class='controllo'></div>");
		$('.controllo').append("<input type='button' id='prima' value=''></input>");
		$('.controllo').append("<input type='button' id='dopo' value=''></input>");
	}
	localStorage.setItem('mosse', JSON.stringify([partita]));
	$('.scacchiera').addClass('rotate')
	setTimeout(function(){  $('.scacchiera').removeClass('rotate') }, 0);
}
function disegnaScacchiera(partita) {
	$('.scacchiera').html('');
	$.each(partita.caselle, function(index, val) {
		 var tipo = 'vuoto'
		 if(val.occupata!='no') tipo = val.occupata+val.colore
		 if(steps)
		 $('.scacchiera').append("<div class='casella "+tipo+"'><div>"+index+"</div></div>")
		 else
		 $('.scacchiera').append("<div class='casella "+tipo+"'></div>")
	});
}
function disegnaScacchieraTemp(partita) {
	$('body').append('<div class="scacchieraTemp"></div>');
	$.each(partita.caselle, function(index, val) {
		 var tipo = 'vuoto'
		 if(val.occupata!='no') tipo = val.occupata+val.colore
		 $('.scacchieraTemp').last().append("<div class='casella "+tipo+"'></div>")
	});
}
function possibilita(tipo,posizione,partita) {
	var possibilita = [];
	var suogiu;
	var avversario;
	var corrente;
	var posizioneoriginale = posizione;
	tipo.indexOf('bianco')==-1 ? suogiu=-1 : suogiu=1;
	tipo.indexOf('bianco')==-1 ? avversario='bianco' : avversario='nero';
	avversario=='nero'  ? corrente='bianco' : corrente='nero';
	if(tipo.indexOf('pedone')!=-1) {
		//pedone muove
		if(partita.caselle[posizione-(8*suogiu)].occupata=='no')
		possibilita.push(posizione-(8*suogiu))
		if(corrente=='bianco' && posizione<56 && posizione>47)
		if(partita.caselle[posizione-(16)].occupata=='no')
		if(partita.caselle[posizione-(8)].occupata=='no')
		possibilita.push(posizione-(16))
		if(corrente=='nero' && posizione<16 && posizione>7)
		if(partita.caselle[posizione+(16)].occupata=='no')
		if(partita.caselle[posizione+(8)].occupata=='no')
		possibilita.push(posizione+(16))
		//pedone mangia sx
		if(posizione%8!=0)
		if(partita.caselle[posizione-(8*suogiu)-1].occupata!='no' && partita.caselle[posizione-(8*suogiu)-1].colore==avversario)
		possibilita.push(posizione-(8*suogiu)-1)
		//pedone mangia dx
		if(posizione%8!=7)
		if(partita.caselle[posizione-(8*suogiu)+1].occupata!='no' && partita.caselle[posizione-(8*suogiu)+1].colore==avversario)
		possibilita.push(posizione-(8*suogiu)+1)
	}
	if(tipo.indexOf('cavallo')!=-1) {
		//cavallo muove
		if(posizione%8!=7 && posizione>15)
		if(partita.caselle[posizione-(16)+1].colore!=corrente)
		possibilita.push(posizione-(16)+1)
		if(posizione%8!=0 && posizione>15)
		if(partita.caselle[posizione-(16)-1].colore!=corrente)
		possibilita.push(posizione-(16)-1)
		if(posizione%8!=7 && posizione<48)
		if(partita.caselle[posizione-(-16)+1].colore!=corrente)
		possibilita.push(posizione-(-16)+1)
		if(posizione%8!=0 && posizione<48)
		if(partita.caselle[posizione-(-16)-1].colore!=corrente)
		possibilita.push(posizione-(-16)-1)
		if(posizione%8>1 && posizione<56)
		if(partita.caselle[posizione-(-8)-2].colore!=corrente)
		possibilita.push(posizione-(-8)-2)
		if(posizione%8>1 && posizione>7)
		if(partita.caselle[posizione-(8)-2].colore!=corrente)
		possibilita.push(posizione-(8)-2)
		if(posizione%8<6 && posizione<56)
		if(partita.caselle[posizione-(-8)+2].colore!=corrente)
		possibilita.push(posizione-(-8)+2)
		if(posizione%8<6 && posizione>7)
		if(partita.caselle[posizione-(8)+2].colore!=corrente)
		possibilita.push(posizione-(8)+2)
	}
	if(tipo.indexOf('alfiere')!=-1 || tipo.indexOf('regina')!=-1) {
		var temp;
		//alto sinistra
		if(posizione%8!=0 && posizione>7)
		if(partita.caselle[posizione-(8)-1].colore!=corrente) {
			temp = partita.caselle[posizione-(8)-1].colore;
			possibilita.push(posizione-(8)-1);
			var nuovaposizione = (posizione-(8)-1);
			if(temp=='no')
			if(nuovaposizione%8!=0 && nuovaposizione>7) {
				if(partita.caselle[nuovaposizione-(8)-1].colore!=corrente) {
					temp = partita.caselle[nuovaposizione-(8)-1].colore;
					possibilita.push(nuovaposizione-(8)-1);
					nuovaposizione = (nuovaposizione-(8)-1);
					if(temp=='no')
					if(nuovaposizione%8!=0 && nuovaposizione>7) {
						if(partita.caselle[nuovaposizione-(8)-1].colore!=corrente) {
							temp = partita.caselle[nuovaposizione-(8)-1].colore;
							possibilita.push(nuovaposizione-(8)-1);
							nuovaposizione = (nuovaposizione-(8)-1);
							if(temp=='no')
							if(nuovaposizione%8!=0 && nuovaposizione>7) {
								if(partita.caselle[nuovaposizione-(8)-1].colore!=corrente) {
									temp = partita.caselle[nuovaposizione-(8)-1].colore;
									possibilita.push(nuovaposizione-(8)-1);
									nuovaposizione = (nuovaposizione-(8)-1);
									if(temp=='no')
									if(nuovaposizione%8!=0 && nuovaposizione>7) {
										if(partita.caselle[nuovaposizione-(8)-1].colore!=corrente) {
											temp = partita.caselle[nuovaposizione-(8)-1].colore;
											possibilita.push(nuovaposizione-(8)-1);
											nuovaposizione = (nuovaposizione-(8)-1);
											if(temp=='no')
											if(nuovaposizione%8!=0 && nuovaposizione>7) {
												if(partita.caselle[nuovaposizione-(8)-1].colore!=corrente) {
													temp = partita.caselle[nuovaposizione-(8)-1].colore;
													possibilita.push(nuovaposizione-(8)-1);
													nuovaposizione = (nuovaposizione-(8)-1);
													if(temp=='no')
													if(nuovaposizione%8!=0 && nuovaposizione>7) {
														if(partita.caselle[nuovaposizione-(8)-1].colore!=corrente) {
															possibilita.push(nuovaposizione-(8)-1);
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		//alto destra
		posizione = posizioneoriginale;
		if(posizione%8!=7 && posizione>7)
		if(partita.caselle[posizione-(8)+1].colore!=corrente) {
			temp = partita.caselle[posizione-(8)+1].colore;
			possibilita.push(posizione-(8)+1)
			posizione = (posizione-(8)+1);
			if(temp=='no')
			if(posizione%8!=7 && posizione>7) {
				if(partita.caselle[posizione-(8)+1].colore!=corrente) {
					temp = partita.caselle[posizione-(8)+1].colore;
					possibilita.push(posizione-(8)+1);
					posizione = (posizione-(8)+1);
					if(temp=='no')
					if(posizione%8!=7 && posizione>7) {
						if(partita.caselle[posizione-(8)+1].colore!=corrente) {
							temp = partita.caselle[posizione-(8)+1].colore;
							possibilita.push(posizione-(8)+1);
							posizione = (posizione-(8)+1);
							if(temp=='no')
							if(posizione%8!=7 && posizione>7) {
								if(partita.caselle[posizione-(8)+1].colore!=corrente) {
									temp = partita.caselle[posizione-(8)+1].colore;
									possibilita.push(posizione-(8)+1);
									posizione = (posizione-(8)+1);
									if(temp=='no')
									if(posizione%8!=7 && posizione>7) {
										if(partita.caselle[posizione-(8)+1].colore!=corrente) {
											temp = partita.caselle[posizione-(8)+1].colore;
											possibilita.push(posizione-(8)+1);
											posizione = (posizione-(8)+1);
											if(temp=='no')
											if(posizione%8!=7 && posizione>7) {
												if(partita.caselle[posizione-(8)+1].colore!=corrente) {
													temp = partita.caselle[posizione-(8)+1].colore;
													possibilita.push(posizione-(8)+1);
													posizione = (posizione-(8)+1);
													if(temp=='no')
													if(posizione%8!=7 && posizione>7) {
														if(partita.caselle[posizione-(8)+1].colore!=corrente) {
															possibilita.push(posizione-(8)+1);
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		//basso sinistra
		posizione = posizioneoriginale;
		if(posizione%8!=0 && posizione<56) {
			if(partita.caselle[posizione+7].colore!=corrente) {
				temp = partita.caselle[posizione+7].colore;
				possibilita.push(posizione+7);
				posizione = posizione+7;
				if(temp=='no') {
					if(posizione%8!=0 && posizione<56) {
						if(partita.caselle[posizione+7].colore!=corrente) {
							temp = partita.caselle[posizione+7].colore;
							possibilita.push(posizione+7);
							posizione = posizione+7;
							if(temp=='no') {
								if(posizione%8!=0 && posizione<56) {
									if(partita.caselle[posizione+7].colore!=corrente) {
										temp = partita.caselle[posizione+7].colore;
										possibilita.push(posizione+7);
										posizione = posizione+7;
										if(temp=='no') {
											if(posizione%8!=0 && posizione<56) {
												if(partita.caselle[posizione+7].colore!=corrente) {
													temp = partita.caselle[posizione+7].colore;
													possibilita.push(posizione+7);
													posizione = posizione+7;
													if(temp=='no') {
														if(posizione%8!=0 && posizione<56) {
															if(partita.caselle[posizione+7].colore!=corrente) {
																temp = partita.caselle[posizione+7].colore;
																possibilita.push(posizione+7);
																posizione = posizione+7;
																if(temp=='no') {
																	if(posizione%8!=0 && posizione<56) {
																		if(partita.caselle[posizione+7].colore!=corrente) {
																			temp = partita.caselle[posizione+7].colore;
																			possibilita.push(posizione+7);
																			posizione = posizione+7;
																			if(temp=='no') {
																				if(posizione%8!=0 && posizione<56) {
																					if(partita.caselle[posizione+7].colore!=corrente) {
																						possibilita.push(posizione+7);
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		//basso destra
		posizione = posizioneoriginale;
		if(posizione%8!=7 && posizione<56) {
			if(partita.caselle[posizione+9].colore!=corrente) {
				temp = partita.caselle[posizione+9].colore;
				possibilita.push(posizione+9);
				posizione = posizione+9;
				if(temp=='no') {
					if(posizione%8!=7 && posizione<56) {
						if(partita.caselle[posizione+9].colore!=corrente) {
							temp = partita.caselle[posizione+9].colore;
							possibilita.push(posizione+9);
							posizione = posizione+9;
							if(temp=='no') {
								if(posizione%8!=7 && posizione<56) {
									if(partita.caselle[posizione+9].colore!=corrente) {
										temp = partita.caselle[posizione+9].colore;
										possibilita.push(posizione+9);
										posizione = posizione+9;
										if(temp=='no') {
											if(posizione%8!=7 && posizione<56) {
												if(partita.caselle[posizione+9].colore!=corrente) {
													temp = partita.caselle[posizione+9].colore;
													possibilita.push(posizione+9);
													posizione = posizione+9;
													if(temp=='no') {
														if(posizione%8!=7 && posizione<56) {
															if(partita.caselle[posizione+9].colore!=corrente) {
																temp = partita.caselle[posizione+9].colore;
																possibilita.push(posizione+9);
																posizione = posizione+9;
																if(temp=='no') {
																	if(posizione%8!=7 && posizione<56) {
																		if(partita.caselle[posizione+9].colore!=corrente) {
																			temp = partita.caselle[posizione+9].colore;
																			possibilita.push(posizione+9);
																			posizione = posizione+9;
																			if(temp=='no') {
																				if(posizione%8!=7 && posizione<56) {
																					if(partita.caselle[posizione+9].colore!=corrente) {
																						possibilita.push(posizione+9);
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(tipo.indexOf('torre')!=-1 || tipo.indexOf('regina')!=-1) {
		var temp;
		//alto
		posizione = posizioneoriginale;
		if(posizione>7) {
			if(partita.caselle[posizione-(8)].colore!=corrente) {
				temp = partita.caselle[posizione-(8)].colore;
				possibilita.push(posizione-(8));
				posizione = (posizione-(8));
				if(temp=='no') {
					if(posizione>7) {
						if(partita.caselle[posizione-(8)].colore!=corrente) {
							temp = partita.caselle[posizione-(8)].colore;
							possibilita.push(posizione-(8));
							posizione = (posizione-(8));
							if(temp=='no') {
								if(posizione>7) {
									if(partita.caselle[posizione-(8)].colore!=corrente) {
										temp = partita.caselle[posizione-(8)].colore;
										possibilita.push(posizione-(8));
										posizione = (posizione-(8));
										if(temp=='no') {
											if(posizione>7) {
												if(partita.caselle[posizione-(8)].colore!=corrente) {
													temp = partita.caselle[posizione-(8)].colore;
													possibilita.push(posizione-(8));
													posizione = (posizione-(8));
													if(temp=='no') {
														if(posizione>7) {
															if(partita.caselle[posizione-(8)].colore!=corrente) {
																temp = partita.caselle[posizione-(8)].colore;
																possibilita.push(posizione-(8));
																posizione = (posizione-(8));
																if(temp=='no') {
																	if(posizione>7) {
																		if(partita.caselle[posizione-(8)].colore!=corrente) {
																			temp = partita.caselle[posizione-(8)].colore;
																			possibilita.push(posizione-(8));
																			posizione = (posizione-(8));
																			if(temp=='no') {
																				if(posizione>7) {
																					if(partita.caselle[posizione-(8)].colore!=corrente) {
																						possibilita.push(posizione-(8));
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		//basso
		posizione = posizioneoriginale;
		if(posizione<56) {
			if(partita.caselle[posizione+(8)].colore!=corrente) {
				temp = partita.caselle[posizione+(8)].colore;
				possibilita.push(posizione+(8));
				posizione = (posizione+(8));
				if(temp=='no') {
					if(posizione<56) {
						if(partita.caselle[posizione+(8)].colore!=corrente) {
							temp = partita.caselle[posizione+(8)].colore;
							possibilita.push(posizione+(8));
							posizione = (posizione+(8));
							if(temp=='no') {
								if(posizione<56) {
									if(partita.caselle[posizione+(8)].colore!=corrente) {
										temp = partita.caselle[posizione+(8)].colore;
										possibilita.push(posizione+(8));
										posizione = (posizione+(8));
										if(temp=='no') {
											if(posizione<56) {
												if(partita.caselle[posizione+(8)].colore!=corrente) {
													temp = partita.caselle[posizione+(8)].colore;
													possibilita.push(posizione+(8));
													posizione = (posizione+(8));
													if(temp=='no') {
														if(posizione<56) {
															if(partita.caselle[posizione+(8)].colore!=corrente) {
																temp = partita.caselle[posizione+(8)].colore;
																possibilita.push(posizione+(8));
																posizione = (posizione+(8));
																if(temp=='no') {
																	if(posizione<56) {
																		if(partita.caselle[posizione+(8)].colore!=corrente) {
																			temp = partita.caselle[posizione+(8)].colore;
																			possibilita.push(posizione+(8));
																			posizione = (posizione+(8));
																			if(temp=='no') {
																				if(posizione<56) {
																					if(partita.caselle[posizione+(8)].colore!=corrente) {
																						possibilita.push(posizione+(8));
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		//destra
		posizione = posizioneoriginale;
		if(posizione%8!=7) {
			if(partita.caselle[posizione+(1)].colore!=corrente) {
				temp = partita.caselle[posizione+(1)].colore;
				possibilita.push(posizione+(1));
				posizione = (posizione+(1));
				if(temp=='no') {
					if(posizione%8!=7) {
						if(partita.caselle[posizione+1].colore!=corrente) {
							temp = partita.caselle[posizione+1].colore;
							possibilita.push(posizione+1);
							posizione = (posizione+1);
							if(temp=='no') {
								if(posizione%8!=7) {
									if(partita.caselle[posizione+1].colore!=corrente) {
										temp = partita.caselle[posizione+1].colore;
										possibilita.push(posizione+1);
										posizione = (posizione+1);
										if(temp=='no') {
											if(posizione%8!=7) {
												if(partita.caselle[posizione+1].colore!=corrente) {
													temp = partita.caselle[posizione+1].colore;
													possibilita.push(posizione+1);
													posizione = (posizione+1);
													if(temp=='no') {
														if(posizione%8!=7) {
															if(partita.caselle[posizione+1].colore!=corrente) {
																temp = partita.caselle[posizione+1].colore;
																possibilita.push(posizione+1);
																posizione = (posizione+1);
																if(temp=='no') {
																	if(posizione%8!=7) {
																		if(partita.caselle[posizione+1].colore!=corrente) {
																			temp = partita.caselle[posizione+1].colore;
																			possibilita.push(posizione+1);
																			posizione = (posizione+1);
																			if(temp=='no') {
																				if(posizione%8!=7) {
																					if(partita.caselle[posizione+1].colore!=corrente) {
																						possibilita.push(posizione+1);
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		//sinistra
		posizione = posizioneoriginale;
		if(posizione%8!=0) {
			if(partita.caselle[posizione-(1)].colore!=corrente) {
				temp = partita.caselle[posizione-(1)].colore;
				possibilita.push(posizione-(1));
				posizione = (posizione-(1));
				if(temp=='no') {
					if(posizione%8!=0) {
						if(partita.caselle[posizione-1].colore!=corrente) {
							temp = partita.caselle[posizione-1].colore;
							possibilita.push(posizione-1);
							posizione = (posizione-1);
							if(temp=='no') {
								if(posizione%8!=0) {
									if(partita.caselle[posizione-1].colore!=corrente) {
										temp = partita.caselle[posizione-1].colore;
										possibilita.push(posizione-1);
										posizione = (posizione-1);
										if(temp=='no') {
											if(posizione%8!=0) {
												if(partita.caselle[posizione-1].colore!=corrente) {
													temp = partita.caselle[posizione-1].colore;
													possibilita.push(posizione-1);
													posizione = (posizione-1);
													if(temp=='no') {
														if(posizione%8!=0) {
															if(partita.caselle[posizione-1].colore!=corrente) {
																temp = partita.caselle[posizione-1].colore;
																possibilita.push(posizione-1);
																posizione = (posizione-1);
																if(temp=='no') {
																	if(posizione%8!=0) {
																		if(partita.caselle[posizione-1].colore!=corrente) {
																			temp = partita.caselle[posizione-1].colore;
																			possibilita.push(posizione-1);
																			posizione = (posizione-1);
																			if(temp=='no') {
																				if(posizione%8!=0) {
																					if(partita.caselle[posizione-1].colore!=corrente) {
																						possibilita.push(posizione-1);
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(tipo=='rebianco' || tipo=='renero' || tipo.indexOf(' rebianco')!=-1 || tipo.indexOf(' renero')!=-1) {
		posizione = posizioneoriginale;
		if(posizione>7) {
			if(partita.caselle[posizione-(8)].colore!=corrente) {
				possibilita.push(posizione-(8))
			}
		}
		if(posizione<56) {
			if(partita.caselle[posizione+(8)].colore!=corrente) {
				possibilita.push(posizione+(8))
			}
		}
		if(posizione%8!=0) {
			if(partita.caselle[posizione-(1)].colore!=corrente) {
				possibilita.push(posizione-(1))
			}
		}
		if(posizione%8!=7) {
			if(partita.caselle[posizione+(1)].colore!=corrente) {
				possibilita.push(posizione+(1))
			}
		}
		if(posizione%8!=7 && posizione>7) {
			if(partita.caselle[posizione-(7)].colore!=corrente) {
				possibilita.push(posizione-(7))
			}
		}
		if(posizione%8!=0 && posizione>7) {
			if(partita.caselle[posizione-(9)].colore!=corrente) {
				possibilita.push(posizione-(9))
			}
		}
		if(posizione%8!=0 && posizione<56) {
			if(partita.caselle[posizione+(7)].colore!=corrente) {
				possibilita.push(posizione+(7))
			}
		}
		if(posizione%8!=7 && posizione<56) {
			if(partita.caselle[posizione+(9)].colore!=corrente) {
				possibilita.push(posizione+(9))
			}
		}
	}
	return possibilita;
}
function possibilitaDiMangiare(tipo,posizione,partita) {
	var possibilita = [];
	var suogiu;
	var avversario;
	var corrente;
	var posizioneoriginale = posizione;
	tipo.indexOf('bianco')==-1 ? suogiu=-1 : suogiu=1;
	tipo.indexOf('bianco')==-1 ? avversario='bianco' : avversario='nero';
	avversario=='nero'  ? corrente='bianco' : corrente='nero';
	if(tipo.indexOf('pedone')!=-1) {
		//pedone mangia sx
		if(posizione%8!=0)
		possibilita.push(posizione-(8*suogiu)-1)
		//pedone mangia dx
		if(posizione%8!=7)
		possibilita.push(posizione-(8*suogiu)+1)
	}
	if(tipo.indexOf('cavallo')!=-1) {
		//cavallo muove
		if(posizione%8!=7 && posizione>15)
		possibilita.push(posizione-(16)+1)
		if(posizione%8!=0 && posizione>15)
		possibilita.push(posizione-(16)-1)
		if(posizione%8!=7 && posizione<48)
		possibilita.push(posizione-(-16)+1)
		if(posizione%8!=0 && posizione<48)
		possibilita.push(posizione-(-16)-1)
		if(posizione%8>1 && posizione<56)
		possibilita.push(posizione-(-8)-2)
		if(posizione%8>1 && posizione>7)
		possibilita.push(posizione-(8)-2)
		if(posizione%8<6 && posizione<56)
		possibilita.push(posizione-(-8)+2)
		if(posizione%8<6 && posizione>7)
		possibilita.push(posizione-(8)+2)
	}
	if(tipo.indexOf('alfiere')!=-1 || tipo.indexOf('regina')!=-1) {
		var temp;
		//alto sinistra
		if(posizione%8!=0 && posizione>7){
				temp = partita.caselle[posizione-(8)-1].colore;
				possibilita.push(posizione-(8)-1);
				var nuovaposizione = (posizione-(8)-1);
				if(temp=='no')
				if(nuovaposizione%8!=0 && nuovaposizione>7) {
						temp = partita.caselle[nuovaposizione-(8)-1].colore;
						possibilita.push(nuovaposizione-(8)-1);
						nuovaposizione = (nuovaposizione-(8)-1);
						if(temp=='no')
						if(nuovaposizione%8!=0 && nuovaposizione>7) {
								temp = partita.caselle[nuovaposizione-(8)-1].colore;
								possibilita.push(nuovaposizione-(8)-1);
								nuovaposizione = (nuovaposizione-(8)-1);
								if(temp=='no')
								if(nuovaposizione%8!=0 && nuovaposizione>7) {
										temp = partita.caselle[nuovaposizione-(8)-1].colore;
										possibilita.push(nuovaposizione-(8)-1);
										nuovaposizione = (nuovaposizione-(8)-1);
										if(temp=='no')
										if(nuovaposizione%8!=0 && nuovaposizione>7) {
												temp = partita.caselle[nuovaposizione-(8)-1].colore;
												possibilita.push(nuovaposizione-(8)-1);
												nuovaposizione = (nuovaposizione-(8)-1);
												if(temp=='no')
												if(nuovaposizione%8!=0 && nuovaposizione>7) {
														temp = partita.caselle[nuovaposizione-(8)-1].colore;
														possibilita.push(nuovaposizione-(8)-1);
														nuovaposizione = (nuovaposizione-(8)-1);
														if(temp=='no')
														if(nuovaposizione%8!=0 && nuovaposizione>7) {
																possibilita.push(nuovaposizione-(8)-1);
														}
												}
										}
								}
						}
				}
 		}
		//alto destra
		posizione = posizioneoriginale;
		if(posizione%8!=7 && posizione>7) {
			temp = partita.caselle[posizione-(8)+1].colore;
			possibilita.push(posizione-(8)+1)
			posizione = (posizione-(8)+1);
			if(temp=='no')
			if(posizione%8!=7 && posizione>7) {
					temp = partita.caselle[posizione-(8)+1].colore;
					possibilita.push(posizione-(8)+1);
					posizione = (posizione-(8)+1);
					if(temp=='no')
					if(posizione%8!=7 && posizione>7) {
							temp = partita.caselle[posizione-(8)+1].colore;
							possibilita.push(posizione-(8)+1);
							posizione = (posizione-(8)+1);
							if(temp=='no')
							if(posizione%8!=7 && posizione>7) {
									temp = partita.caselle[posizione-(8)+1].colore;
									possibilita.push(posizione-(8)+1);
									posizione = (posizione-(8)+1);
									if(temp=='no')
									if(posizione%8!=7 && posizione>7) {
											temp = partita.caselle[posizione-(8)+1].colore;
											possibilita.push(posizione-(8)+1);
											posizione = (posizione-(8)+1);
											if(temp=='no')
											if(posizione%8!=7 && posizione>7) {
													temp = partita.caselle[posizione-(8)+1].colore;
													possibilita.push(posizione-(8)+1);
													posizione = (posizione-(8)+1);
													if(temp=='no')
													if(posizione%8!=7 && posizione>7) {
															possibilita.push(posizione-(8)+1);
													}
											}
									}
							}
					}
			}
		}
		//basso sinistra
		posizione = posizioneoriginale;
		if(posizione%8!=0 && posizione<56) {
				temp = partita.caselle[posizione+7].colore;
				possibilita.push(posizione+7);
				posizione = posizione+7;
				if(temp=='no') {
					if(posizione%8!=0 && posizione<56) {
							temp = partita.caselle[posizione+7].colore;
							possibilita.push(posizione+7);
							posizione = posizione+7;
							if(temp=='no') {
								if(posizione%8!=0 && posizione<56) {
										temp = partita.caselle[posizione+7].colore;
										possibilita.push(posizione+7);
										posizione = posizione+7;
										if(temp=='no') {
											if(posizione%8!=0 && posizione<56) {
													temp = partita.caselle[posizione+7].colore;
													possibilita.push(posizione+7);
													posizione = posizione+7;
													if(temp=='no') {
														if(posizione%8!=0 && posizione<56) {
																temp = partita.caselle[posizione+7].colore;
																possibilita.push(posizione+7);
																posizione = posizione+7;
																if(temp=='no') {
																	if(posizione%8!=0 && posizione<56) {
																			temp = partita.caselle[posizione+7].colore;
																			possibilita.push(posizione+7);
																			posizione = posizione+7;
																			if(temp=='no') {
																				if(posizione%8!=0 && posizione<56) {
																						possibilita.push(posizione+7);
																				}
																			}
																	}
																}
														}
													}
											}
										}
								}
							}
					}
				}
		}
		//basso destra
		posizione = posizioneoriginale;
		if(posizione%8!=7 && posizione<56) {
				temp = partita.caselle[posizione+9].colore;
				possibilita.push(posizione+9);
				posizione = posizione+9;
				if(temp=='no') {
					if(posizione%8!=7 && posizione<56) {
							temp = partita.caselle[posizione+9].colore;
							possibilita.push(posizione+9);
							posizione = posizione+9;
							if(temp=='no') {
								if(posizione%8!=7 && posizione<56) {
										temp = partita.caselle[posizione+9].colore;
										possibilita.push(posizione+9);
										posizione = posizione+9;
										if(temp=='no') {
											if(posizione%8!=7 && posizione<56) {
													temp = partita.caselle[posizione+9].colore;
													possibilita.push(posizione+9);
													posizione = posizione+9;
													if(temp=='no') {
														if(posizione%8!=7 && posizione<56) {
																temp = partita.caselle[posizione+9].colore;
																possibilita.push(posizione+9);
																posizione = posizione+9;
																if(temp=='no') {
																	if(posizione%8!=7 && posizione<56) {
																			temp = partita.caselle[posizione+9].colore;
																			possibilita.push(posizione+9);
																			posizione = posizione+9;
																			if(temp=='no') {
																				if(posizione%8!=7 && posizione<56) {
																						possibilita.push(posizione+9);
																				}
																			}
																	}
																}
														}
													}
											}
										}
								}
							}
					}
				}
		}
	}
	if(tipo.indexOf('torre')!=-1 || tipo.indexOf('regina')!=-1) {
		var temp;
		//alto
		posizione = posizioneoriginale;
		if(posizione>7) {
				temp = partita.caselle[posizione-(8)].colore;
				possibilita.push(posizione-(8));
				posizione = (posizione-(8));
				if(temp=='no') {
					if(posizione>7) {
							temp = partita.caselle[posizione-(8)].colore;
							possibilita.push(posizione-(8));
							posizione = (posizione-(8));
							if(temp=='no') {
								if(posizione>7) {
										temp = partita.caselle[posizione-(8)].colore;
										possibilita.push(posizione-(8));
										posizione = (posizione-(8));
										if(temp=='no') {
											if(posizione>7) {
													temp = partita.caselle[posizione-(8)].colore;
													possibilita.push(posizione-(8));
													posizione = (posizione-(8));
													if(temp=='no') {
														if(posizione>7) {
																temp = partita.caselle[posizione-(8)].colore;
																possibilita.push(posizione-(8));
																posizione = (posizione-(8));
																if(temp=='no') {
																	if(posizione>7) {
																			temp = partita.caselle[posizione-(8)].colore;
																			possibilita.push(posizione-(8));
																			posizione = (posizione-(8));
																			if(temp=='no') {
																				if(posizione>7) {
																						possibilita.push(posizione-(8));
																				}
																			}
																	}
																}
														}
													}
											}
										}
								}
							}
					}
				}
		}
		//basso
		posizione = posizioneoriginale;
		if(posizione<56) {
				temp = partita.caselle[posizione+(8)].colore;
				possibilita.push(posizione+(8));
				posizione = (posizione+(8));
				if(temp=='no') {
					if(posizione<56) {
							temp = partita.caselle[posizione+(8)].colore;
							possibilita.push(posizione+(8));
							posizione = (posizione+(8));
							if(temp=='no') {
								if(posizione<56) {
										temp = partita.caselle[posizione+(8)].colore;
										possibilita.push(posizione+(8));
										posizione = (posizione+(8));
										if(temp=='no') {
											if(posizione<56) {
													temp = partita.caselle[posizione+(8)].colore;
													possibilita.push(posizione+(8));
													posizione = (posizione+(8));
													if(temp=='no') {
														if(posizione<56) {
																temp = partita.caselle[posizione+(8)].colore;
																possibilita.push(posizione+(8));
																posizione = (posizione+(8));
																if(temp=='no') {
																	if(posizione<56) {
																			temp = partita.caselle[posizione+(8)].colore;
																			possibilita.push(posizione+(8));
																			posizione = (posizione+(8));
																			if(temp=='no') {
																				if(posizione<56) {
																						possibilita.push(posizione+(8));
																				}
																			}
																	}
																}
														}
													}
											}
										}
								}
							}
					}
				}
		}
		//destra
		posizione = posizioneoriginale;
		if(posizione%8!=7) {
				temp = partita.caselle[posizione+(1)].colore;
				possibilita.push(posizione+(1));
				posizione = (posizione+(1));
				if(temp=='no') {
					if(posizione%8!=7) {
							temp = partita.caselle[posizione+1].colore;
							possibilita.push(posizione+1);
							posizione = (posizione+1);
							if(temp=='no') {
								if(posizione%8!=7) {
										temp = partita.caselle[posizione+1].colore;
										possibilita.push(posizione+1);
										posizione = (posizione+1);
										if(temp=='no') {
											if(posizione%8!=7) {
													temp = partita.caselle[posizione+1].colore;
													possibilita.push(posizione+1);
													posizione = (posizione+1);
													if(temp=='no') {
														if(posizione%8!=7) {
																temp = partita.caselle[posizione+1].colore;
																possibilita.push(posizione+1);
																posizione = (posizione+1);
																if(temp=='no') {
																	if(posizione%8!=7) {
																			temp = partita.caselle[posizione+1].colore;
																			possibilita.push(posizione+1);
																			posizione = (posizione+1);
																			if(temp=='no') {
																				if(posizione%8!=7) {
																						possibilita.push(posizione+1);
																				}
																			}
																	}
																}
														}
													}
											}
										}
								}
							}
					}
				}
		}
		//sinistra
		posizione = posizioneoriginale;
		if(posizione%8!=0) {
				temp = partita.caselle[posizione-(1)].colore;
				possibilita.push(posizione-(1));
				posizione = (posizione-(1));
				if(temp=='no') {
					if(posizione%8!=0) {
							temp = partita.caselle[posizione-1].colore;
							possibilita.push(posizione-1);
							posizione = (posizione-1);
							if(temp=='no') {
								if(posizione%8!=0) {
										temp = partita.caselle[posizione-1].colore;
										possibilita.push(posizione-1);
										posizione = (posizione-1);
										if(temp=='no') {
											if(posizione%8!=0) {
													temp = partita.caselle[posizione-1].colore;
													possibilita.push(posizione-1);
													posizione = (posizione-1);
													if(temp=='no') {
														if(posizione%8!=0) {
																temp = partita.caselle[posizione-1].colore;
																possibilita.push(posizione-1);
																posizione = (posizione-1);
																if(temp=='no') {
																	if(posizione%8!=0) {
																			temp = partita.caselle[posizione-1].colore;
																			possibilita.push(posizione-1);
																			posizione = (posizione-1);
																			if(temp=='no') {
																				if(posizione%8!=0) {
																						possibilita.push(posizione-1);
																				}
																			}
																	}
																}
														}
													}
											}
										}
								}
							}
					}
				}
		}
	}
	if(tipo=='rebianco' || tipo=='renero' || tipo.indexOf(' rebianco')!=-1 || tipo.indexOf(' renero')!=-1) {
		posizione = posizioneoriginale;
		if(posizione>7) {
				possibilita.push(posizione-(8))
		}
		if(posizione<56) {
				possibilita.push(posizione+(8))
		}
		if(posizione%8!=0) {
				possibilita.push(posizione-(1))
		}
		if(posizione%8!=7) {
				possibilita.push(posizione+(1))
		}
		if(posizione%8!=7 && posizione>7) {
				possibilita.push(posizione-(7))
		}
		if(posizione%8!=0 && posizione>7) {
				possibilita.push(posizione-(9))
		}
		if(posizione%8!=0 && posizione<56) {
				possibilita.push(posizione+(7))
		}
		if(posizione%8!=7 && posizione<56) {
				possibilita.push(posizione+(9))
		}
	}
	return possibilita;
}
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
