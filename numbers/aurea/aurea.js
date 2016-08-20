
$(function() {

    $( "#segmento" ).on( "click", function(e) {
        var x = e.pageX - e.target.offsetLeft;
        console.log(x);
        var lunghezza = $("#segmento").width();
        $('.target').remove();
        $( "#segmento" ).append("<div class='target'></div>");
        var currTarget = x-($('.target').width()/2);
        $('.target').css({
            'left': currTarget
        });
        var aurea = Math.round(lunghezza/1.618);
        $('.aurea').remove();
        $( "#segmento" ).append("<div class='aurea'></div>")
        var currAurea =  aurea-($('.aurea').width()/2);
        $('.aurea').css({
            'left': currAurea
        });
        $('#aurea').val('Errore: '+Math.abs(currTarget-currAurea));
        setTimeout(function(){
            $('#segmento').html(" ");
        }, 2000);
    });
    $( "#start" ).on( "click", function() {
        location.reload();
    });
    $( "#draw" ).on( "click", function() {
        $('#rettangolo').html('');
        $('#rettangolo').removeAttr('style')
        var mainL = $('#rettangolo').width();
        var aurea = Math.round(mainL/1.618);
        var passo = 0;
        $('#rettangolo').css({
            height:  aurea,
        });
        var mainInerval = setInterval(function(){ step() }, 100);
        var secondInterval;
        var currentContainer = $('#rettangolo');
        function step() {
            passo++;
            console.log('passo: '+passo);
            var currentHeight = currentContainer.height();
            var currentWidth = currentContainer.width();
            var currentAura;
            if(currentHeight==currentWidth || passo == 100) {
                console.log('esco');
                //clearInterval(mainInerval);
                console.log(currentContainer.offset().left)
                console.log($( '#rettangolo' ).width()/2)
                console.log(currentContainer.offset().left-$( '#rettangolo' ).width()/2);
                $('#rettangolo').css({
                    //right: (currentContainer.offset().left-$( '#rettangolo' ).width()/2)
                });
                currentContainer.css({
                    border: '1px solid red',
                    position: 'fixed',
                    'background-color': 'white',
                    top:0,
                    left:0
                });

            }
            else {
                if(currentWidth>currentHeight) {
                    currentAura = Math.round(currentWidth/1.618);
                    var currMinorPos;
                    var currNextPos;
                    var bradius;
                        if(passo%4==3) {
                            currNextPos = 'left';
                            currMinorPos = 'right';
                            bradius = "border-radius: 0px "+currentAura+"px 0px 0px;border-bottom: none; border-left: none;";
                        } else {
                            currMinorPos = 'left';
                            currNextPos = 'right';
                            bradius = "border-radius: 0px 0px 0px "+currentAura+"px;border-right: none; border-top: none;";
                        }
                    currentContainer.append("<div class='minor' style='"+currMinorPos+":0; "+bradius+" height:"+currentAura+"px;width:"+currentAura+"px;'></div>");
                    currentContainer.append("<div class='next' style='"+currNextPos+":0; height:"+(currentAura)+"px;width:"+(currentWidth-currentAura)+"px;'></div>");
                    currentContainer = $('.next').last();
                }
                if(currentWidth<currentHeight) {
                    currentAura = Math.round(currentHeight/1.618);
                    var currMinorPos;
                    var currNextPos;
                    var bradius;
                        if(passo%4==0) {
                            currNextPos = 'bottom';
                            currMinorPos = 'top';
                            bradius = "border-radius:"+currentAura+"px 0px 0px 0px;border-bottom: none; border-right: none;";
                        } else {
                            currMinorPos = 'bottom';
                            currNextPos = 'top';
                            bradius = "border-radius: 0px 0px "+currentAura+"px 0px;border-top: none; border-left: none;";
                        }
                    currentContainer.append("<div class='minor' style='"+currMinorPos+":0; "+bradius+" height:"+currentAura+"px;width:"+currentAura+"px;'></div>");
                    currentContainer.append("<div class='next' style='"+currNextPos+":0; height:"+(currentHeight-currentAura)+"px;width:"+(currentAura)+"px;'></div>");
                    currentContainer = $('.next').last();
                }
            }
        }
    });
});



