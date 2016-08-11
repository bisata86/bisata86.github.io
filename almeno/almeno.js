


$( document ).ready(function() {
    var carte = [];
    var fight = [];
    var freeP1pos;
    var freeP2pos;
    var points =  {p1:0,p2:0};
    var seme = 'hearts';
    for (var i = 40; i > 0; i--) {

        if(i%10==0 && i!=40) {change();}

        var currNum;
        if(i%10==0) currNum = 10;
        else currNum = i%10;

        carte.push({numero:currNum+'',seme:seme,app:'mazzo'});
    };
    function change() {
        if(seme=='hearts') seme = 'diamonds';
        else if(seme=='diamonds') seme = 'clubs';
        else if(seme=='clubs') seme = 'spades';
    }
    //console.log(carte);
    shuffle(carte);
    startGame()
    displayGame();
    fixCards();

    function startGame() {
        for (var i = 9; i >= 0; i--) {
            carte[i].app = 'p1'
        };
        for (var i = 19; i > 9; i--) {
            carte[i].app = 'p2'
        };
    }

    function displayGame() {
        var structure = "<div class='p1'>";
        for (var i = carte.length-1; i >= 0; i--) {
            if(carte[i].app == 'p1') {
                var curClass = convertLetters(carte[i].numero)+'_of_'+carte[i].seme;
                structure += "<div class='card "+curClass+"'></div>";
            }
        };
        structure += "</div>";
        $('body').append(structure);
        structure = "<div class='p2'>";
        for (var i = carte.length-1; i >= 0; i--) {
            if(carte[i].app == 'p2') {
            var curClass = convertLetters(carte[i].numero)+'_of_'+carte[i].seme;
            structure += "<div class='card "+curClass+"'></div>";
            }
        };
        structure += "</div>";
        $('body').append("<div class='deck card'></div>");
        $('body').append(structure);
             var curheight = ($('.p2').width()/5)*1.452;
            $('.card').css({
                 height: curheight
            });
         if($(window).height()/1.7<$(window).width()) {
                console.log($(window).height());

                $('.p2, .p1').css({
                    width: ($(window).height()/1.7),
                    left: ($(window).width()/2)-($(window).height()/1.7)/2
                });
                var curheight = ($('.p2').width()/5)*1.452;
                $('.card').css({
                     height: curheight,
                     width: ($('.p2').width()/5)

                });
         }
    }

    function fixCards() {
         setTimeout(function(){
           $( "body .card" ).each( function( index, element ){
           var currpos = $(this).offset();
               $(this).attr('data-pos-top',currpos.top);
               $(this).attr('data-pos-left',currpos.left);
            });
            setTimeout(function(){
                $( "body .card" ).each( function( index, element ){
                    var curTop = $(this).attr('data-pos-top');
                    var curLeft = $(this).attr('data-pos-left');
                    $(this).css({
                        position: 'fixed',
                        top: curTop,
                        left: curLeft
                    });
                });
                $('.deck').css({
                    top: $(window).height()/2-($('.card').height()/2),
                    left: $(window).width()-($('.card').width())-10,
                });
            }, 300);
        },300);
        bindings();
    }
    function shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        carte =  array;
    }
    function convertLetters(el) {
        if(el==1) return 'ace';
        else if(el==2) return 'two';
        else if(el==3) return 'tree';
        else if(el==4) return 'four';
        else if(el==5) return 'five';
        else if(el==6) return 'six';
        else if(el==7) return 'seven';
        else if(el==8) return 'jack';
        else if(el==9) return 'queen';
        else if(el==10) return 'king';
        return el;
    }
    function converNumbers(el) {
        if(el=='ace') return '1';
        else if(el=='two') return '2';
        else if(el=='tree') return '3';
        else if(el=='four') return '4';
        else if(el=='five') return '5';
        else if(el=='six') return '6';
        else if(el=='seven') return '7';
        else if(el=='jack') return '8';
        else if(el=='queen') return '9';
        else if(el=='king') return '10';
        return el;
    }

    function hez(evento) {
         $('.p1 .disabled').addClass('cane');
          $('.cane').removeClass('disabled');
          $('.p1 .card').removeClass('cane');

         var currpos;
         freeP1pos = evento.offset();
         evento.removeClass('card')
         var laclasse = evento.attr('class');
         evento.addClass('card').addClass('played');
         $('.'+laclasse).css({
             top: $(window).height()/2,
             left:  $(window).width()/2-($('.card').width()/2),
         });
        if(fight.length==0) {

            var  curNumb = converNumbers(laclasse.slice(0,laclasse.indexOf('_of_')));
            var curSem = converNumbers(laclasse.slice(laclasse.indexOf('_of_')+4,laclasse.length));
            for (var i = carte.length - 1; i >= 0; i--) {
                if(carte[i].seme == curSem && carte[i].numero == curNumb) {
                    fight.push(carte[i]);
                    break;
                }
            };

             setTimeout(function(){
               aiMove(curSem,curNumb);
            }, 200);
        } else {
            var  curNumb = converNumbers(laclasse.slice(0,laclasse.indexOf('_of_')));
            var curSem = converNumbers(laclasse.slice(laclasse.indexOf('_of_')+4,laclasse.length));
            for (var i = carte.length - 1; i >= 0; i--) {
                if(carte[i].seme == curSem && carte[i].numero == curNumb) {
                    fight.push(carte[i]);
                    break;
                }
            };
            calculateR('ai');
        }
    }

    function bindings() {
        $( "body .p1 .card" ).on( "click", function() {
            hez($(this));
        });
    }
    function aiMove(curSem,curNumb) {
        if(curSem!=undefined) {
            var anycard;
            var possibility = [];
            var possibility2 = [];
            for (var i = carte.length - 1; i >= 0; i--) {
                if(carte[i].app=='p2' && carte[i].seme == curSem  ) {
                    anycard = carte[i];
                    possibility.push(anycard)
                }
                if(carte[i].app=='p2') {
                    possibility2.push(carte[i])
                }
            };
            var maxP;
            if(possibility.length>0) {
                maxP = possibility[0];
                for (var i = possibility.length - 1; i >= 0; i--) {
                    if(parseInt(maxP.numero)<parseInt(possibility[i].numero))
                        if(parseInt(curNumb)>parseInt(possibility[i].numero))
                             maxP = possibility[i];
                            //console.log(possibility[i]);
                };
            } else {
                maxP = possibility2[0];
                for (var i = possibility2.length - 1; i >= 0; i--) {
                    if(parseInt(maxP.numero)<parseInt(possibility2[i].numero)) maxP = possibility2[i];
                };
            }
            fight.push(maxP)
            freeP2pos = $('.'+convertLetters(maxP.numero)+'_of_'+maxP.seme).offset();
            $('.'+convertLetters(maxP.numero)+'_of_'+maxP.seme).css({
                 top: $(window).height()/2-$('.card').width()*3/2,
                 left:  $(window).width()/2-($('.card').width()/2),
            }).addClass('played');

                calculateR();
        }
        else {
            var anycard;
            for (var i = carte.length - 1; i >= 0; i--) {
                if(carte[i].app=='p2') {
                    anycard = carte[i];
                    break;
                }
            };
            fight.push(anycard);
            freeP2pos = $('.'+convertLetters(anycard.numero)+'_of_'+anycard.seme).offset();
            $('.'+convertLetters(anycard.numero)+'_of_'+anycard.seme).css({
                 top: $(window).height()/2-$('.card').width()*3/2,
                 left:  $(window).width()/2-($('.card').width()/2),
            }).addClass('played');
            var posss = [];
            for (var i = carte.length - 1; i >= 0; i--) {
                 if(carte[i].app=='p1') {
                    posss.push(carte[i]);
                 }
            };
            var maial = [];
            for (var i = posss.length - 1; i >= 0; i--) {
                if(posss[i].seme != anycard.seme) {
                    maial.push(posss[i]);
                }
            };
            if(maial.length!=posss.length) {
                for (var i = maial.length - 1; i >= 0; i--) {
                     $('.'+convertLetters(maial[i].numero)+'_of_'+maial[i].seme).addClass('disabled');
                };
            }
        }

    }
    function calculateR(turn) {
        var leftc = 40;
        var mazzoc = 0;
        for (var i = carte.length - 1; i >= 0; i--) {
            if(carte[i].app == 'port1' || carte[i].app == 'port2') {
                leftc--;
            }
            if(carte[i].app == 'mazzo') { mazzoc++}
        };

        $('.p1').addClass('disabled');
        var who;
        if(fight[0].seme == fight[1].seme) {
            if(parseInt(fight[0].numero) > parseInt(fight[1].numero)) {
                who = fight[0].app;
            }
            else {
                who = fight[1].app;
            }
        } else {
            who = fight[0].app;
        }
        if(who=='p1') {
            setTimeout(function(){
                $('.played').css({
                    top: $(window).height()
                });
                newCards(who);
            }, 500);
            setTimeout(function(){
                $('.played').remove();
            }, 700);
            fight[0].app = 'port1';
            fight[1].app = 'port1';
            fight = [];
        }
        if(who=='p2') {
            setTimeout(function(){
                $('.played').css({
                    top: 0-$('.card').width()
                });
                newCards(who);
            }, 500);
            setTimeout(function(){
                $('.played').remove();
            }, 700);
            fight[0].app = 'port2';
            fight[1].app = 'port2';
            fight = [];
            if(leftc!=2) {
                var timer = 3000;
                if(mazzoc==0) {timer = 1000;}
                setTimeout(function(){
                    aiMove();

                }, timer);
            }
        }
        if(leftc==2) {
            setTimeout(function(){
                calcolaparz(who);
            }, 1000);
        }
        else {
            calcolaparz();
        }

    }
    function calcolaparz(last){
        var count1 = 0;var count2 = 0;
        for (var i = carte.length - 1; i >= 0; i--) {
            if(carte[i].app == 'port1') {
                if(carte[i].numero==10
                    || carte[i].numero==9
                    || carte[i].numero==7
                    || carte[i].numero==6
                    || carte[i].numero==5
                    ) {
                    count1=count1+1/3;
                } else   if(carte[i].numero==8) {
                    count1=count1+1;
                }
            }
            if(carte[i].app == 'port2') {
                if(carte[i].numero==10
                    || carte[i].numero==9
                    || carte[i].numero==7
                    || carte[i].numero==6
                    || carte[i].numero==5
                    ) {
                    count2=count2+1/3;
                } else   if(carte[i].numero==8) {
                    count2=count2+1;
                }
            }
        };
        if(last) {
            if(last=='p1') count1++;
            if(last=='p2') count2++;
        }
        points.p1 =  count1;
        points.p2 =  count2;
        if(last) {
            displayChart();
        }
        // console.log('puntip1: '+points.p1);
        // console.log('puntip2: '+points.p2);
        // console.log('tot: '+(points.p2+points.p1));

    }
    function displayChart() {
        var structure = "<div class='chart'>";

        structure += "<div><div class=''>YOU</div><div class=''>"+Math.floor(points.p1)+"</div></div>";
        structure += "<div><div class=''>AI</div><div class=''>"+Math.floor(points.p2)+"</div></div>";
        structure += "</div>";
        $('body').html(structure);

        $('body .chart').on( "click", function() {
            $('.chart').remove();
            var carte = [];
            var seme = 'hearts';
            for (var i = 40; i > 0; i--) {

                if(i%10==0 && i!=40) {change();}

                var currNum;
                if(i%10==0) currNum = 10;
                else currNum = i%10;

                carte.push({numero:currNum+'',seme:seme,app:'mazzo'});
            };
            function change() {
                if(seme=='hearts') seme = 'diamonds';
                else if(seme=='diamonds') seme = 'clubs';
                else if(seme=='clubs') seme = 'spades';
            }
            //console.log(carte);
            shuffle(carte);
            startGame()
            displayGame();
            fixCards();
        });
    }
    function newCards(who) {
        var mazzoc = 0;
        for (var i = carte.length - 1; i >= 0; i--) {
            if(carte[i].app == 'mazzo') { mazzoc++}
        };
        if(mazzoc==0) {
            $('.deck').remove();
            setTimeout(function(){
                 $('.p1').removeClass('disabled');
            }, 1000);
        }
        else {
            if(who=='p1') {
                var curClass;
                for (var i = carte.length - 1; i >= 0; i--) {
                    if(carte[i].app=='mazzo') {
                       carte[i].app = 'p1';
                       curClass = convertLetters(carte[i].numero)+'_of_'+carte[i].seme;
                       //alert(curClass)
                        $('body .p1').append("<div style='z-index:1; height:"+$('.card').height()+";width:"+$('.card').width()+";' class='card "+curClass+"'></div>");
                             $('.'+curClass).css({
                                 top: $('.deck').offset().top,
                                 left:  $('.deck').offset().left,
                                 position : 'fixed'
                             });


                        setTimeout(function(){
                            $('.'+curClass).css({
                                 top: freeP1pos.top,
                                 left:  freeP1pos.left,
                                 position : 'fixed'
                             }).on( "click", function() {
                                hez($(this));
                             });

                       }, 1000);
                       break;
                    }
                };
                setTimeout(function(){
                for (var i = carte.length - 1; i >= 0; i--) {
                    if(carte[i].app=='mazzo') {
                       carte[i].app = 'p2';
                       curClass = convertLetters(carte[i].numero)+'_of_'+carte[i].seme;
                       //alert(curClass)
                        $('body .p2').append("<div style='z-index:1; height:"+$('.card').height()+";width:"+$('.card').width()+";' class='displayed card "+curClass+"'></div>");
                             $('.'+curClass).css({
                                 top: $('.deck').offset().top,
                                 left:  $('.deck').offset().left,
                                 position : 'fixed'
                             });
                        setTimeout(function(){
                            $('.'+curClass).css({
                                 top: freeP2pos.top,
                                 left:  freeP2pos.left,
                                 position : 'fixed'
                             }).on( "click", function() {
                                hez($(this));
                             });
                             $('.p1').removeClass('disabled');
                             $('.displayed').removeClass('displayed');
                       }, 500);
                       break;
                    }
                };
                }, 1000);
            }
            else if(who=='p2') {
                var curClass;
                for (var i = carte.length - 1; i >= 0; i--) {
                    if(carte[i].app=='mazzo') {
                       carte[i].app = 'p2';
                       curClass = convertLetters(carte[i].numero)+'_of_'+carte[i].seme;
                       //alert(curClass)
                        $('body .p2').append("<div style='z-index:1; height:"+$('.card').height()+";width:"+$('.card').width()+";' class='displayed card "+curClass+"'></div>");
                             $('.'+curClass).css({
                                 top: $('.deck').offset().top,
                                 left:  $('.deck').offset().left,
                                 position : 'fixed'
                             });
                        setTimeout(function(){
                            $('.'+curClass).css({
                                 top: freeP2pos.top,
                                 left:  freeP2pos.left,
                                 position : 'fixed'
                             }).on( "click", function() {
                                hez($(this));
                             });
                             $('.displayed').removeClass('displayed');
                       }, 1000);
                       break;
                    }
                };
                setTimeout(function(){

                for (var i = carte.length - 1; i >= 0; i--) {
                    if(carte[i].app=='mazzo') {
                       carte[i].app = 'p1';
                       curClass = convertLetters(carte[i].numero)+'_of_'+carte[i].seme;
                       //alert(curClass)
                        $('body .p1').append("<div style='z-index:1; height:"+$('.card').height()+";width:"+$('.card').width()+";' class='card "+curClass+"'></div>");
                             $('.'+curClass).css({
                                 top: $('.deck').offset().top,
                                 left:  $('.deck').offset().left,
                                 position : 'fixed'
                             });


                        setTimeout(function(){
                            $('.'+curClass).css({
                                 top: freeP1pos.top,
                                 left:  freeP1pos.left,
                                 position : 'fixed'
                             }).on( "click", function() {
                                hez($(this));
                             });
                             setTimeout(function(){
                                $('.p1').removeClass('disabled');
                            }, 1000);
                       }, 1000);
                       break;
                    }
                };
                }, 1000);
            }
        }
    }
    $( window ).resize(function() {
        $('body').html('');
        $('body').addClass('hide');
        displayGame();
        fixCards();
        $('body').removeClass('hide');
        //bindings();
    });

});