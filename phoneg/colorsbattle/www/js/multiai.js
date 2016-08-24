$( document ).ready(run);

function Timer(){
    var timer;
    var timerCurrent;
    var timerFinish;
    var timerSeconds;

    var _this = this;
    
    this.callback = function(){}

    function drawTimer(percent){
        $('div.timer').html('<div class="percent"></div><div id="slice"'+(percent > 50?' class="gt50"':'')+'><div class="pie"></div>'+(percent > 50?'<div class="pie fill"></div>':'')+'</div>');

        var deg = 360/100*percent;

        $('#slice .pie').css({
            '-moz-transform':'rotate('+deg+'deg)',
            '-webkit-transform':'rotate('+deg+'deg)',
            '-o-transform':'rotate('+deg+'deg)',
            'transform':'rotate('+deg+'deg)'
        });

        // $('.percent').html(Math.round(percent)+'%');
        if(percent >= 100){
            _this.stop();
            _this.callback();
        }
    }

    this.run = function(){

        var seconds = (timerFinish-(new Date().getTime()))/1000;

        if(seconds <= 0){
            drawTimer(100);
            $('input[type=button]#watch').val('Start');
        }else{
            var percent = 100-((seconds/timerSeconds)*100);
            drawTimer(percent);
        }

    }

    this.stop = function(){
        clearInterval(timer);
        timerCurrent = 0;
        drawTimer(0);
    }
    this.start = function(){
       timer = setInterval(this.run,50);
       timerFinish = new Date().getTime()+(timerSeconds*1000);
    } 

    this.setTime = function(_time){
       timerSeconds      = _time;
    }    

    this.setCallback = function(_callback){
        _this.callback = _callback;
    }                 
    $('.timer').css('font-size','40px');
    timerCurrent = 0;
}

