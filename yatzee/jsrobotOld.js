
$(function() {


    function insultaManu() {
        setInterval(function(){
            $('textarea').each(function(index, el) {
                var oldVal = $(this).val()
                if(oldVal=='Manu') {
                    $(this).val('Schiappa');
                    setTimeout(function(){
                        $(el).val(oldVal);
                    },100);
                }
            });
        }, 180000);
    }
    $('#grid').hide();
    var tunro = 1;
    var veroturno = 1;
    var tunrni = [];
    var counter= 0;
    var mytimeout;
    var clicked;
    $('#grid').on('focus', "input", function(event) {
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
                     $(this).hide()
                    }, 5000);
                }

    });
    function hez() {
       $("tr[id*='3ugu']").find('td').eq(0).attr('data-selected','true');
        $("tr[id*='4ugu']").find('td').eq(0).attr('data-selected','true');
        $("tr[id*='min']").find('td').eq(0).attr('data-selected','true');
        $("tr[id*='max']").find('td').eq(0).attr('data-selected','true');
        $("tr[id*='chance']").find('td').eq(0).attr('data-selected','true');
        $("tr[id*='yatzee']").find('td').eq(0).attr('data-selected','true');
        $("tr[id*='full']").find('td').eq(0).attr('data-selected','true');
        $("tr[id*='dd']").each(function(index, el) {
            $(this).find('td').eq(0).attr('data-selected','true');
        });

    }
    function checkWinner(){
        var minimo = 0;
        var vincitore;
        $('#TOTT').find("td[id*='tot']").each(function(index, el) {
            if($(el).html()!='' && minimo <= parseInt($(el).html())) {
                minimo = parseInt($(el).html());
                vincitore = $(el).attr('id');
            }
        });
        var play = vincitore.substring(vincitore.indexOf("p") + 1);
        alert('vince '+$("textarea").eq(play-1).val());

    }
    $("#grid").on("keyup", "input", function(){
            var total = 0;
            var totInf = 0;
            var giocatore = $(this).parent('td').attr('class');
            if($(this).val()!='') {
            if(tunro%$('select').val()==0) veroturno++;
            if(tunrni.length < parseInt($('select').val())) {
                    if(tunrni.indexOf(giocatore)==-1)   {tunrni.push(giocatore); tunro++; $('.turn').html(veroturno);}
                    if(tunrni.length==parseInt($('select').val())) {
                        hez();
                        $('.'+tunrni[0]+' input').each(function(index, el) {
                        if($(this).val()=='') {
                            $(this).attr('data-selected', 'true');
                            $(this).closest('tr').find('td').eq(0).removeAttr('data-selected');
                            //$(this).closest('tr').find('td').eq(0).attr('data-selected', 'true');
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

                    hez();




                    $('.'+tunrni[counter]+' input').each(function(index, el) {
                        if($(this).val()=='') {
                        $(this).attr('data-selected', 'true');
                        $(this).closest('tr').find('td').eq(0).removeAttr('data-selected');
                        }
                    });

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
            if(totInf>=63 && $('#bonus .'+giocatore).html() != 35) {
                $('#bonus .'+giocatore).html(35)
                $('#totInf'+giocatore).html(totInf);
            } else if(totInf<63 && $('#bonus .'+giocatore).html() != 35) {
                var cane = ($('#dd1 .'+giocatore+' input').val() != '' && $('#dd2 .'+giocatore+' input').val() != ''  && $('#dd3 .'+giocatore+' input').val() != ''  && $('#dd4 .'+giocatore+' input').val() != ''  && $('#dd5 .'+giocatore+' input').val() != ''  && $('#dd6 .'+giocatore+' input').val() != '')
                if(cane) $('#bonus .'+giocatore).html(0);
                var disponibili = 0;
                if($('#dd1 .'+giocatore+' input').val() == '') { disponibili = disponibili+5; }
                if($('#dd2 .'+giocatore+' input').val() == '') { disponibili = disponibili+10;; }
                if($('#dd3 .'+giocatore+' input').val() == '') { disponibili = disponibili+15; }
                if($('#dd4 .'+giocatore+' input').val() == '') { disponibili = disponibili+20; }
                if($('#dd5 .'+giocatore+' input').val() == '') { disponibili = disponibili+25; }
                if($('#dd6 .'+giocatore+' input').val() == '') { disponibili = disponibili+30; }
                if(totInf+disponibili<63) $('#bonus .'+giocatore).html(0);
            }
            if($('#bonus .'+giocatore).html()!='') total = total + parseInt($('#bonus .'+giocatore).html());
            $('#tot'+giocatore).html(total)
            $('#totInf'+giocatore).html(totInf);

            //console.log($(this).attr('curr-value'))
            if(veroturno==14) {
                $('.turn').html('13');
                checkWinner();
            }
    });





        $('select').on('change', function(event) {
                $('#grid').show();
                $('.choose').hide();
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'><input type='button' readonly ></input></td>";
                };
                $('#dd1').html("<td>Dadi con 1</td>"+baseStructure);
                $('#dd2').html("<td>Dadi con 2</td>"+baseStructure);
                $('#dd3').html("<td>Dadi con 3</td>"+baseStructure);
                $('#dd4').html("<td>Dadi con 4</td>"+baseStructure);
                $('#dd5').html("<td>Dadi con 5</td>"+baseStructure);
                $('#dd6').html("<td>Dadi con 6</td>"+baseStructure);
                $('#3ugu').html("<td>3 Dadi uguali</td>"+baseStructure);
                $('#4ugu').html("<td>4 Dadi uguali</td>"+baseStructure);
                $('#full').html("<td>Full (25)</td>"+baseStructure);
                $('#min').html("<td>Scala minima (30)</td>"+baseStructure);
                $('#max').html("<td>Scala massima (40)</td>"+baseStructure);
                $('#yatzee').html("<td>Yatzee (50)</td>"+baseStructure);
                $('#chance').html("<td>Chance</td>"+baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td id='totInfp"+i+"'></td>";
                };
                $('#SUPT').html("<td>TOTALE SUP.</td>"+baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td class='p"+i+"'></td>";
                };
                $('#bonus').html("<td>Bonus > 63 (35)</td>"+baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td id='totp"+i+"'></td>";
                };
                $('#TOTT').html("<td>TOTALE</td>"+baseStructure);
                var baseStructure = "";
                for (var i = 1; i <= $(this).val(); i++) {
                    baseStructure += "<td><textarea>Player "+i+"</textarea></td>";
                };
                if($(this).val()==3) {
                    baseStructure = "<td><textarea>Besaz</textarea></td><td><textarea>Manu</textarea></td><td><textarea>Dadz</textarea></td>";
                    insultaManu();
                }
                $('#turn').html("<td>Turno:<span class='turn'>1</span></td>"+baseStructure);
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
       $('#'+field+' .'+player+' input').val('');
       $('.popup').hide();
        var e = $.Event( "keyup", { which: 0 } );
        $('#'+field+' .'+player+' input').trigger(e);
        $('#'+field+' .'+player+' input').removeClass('nasc');

    }


