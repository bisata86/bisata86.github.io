
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


$(function() {
    $('body').addClass('noFb');
    var changeviewporttimer;
    var infos = true;
    checkorientaitonchange();
    var rowTiles = 5;
    var clickType;
    if(detectmob()) {
        $('body').addClass('mobile');
        clickType = 'touchstart';
    }  else {
        $('body').addClass('desktop');
        clickType = 'click';
    }
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
    var mygroup2 =[];
    var turnPlayer1 = true;

    var score = 0;
    var basestructure = "<div class='pixel'></div>";
    var structure = "";
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

    function win(action) {
        if(action=='win') {
            rowTiles = rowTiles+3;
        }
        pixelDimension = 100/rowTiles+'%';
        mygroup = [];
        mygroup2 =[];
        mygroup22 =[];
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
        mygroup2.push(grid[rowTiles-1][0]);
        $('.power').attr('class', 'power');


    }

    $( "#start" ).click(function() {
        $('body').removeClass('infodisplayed');
        changeGridDim();
        $('body').addClass('gaming');
        $('#levelcounter').html(''+(level)+'');
        mygroup.push(grid[0][rowTiles-1]);
        mygroup2.push(grid[rowTiles-1][0]);

    });


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

    function checkEndGame() {


        var total = grid.length*grid.length;


        if(mygroup.length > (total-mygroup.length)) {
            console.log('hai vinto');
            notificate('P1 WIN <br>'+ mygroup.length+':'+mygroup2.length, 'win')
            $('body').addClass('gameover');
            $('body').removeClass('gaming');
        }
        if(mygroup2.length > (total-mygroup2.length)) {
            console.log('Ai ha vinto');
            notificate('P2 WIN <br>'+ mygroup.length+':'+mygroup2.length, 'win');
            $('body').addClass('gameover');
            $('body').removeClass('gaming');
        }


    }
    function colorRoutine(group) {
        var currColor = group[0][0];
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
        for (var i = 0; i < group.length; i++) {
           var pos = elementPos(group[i][1],group[i][2])
           flash(pos,group[i][1],group[i][2]);

        };
        setTimeout(function() {
            for (var i = 0; i < group.length; i++) {
               var pos = elementPos(group[i][1],group[i][2])
               drawGridLight(pos,group[i][1],group[i][2]);
            };
        }, 300);
        if(turnPlayer1) {
        $('#player1CounterContainer').removeClass('alert');
        $('#player2CounterContainer').addClass('alert');
       } else {
        $('#player2CounterContainer').removeClass('alert');
        $('#player1CounterContainer').addClass('alert');
       }
       turnPlayer1 = !turnPlayer1;
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
        $(".power").removeClass('disabled');
        $(this).attr('class', 'power disabled');
                var colorT = $(this).attr('id');
        if(turnPlayer1) {
        preColorRoutine(mygroup,colorT);
       } else {

        preColorRoutine(mygroup2,colorT);
       }

        updatePoints();
        checkEndGame();
    });
    function preColorRoutine(group, color) {
        for (var i = 0; i < group.length; i++) {
           grid[group[i][1]][group[i][2]][0] = color;
        };
        colorRoutine(group);
    }
    function checkorientaitonchange(){
        changeviewporttimer = setInterval(function() {
            changeGridDim();

        }, 3000);
    }

    function notificate(text, action) {
        $('.clickcounter').html(text);
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
        $('#player1Counter').html(mygroup.length);
        $('#player2Counter').html(mygroup2.length);

    }
    function drawGrid() {
        for(var ki=0;ki<rowTiles;ki++) {
            for(var k=0;k<rowTiles;k++) {
                var optimize = $( ".pixel:eq("+elementPos(ki,k)+")" );
                optimize.attr('class', 'pixel '+grid[ki][k][0]);

            }
        }
        $( ".pixel:eq(0)" ).attr('class', 'pixel player1');
        $( ".pixel:eq("+((rowTiles*rowTiles)-1)+")" ).attr('class', 'pixel player2');
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
});