function run() {
    var changeviewporttimer;
    var infos = true;
    var rowTiles = 7;
    var clickType  = 'touchstart';
    var pixelDimension = 100/rowTiles+'%';
    var grid;
    var timer;
    var startx = 0;
    var starty = Math.floor(rowTiles/2);
    var endx = rowTiles-1;
    var endy = Math.floor(rowTiles/2);
    var level = 1;
    var animations = true;
    var mygroup = [];
    var mygroupAi =[];
    var mygroupAi2 =[];
    var nrPlayers = 2;
    var score = 0;
    var basestructure = "<div class='pixel'></div>";
    var structure = "";

    var maxTime = 5;

    for(var ki=0;ki<rowTiles;ki++) {
        for(var k=0;k<rowTiles;k++) {
            structure = structure + basestructure;
        }
    }
    $('#grid').append(structure);
    populateGrid();
    drawGrid();
    createGrid();
    changeGridDim();
    updatePoints();
    $('#grid').height($('#grid').width());


    setTimeout(function(){
        $('#logoScreen').fadeOut(200)
    },3000)

    


    timer = new Timer()



    function changeGridDim() {
        if ($(window).width() > $(window).height()) {
            $('body').addClass('landscape');
            $('body').removeClass('portrait');
        }
        else {
            $('body').removeClass('landscape');
            $('body').addClass('portrait');
        }
    }

    function timeout(){
        $("#powers").addClass('wait');
        setTimeout(function() {
            aiMove(mygroupAi,1);
            control = checkEndGame();
            updatePoints();
        }, 1000);        
    }

    function win(action) {
        if(action == 'win') {
            level++;
            
            if(level % 3 == 0 && maxTime > 2){
                maxTime -= 0.5;
                timer.setTime(maxTime);
            }else{
                rowTiles += 1;    
            }
        }

        pixelDimension = 100/rowTiles+'%';
        mygroup    = [];
        mygroupAi  =[];
        mygroupAi2 =[];

        basestructure = "<div class='pixel'></div>";
        structure = "";
        
        for(var ki=0;ki<rowTiles;ki++) {
            for(var k=0;k<rowTiles;k++) {
                structure = structure + basestructure;
            }
        }
        $('#grid').html('');
        $('#grid').append(structure);
        populateGrid();
        drawGrid();
        createGrid();
        changeGridDim();
        updatePoints();

        $('body').removeClass('gameover');
        changeGridDim();
        $('body').addClass('gaming');
        $('#levelcounter').html(''+(level)+'');
        mygroup.push(grid[0][rowTiles-1]);
        mygroupAi.push(grid[rowTiles-1][0]);
        $('.power').attr('class', 'power');
        $('#powers').removeClass('wait');
    }

    function start(){
        changeGridDim();
        $('body').addClass('gaming');
        $('#levelcounter').html(''+(level)+'');
        mygroup.push(grid[0][rowTiles-1]);
        mygroupAi.push(grid[rowTiles-1][0]);
        $('#homeScreen').fadeOut(200,function(){
            timer.setTime(maxTime);
            timer.setCallback(timeout);
            timer.start();               
        });   
    }

    $("#start").click(start);



    function randomColor() {
        var aicolor;
        var rndmColor =  Math.floor(Math.random()*6+1);
        if(rndmColor==1) aicolor = 'green';
        if(rndmColor==2) aicolor = 'yellow';
        if(rndmColor==3) aicolor = 'red';
        if(rndmColor==4) aicolor = 'blue';
        if(rndmColor==5) aicolor = 'violet';
        if(rndmColor==6) aicolor = 'orange';
        return aicolor;
    }

    function aiMove(group,index) {
        var maxlenght = 0;
        var chosencolor;
        var avvAi = [];

        if(index==1) avvAi = mygroupAi2;
        if(index==2) {avvAi = mygroupAi; $('#powers').removeClass('wait');}
        if(nrPlayers==2) avvAi = ['cane',0,0];
        if(nrPlayers==2) avvAi[0][0] = 'fake';
        if(nrPlayers ==2) $('#powers').removeClass('wait');
        $('.power').each(function(index, el) {
            if($(this).attr('id') != mygroup[0][0] && $(this).attr('id') != avvAi[0][0]) {
                var opt = colorRoutine2(group,$(this).attr('id'));
                if(maxlenght < opt[0]) {
                maxlenght = opt[0];
                chosencolor = opt[1];
                }
            }
        });
        if(chosencolor != undefined) {
            for (var i = 0; i < group.length; i++) {
               group[i][0] = chosencolor;
               grid[group[i][1]][group[i][2]][0] = chosencolor;
            };
        } else {
            var newcolor = randomColor();
            while(newcolor==mygroup[0][0] || newcolor==avvAi[0][0]){
                newcolor = randomColor();
            }
            for (var i = 0; i < group.length; i++) {
               group[i][0] = newcolor;
               grid[group[i][1]][group[i][2]][0] = newcolor;
            };
        }

        $('.ai'+index).attr('class', 'power');
        $('#'+group[0][0]).attr('class', 'power disabled '+'ai'+index);
        colorRoutine(group,'ai')

        setTimeout(function() {
            for (var i = 0; i < group.length; i++) {
               var pos = elementPos(group[i][1],group[i][2])
               drawGridLight(pos,group[i][1],group[i][2]);
            };
            timer.start();
        }, 300);
        updatePoints();
    }
    function checkEndGame() {
        var total = grid.length*grid.length;


        if(mygroup.length > (total-mygroup.length-mygroupAi.length)) {
            notificate('WIN <br>'+ mygroup.length+':'+mygroupAi.length, 'win')
            $('body').addClass('gameover');
            $('body').removeClass('gaming');
            timer.stop();
            return true;
        }

        return false;
    }

    function colorRoutine2(group, color) {
        var possib = [];
        var currColor = color;

        for (var i = 0; i < group.length; i++) {
            if(true) {
                if(group[i][2] < rowTiles-1 && grid[group[i][1]][group[i][2]+1][0]==currColor){
                    if(group.indexOf(grid[group[i][1]][group[i][2]+1])==-1)
                    possib.push(grid[group[i][1]][group[i][2]+1]);
                }
                if(group[i][2] > 0 && grid[group[i][1]][group[i][2]-1][0]==currColor){
                    if(group.indexOf(grid[group[i][1]][group[i][2]-1])==-1)
                    possib.push(grid[group[i][1]][group[i][2]-1]);
                }
                if(group[i][1] > 0 && grid[group[i][1]-1][group[i][2]][0]==currColor){
                    if(group.indexOf(grid[group[i][1]-1][group[i][2]])==-1)
                    possib.push(grid[group[i][1]-1][group[i][2]]);
                }
                if(group[i][1] < rowTiles-1 && grid[group[i][1]+1][group[i][2]][0]==currColor){
                    if(group.indexOf(grid[group[i][1]+1][group[i][2]])==-1)
                    possib.push(grid[group[i][1]+1][group[i][2]]);
                }
            }
        }
        return [possib.length, color];
    }


    function perimeter(group) {
        var currColor = group[0][0];
        var borders = [];
        for (var i = 0; i < group.length; i++) {
            if(group[i][2] < rowTiles-1 && grid[group[i][1]][group[i][2]+1][0]!=currColor){
                if(true) {
                    borders.push(grid[group[i][1]][group[i][2]]);
                }
            }
            else if(group[i][2] > 0 && grid[group[i][1]][group[i][2]-1][0]!=currColor){
                if(true) {
                    borders.push(grid[group[i][1]][group[i][2]]);
                    //if(usertype == 'user')score++;
                }
            }
            else if(group[i][1] > 0 && grid[group[i][1]-1][group[i][2]][0]!=currColor){
                if(true) {
                    borders.push(grid[group[i][1]][group[i][2]]);
                    //if(usertype == 'user')score++;
                }
            }
            else if(group[i][1] < rowTiles-1 && grid[group[i][1]+1][group[i][2]][0]!=currColor){
                if(true) {
                    borders.push(grid[group[i][1]][group[i][2]]);
                    //if(usertype == 'user')score++;
                }
            }
        }
        for (var i = 0; i < borders.length; i++) {
           var pos = elementPos(borders[i][1],borders[i][2])
           flash(pos,borders[i][1],borders[i][2]);
        };
        return borders;
    }


    function colorRoutine(group,usertype) {
        var currColor = group[0][0];
        var smallerone = perimeter(group);
        for (var i = 0; i < group.length; i++) {
            if(true) {
                if(group[i][2] < rowTiles-1 && grid[group[i][1]][group[i][2]+1][0]==currColor){
                    if(group.indexOf(grid[group[i][1]][group[i][2]+1])==-1) {
                        group.push(grid[group[i][1]][group[i][2]+1]);
                        //if(usertype == 'user')score++;
                    }
                }
                if(group[i][2] > 0 && grid[group[i][1]][group[i][2]-1][0]==currColor){
                    if(group.indexOf(grid[group[i][1]][group[i][2]-1])==-1) {
                        group.push(grid[group[i][1]][group[i][2]-1]);
                        //if(usertype == 'user')score++;
                    }
                }
                if(group[i][1] > 0 && grid[group[i][1]-1][group[i][2]][0]==currColor){
                    if(group.indexOf(grid[group[i][1]-1][group[i][2]])==-1) {
                        group.push(grid[group[i][1]-1][group[i][2]]);
                        //if(usertype == 'user')score++;
                    }
                }
                if(group[i][1] < rowTiles-1 && grid[group[i][1]+1][group[i][2]][0]==currColor){
                    if(group.indexOf(grid[group[i][1]+1][group[i][2]])==-1) {
                        group.push(grid[group[i][1]+1][group[i][2]]);
                        //if(usertype == 'user')score++;
                    }
                }
            }
        }
    }
    $( ".pixel" ).on( clickType, function() {
        var position = $(this).prevAll('div').length;
        var positions = gridPos(position);
        
        if(positions[0]==0 && positions[1]==rowTiles-1)
            notificateClick('You start from here!');
        else if(positions[0]==rowTiles-1 && positions[1]==0)
            notificateClick('Ai starts from here!');
        else {
            infos=!infos;
            if(infos)
                notificateClick('Click the circles to change color!')
                else
            notificateClick('Collect more tiles than Ai!')
        }
    });

    $( ".clickcounter" ).on( clickType, function() {
        $(this).removeClass('enabled');
        var action = $(this).attr('id');
        $('.clickcounter').fadeOut()
        if(action=='reload') {
            window.location.reload();
        }
        if(action=='win') {
            score = score+(Math.ceil(level*2));
            win('win');
        }
        if(action=='draw') win('same');
        $('.clickcounter').attr('id', '');
    });



    $( ".power" ).on( clickType, function() {
        timer.stop();
        $("#powers").addClass('wait');
        $(".power").removeClass('mine');
        $(this).attr('class', 'power mine');
        for (var i = 0; i < mygroup.length; i++) {
           mygroup[i][0] = $(this).attr('id');
           grid[mygroup[i][1]][mygroup[i][2]][0] = $(this).attr('id');

        };
        colorRoutine(mygroup,'user');

        setTimeout(function() {
            for (var i = 0; i < mygroup.length; i++) {
               var pos = elementPos(mygroup[i][1],mygroup[i][2])
               drawGridLight(pos,mygroup[i][1],mygroup[i][2]);
            };
        }, 300);

        updatePoints();
        var control = checkEndGame();
        
        setTimeout(function() {
            if(!control) {
                aiMove(mygroupAi,1);
                control = checkEndGame();
                updatePoints();               
            }
        }, 1000);
        
    });


    function notificate(text, action) {
        $('.clickcounter').html(text);
        if(nrPlayers==2) $('#aiscore').addClass('hide'); else $('#aiscore').removeClass('hide');
        $('.clickcounter').show();
        $('.clickcounter').addClass('enabled');
        $('.clickcounter').attr('id', action);
    }
    function notificateClick(text) {
        $('body').addClass('pauseGrid');
        $('.clickcounter').html(text);
        $('.clickcounter').show();
        setTimeout(function() {
             $('.clickcounter').fadeOut();
        }, 900);
        setTimeout(function() {
             $('body').removeClass('pauseGrid');
        }, 1300);
    }


    function updatePoints() {
        $('#youCounter').html(mygroup.length);
        //$('#score').html(score);
         if(mygroupAi.length > 1 )$('#aiCounter').html(mygroupAi.length);
         else $('#aiCounter').html('0');

    }
    function drawGrid() {
        for(var ki=0;ki<rowTiles;ki++) {
            for(var k=0;k<rowTiles;k++) {
                var optimize = $( ".pixel:eq("+elementPos(ki,k)+")" );
                optimize.attr('class', 'pixel '+grid[ki][k][0]);

            }
        }
        $( ".pixel:eq(0)" ).attr('class', 'pixel you');
        $( ".pixel:eq("+((rowTiles*rowTiles)-1)+")" ).attr('class', 'pixel ai');
    }
    function drawGridLight(position,a,b) {
        var optimize = $( ".pixel:eq("+position+")" );
        optimize.attr('class', 'pixel '+grid[a][b][0]);

    }
    function flash(position,a,b) {
        var optimize = $( ".pixel:eq("+position+")" );
        optimize.attr('class', 'pixel black');

    }
    function createGrid() {
        $( ".pixel" ).each(function( index ) {
              $(this).css({
                height: pixelDimension,
                width: pixelDimension
              });
        });
    }
    function gridPos(elemposition) {
        return([elemposition%rowTiles,((rowTiles-1)-(parseInt(elemposition/rowTiles)))]);
    }
    function elementPos(x,y) {
        var pass = rowTiles*(rowTiles-1-y)+x;
        return pass;
    }
    function populateGrid() {
            if(rowTiles >= 20) $('#grid').addClass('small')
            grid = new Array(rowTiles);
            for(var ty=0;ty<rowTiles;ty++) {
                grid[ty] = new Array(rowTiles);
            }
            for(var ki=0;ki<rowTiles;ki++) {
                for(var k=0;k<rowTiles;k++) {
                    var rndmColor =  Math.floor(Math.random()*6+1);
                    if(rndmColor==1) grid[ki][k] = ['green',ki,k];
                    if(rndmColor==2) grid[ki][k] = ['yellow',ki,k];
                    if(rndmColor==3) grid[ki][k] = ['red',ki,k];
                    if(rndmColor==4) grid[ki][k] = ['blue',ki,k];
                    if(rndmColor==5) grid[ki][k] = ['orange',ki,k];
                    if(rndmColor==6) grid[ki][k] = ['violet',ki,k];

                }
            }
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
}
