
$(function() {


    function insultaManu() {
        setInterval(function(){
            $('textarea').each(function(index, el) {
                var oldVal = $(this).val()
                if(oldVal=='Manu') {
                    $(this).val('Schiappa');
                    setTimeout(function(){
                        $(el).val(oldVal);
                    },1000);
                }
            });
        }, 120000);
    }
    $('#grid').hide();
    var tunro = 1;
    var veroturno = 1;
    var tunrni = [];
    var counter= 0;
    var mytimeout;
    var clicked;
    $('#grid').on('focus', "input", function(event) {
            var that = $(this);
            event.preventDefault();
            clicked = true;
            clearTimeout(mytimeout);
            $(this).attr('curr-value', $(this).val());

            var currElement = $(this).closest('tr');
            var currField  = currElement.attr('id');
            var player = $(this).closest('td').attr('class');
            var position = $(this).position();
            var erase = false;
            if($(this).val()!='') erase = true;
            scielta(currField,player,position,erase);
                if(clicked) {
                    clicked = false;
                    mytimeout = setTimeout(function(){
                       $('.popup').hide();
                        //$(this).hide()
                        //console.log(that.prev('div').show())
                        if(that.val()=='') {
                            that.prev('div').show();
                            that.hide();
                            //alert('cane')
                        }
                    }, 5000);
                }

    });
    $("#grid").on("click", "div", function(){
        $(this).hide();
        $(this).next('input').show();
        $(this).next('input').trigger('focus');
    });
    $("#grid").on("keyup", "input", function(){
            var total = 0;
            var totInf = 0;
            var giocatore = $(this).parent('td').attr('class');
            if($(this).val()!='') {
            if(tunro%$('select').val()==0) veroturno++;
            if(tunrni.length < parseInt($('select').val())) {
                    if(tunrni.indexOf(giocatore)==-1)   {tunrni.push(giocatore); tunro++; $('.turn').html(veroturno);}
                    if(tunrni.length==parseInt($('select').val())) {
                        $('.'+tunrni[0]+' input').each(function(index, el) {
                        if($(this).val()=='') {
                            $(this).attr('data-selected', 'true');
                            $('textarea.'+tunrni[0]).addClass('myTurn');
                        }
                    });
                        counter++;
                    }
             } else {
                var oldcounter = counter-1;
                if(oldcounter==-1) oldcounter = parseInt($('select').val())-1;
                var oldplayer = tunrni[oldcounter];
                var oldData = $(this).attr('curr-value')
                if(oldplayer==giocatore && (oldData=='')) {
                    $('td input').removeAttr('data-selected')
                    $('.'+tunrni[counter]+' input').each(function(index, el) {
                        if($(this).val()=='') {
                            $(this).attr('data-selected', 'true');
                        //$(this).closest('tr').find('td').eq(0).removeAttr('data-selected');
                        }
                    });
                    $('textarea').removeClass('myTurn');
                    $('textarea.'+tunrni[counter]).addClass('myTurn');

                    counter++;
                    if(counter==parseInt($('select').val())) counter=0;
                    tunro++;
                    $('.turn').html(veroturno);

                }
                else {

                }

             }


         }

            $('.'+giocatore+' input').each(function(index, el) {
                currValue =  $(this).val();
                if(currValue!=undefined && currValue!='') {
                    total = total + parseInt(currValue);
                    var cane = $(this).parent('td').parent('tr').attr('id');
                    if(cane == undefined) {}
                    else if(cane.indexOf('dd')!=-1) {
                         totInf = totInf + parseInt(currValue)
                    }

                }

            });
            if(totInf>=63) {
                $('#bonus .'+giocatore).html(35).removeClass('counting');
                $('#totInf'+giocatore).html(totInf);
            } else if(totInf<63) {
                var cane = ($('#dd1 .'+giocatore+' input').val() != '' && $('#dd2 .'+giocatore+' input').val() != ''  && $('#dd3 .'+giocatore+' input').val() != ''  && $('#dd4 .'+giocatore+' input').val() != ''  && $('#dd5 .'+giocatore+' input').val() != ''  && $('#dd6 .'+giocatore+' input').val() != '')
                if(cane) $('#bonus .'+giocatore).html(0);
                var disponibili = 0;
                if($('#dd1 .'+giocatore+' input').val() == '') { disponibili = disponibili+5; }
                if($('#dd2 .'+giocatore+' input').val() == '') { disponibili = disponibili+10;; }
                if($('#dd3 .'+giocatore+' input').val() == '') { disponibili = disponibili+15; }
                if($('#dd4 .'+giocatore+' input').val() == '') { disponibili = disponibili+20; }
                if($('#dd5 .'+giocatore+' input').val() == '') { disponibili = disponibili+25; }
                if($('#dd6 .'+giocatore+' input').val() == '') { disponibili = disponibili+30; }
                if(totInf+disponibili<63) $('#bonus .'+giocatore).html(0).removeClass('counting');
            }
            if($('#bonus .'+giocatore).html()=='35') total = total + 35;
            if(totInf<63 && totInf+disponibili>=63) $('#bonus .'+giocatore).html(-(totInf-63)+' al bonus').addClass('counting');
            $('#tot'+giocatore).html(total)
            $('#totInf'+giocatore).html(totInf);

             var mmmaxx = setMaximal(giocatore);

            var startChecking = true;
            $('#TOTT td').each(function(index, el) {
                //console.log($(this).attr('maximal'))
                if($(this).attr('maximal') == undefined)  startChecking = false;
            });
            if(startChecking) {
                var hovinto = true;
                $('#TOTT td').each(function(index, el) {
                    if(($(this).attr('id').indexOf(giocatore)==-1)) {
                        if(total <= $(this).attr('maximal')) {
                            hovinto = false;

                        }
                    }
                });
                if(hovinto) {
                    alert('vince '+$('textarea.'+giocatore).html());
                }
                $('#TOTT td').each(function(index, el) {
                    if(($(this).attr('id').indexOf(giocatore)==-1)) {
                        if(parseInt(mmmaxx) < parseInt($(this).html())) {
                            var old  = $('textarea.'+giocatore).html()
                            $('textarea.'+giocatore).html(old+' Schiappa')
                        }
                    }
                });
            }
            //console.log(veroturno);
    });

    function setMaximal(giocatore) {
                var player = giocatore;
                //console.log(player);
                //console.log('totale: '+parseInt($('#tot'+player).html()));
                var maximal = 0;
                var current = $('#dd1 .'+player+' input').val();
                current == '' ? maximal += 5 : maximal += parseInt(current);
                var current = $('#dd2 .'+player+' input').val();
                current == '' ? maximal += 10 : maximal += parseInt(current);
                var current = $('#dd3 .'+player+' input').val();
                current == '' ? maximal += 15 : maximal += parseInt(current);
                var current = $('#dd4 .'+player+' input').val();
                current == '' ? maximal += 20 : maximal += parseInt(current);
                var current = $('#dd5 .'+player+' input').val();
                current == '' ? maximal += 25 : maximal += parseInt(current);
                var current = $('#dd6 .'+player+' input').val();
                current == '' ? maximal += 30 : maximal += parseInt(current);
                var current = $('#bonus .'+player);
                current.hasClass('counting') ? maximal += 35 : maximal += parseInt(current.html());
                var current = $('#3ugu .'+player+' input').val();
                current == '' ? maximal += 30 : maximal += parseInt(current);
                var current = $('#4ugu .'+player+' input').val();
                current == '' ? maximal += 30 : maximal += parseInt(current);
                var current = $('#full .'+player+' input').val();
                current == '' ? maximal += 25 : maximal += parseInt(current);
                var current = $('#min .'+player+' input').val();
                current == '' ? maximal += 40 : maximal += parseInt(current);
                var current = $('#max .'+player+' input').val();
                current == '' ? maximal += 30 : maximal += parseInt(current);
                var current = $('#yatzee .'+player+' input').val();
                current == '' ? maximal += 50 : maximal += parseInt(current);
                var current = $('#chance .'+player+' input').val();
                current == '' ? maximal += 30 : maximal += parseInt(current);
                // console.log('maximal: '+maximal);
                // console.log(' ');
                // console.log(' ');
                $('#tot'+player).attr('maximal', maximal);
                return maximal;
    }



        $('select').on('change', function(event) {
                $('#grid').show();
                $('.choose').hide();
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Dadi con 1</div><input type='button' readonly ></input></td>";
                };
                $('#dd1').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Dadi con 2</div><input type='button' readonly ></input></td>";
                };
                $('#dd2').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Dadi con 3</div><input type='button' readonly ></input></td>";
                };
                $('#dd3').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Dadi con 4</div><input type='button' readonly ></input></td>";
                };
                $('#dd4').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Dadi con 5</div><input type='button' readonly ></input></td>";
                };
                $('#dd5').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Dadi con 6</div><input type='button' readonly ></input></td>";
                };
                $('#dd6').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>3 Dadi uguali</div><input type='button' readonly ></input></td>";
                };
                $('#3ugu').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>4 Dadi uguali</div><input type='button' readonly ></input></td>";
                };
                $('#4ugu').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Full</div><input type='button' readonly ></input></td>";
                };
                $('#full').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Scala Min</div><input type='button' readonly ></input></td>";
                };
                $('#min').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Scala Max</div><input type='button' readonly ></input></td>";
                };
                $('#max').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Yahtzee</div><input type='button' readonly ></input></td>";
                };
                $('#yatzee').html(baseStructure);
                baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><div>Chance</div><input type='button' readonly ></input></td>";
                };
                $('#chance').html(baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td id='totInfp"+i+"'>Tot. Sup</td>";
                };
                // $('#SUPT').html("<td>TOTALE SUP.</td>"+baseStructure);
                  $('#SUPT').html(baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'>Bonus</td>";
                };
                // $('#bonus').html("<td>Bonus > 63 (35)</td>"+baseStructure);
                $('#bonus').html(baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td id='totp"+i+"'>Tot. Inf</td>";
                };
                // $('#TOTT').html("<td>TOTALE</td>"+baseStructure);
                $('#TOTT').html(baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td><textarea class='p"+i+"'>Player "+i+"</textarea></td>";
                };
                // $('#turn').html("<td>Turno:<span class='turn'>1</span></td>"+baseStructure);
                $('#turn').html(baseStructure);
                if($(this).val()==3) {
                    $('textarea.p1').html('Besaz');
                    $('textarea.p2').html('Manu');
                    $('textarea.p3').html('Dadz');
                    insultaManu();
                }
                $('#grid input').hide();
        });
        function scielta(field,player,position,erase) {
            var basestructure = "<div id='"+player+"' class='"+field+"'><div class='arrow'/>";
            if(erase) basestructure += "<input type='button' value='X' onclick='repristinate(this)'></input>";
            if(field.indexOf('dd')!=-1) {
                var currentField = field.indexOf('dd')+2;
                var currentPosition = parseInt(field[currentField]);
                for (var i = 0; i < (currentPosition*6); i=i+currentPosition) {
                    basestructure += "<input type='button'  value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            if(field.indexOf('full')!=-1) {
                for (var i = 0; i < 26; i=i+25) {
                    basestructure += "<input type='button' value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            if(field.indexOf('yatzee')!=-1) {
                for (var i = 0; i < 51; i=i+50) {
                    basestructure += "<input type='button' value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            if(field.indexOf('max')!=-1) {
                for (var i = 0; i < 41; i=i+40) {
                    basestructure += "<input type='button' value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            if(field.indexOf('min')!=-1) {
                for (var i = 0; i < 31; i=i+30) {
                    basestructure += "<input type='button' value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            if(field.indexOf('3ugu')!=-1) {
                basestructure += "<input type='button' value='0' onclick='setValue(this)'></input>";
                for (var i = 3; i < 31; i=i+1) {
                    basestructure += "<input type='button' value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            if(field.indexOf('4ugu')!=-1) {
                basestructure += "<input type='button' value='0' onclick='setValue(this)'></input>";
                for (var i = 4; i < 31; i=i+1) {
                    basestructure += "<input type='button' value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            if(field.indexOf('chance')!=-1) {
                basestructure += "<input type='button' value='0' onclick='setValue(this)'></input>";
                for (var i = 5; i < 31; i=i+1) {
                    basestructure += "<input type='button' value='"+i+"' onclick='setValue(this)'></input>";
                };
            }
            basestructure += "</div>";
            $('.popup').html(basestructure);
            //console.log($('#grid .p1').height())
            $('.popup').css({
                top: position.top+$('#grid .p1 input').height()*2,
                left: position.left
            });
            $('.arrow').removeClass('reverse');
            if(field.indexOf('chance')!=-1) {
               $('.popup').css({
                top: position.top-$('.popup').height()-20,
               });
               $('.arrow').addClass('reverse');
            }
            $('.popup').show();
        }
    });
    function setValue(element) {
        var player = $(element).closest('div').attr('id');
        var field = $(element).closest('div').attr('class');
       $('#'+field+' .'+player+' input').val($(element).val());
       $('.popup').hide();
        var e = $.Event( "keyup", { which: 0 } );
        $('#'+field+' .'+player+' input').trigger(e);
        $('#'+field+' .'+player+' input').addClass('nasc');
    }
    function repristinate(element) {
        var player = $(element).closest('div').attr('id');
        var field = $(element).closest('div').attr('class');
        $('#'+field+' .'+player+' div').show();
        $('#'+field+' .'+player+' input').val('').hide();
        $('.popup').hide();
        var e = $.Event( "keyup", { which: 0 } );
        $('#'+field+' .'+player+' input').trigger(e);
        $('#'+field+' .'+player+' input').removeClass('nasc');

    }


