
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
    var intervallo = 500;
    var rowTiles = 5;
    var rows = 12;
    var columns = 6;
    var clickType;
    if(detectmob()) {
        $('body').addClass('mobile');
        clickType = 'tap';
    }  else {
        $('body').addClass('desktop');
        clickType = 'click';
    }
    var pixelDimension = 100/columns;
    var grid;
    var gameInterval;
    var activeTiles = []
    var level = 1;
    var animations = true;
    var mygroup = [];
    var mygroup2 =[];
    var turnPlayer1 = true;
    var intervalLevel = 500;
    var score = 0;
    var basestructure = "<div class='pixel'></div>";
    var structure = "";
    for(var ki=0;ki<columns;ki++) {
        for(var k=0;k<rows;k++) {
            structure = structure + basestructure;
        }
    }
    $('#grid').append(structure);
    populateGrid();
    drawGrid();
    createGrid();
    changeGridDim();
    updatePoints();


    function win() {
    // var basestructure = "<div class='pixel'></div>";
    // var structure = "";
    // for(var ki=0;ki<columns;ki++) {
    //     for(var k=0;k<rows;k++) {
    //         structure = structure + basestructure;
    //     }
    // }
    // $('#grid').html(structure);
    // level++;
    // populateGrid();
    // drawGrid();
    // createGrid();
    // changeGridDim();
    // updatePoints();
    // newBlock();
    // intervalLevel = intervalLevel -100;
    // if(intervalLevel==0) notificateClick('HAI VINTO TUTTO');
    // else engine(intervalLevel);


    }

    $( "#start" ).click(function() {
        $('body').removeClass('infodisplayed');
        changeGridDim();
        $('body').addClass('gaming');
        //console.log(grid);
        newBlock();
        engine(intervalLevel);

    });

    function engine(time) {
        clearInterval(gameInterval);
        gameInterval = setInterval(function() {
            //console.log(activeTiles);
            for (var i = 0; i < activeTiles.length; i++) {
                //console.log(activeTiles[i]);
                if(activeTiles[i][2] > 0 &&  grid[activeTiles[i][1]][activeTiles[i][2]-1][0] == 'free') {

                    //upadate grid
                    var prevColor = activeTiles[i][0];
                    grid[activeTiles[i][1]][activeTiles[i][2]][0] = 'free';
                    drawGridLight(activeTiles[i][1],activeTiles[i][2])
                    //console.log(activeTiles[i][0])
                    grid[activeTiles[i][1]][activeTiles[i][2]-1][0] = prevColor;
                    drawGridLight(activeTiles[i][1],activeTiles[i][2]-1);
                    activeTiles[i] = grid[activeTiles[i][1]][activeTiles[i][2]-1];
                } else {

                    var old = activeTiles[i]
                    //console.log('rimuovo: '+activeTiles[i])
                    var index = activeTiles.indexOf(activeTiles[i]);
                    activeTiles.splice(index, 1);
                    colorRoutine([old]);
                    checkToEliminate();
                    //console.log(activeTiles)
                    if(activeTiles.length==0) {
                        //checkToEliminate();
                        engine(intervalLevel);
                        newBlock();

                        i--;
                    }


                }
            };
        }, time);
    }

    function randomColorFromPresent(exclude) {
        var currentColors = [];
        for(var ki=0;ki<columns;ki++) {
            for(var k=0;k<rows;k++) {
                if(grid[ki][k][0] != 'free'
                    && currentColors.indexOf(grid[ki][k][0])==-1
                      && grid[ki][k][0] != exclude) {
                currentColors.push(grid[ki][k][0]);
                }

            }
        }
        if(currentColors.length==0) {
            clearInterval(gameInterval);
            notificateClick('HAI VINTO');
            win();

        }
        var aicolor;
        var rndmColor =  Math.floor(Math.random()*currentColors.length);
        aicolor = currentColors[rndmColor];
        return aicolor;
    }

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
    function checkToEliminate() {
        var recusrionFlag = []
        for(var ki=0;ki<columns;ki++) {
            for(var k=0;k<rows;k++) {
                if(grid[ki][k][0]!='free' && k > 0 && activeTiles.indexOf(grid[ki][k])==-1) {
                    if(grid[ki][k-1][0]=='free') {
                        recusrionFlag.push(grid[ki][k]);
                    }
                }


            }
        }
        if(recusrionFlag.length!=0) {
            engine(100);
            for (var i = 0; i < recusrionFlag.length; i++) {
                activeTiles.push(recusrionFlag[i]);
            };
        }
        //else {console.log('ho finito')}

    }
    // function checkToEliminate() {
    //     //console.log('eccomi');
    //     var recusrionFlag = []
    //     for(var ki=0;ki<columns;ki++) {
    //         for(var k=0;k<rows;k++) {
    //             if(grid[ki][k][0]!='free' && k > 0 && activeTiles.indexOf(grid[ki][k])==-1) {
    //                 //console.log(grid[ki][k-1][0]);
    //                 if(grid[ki][k-1][0]=='free') {
    //                     //console.log('eccolo');

    //                     recusrionFlag.push(grid[ki][k]);
    //                     //goDown(grid[ki][k]);
    //                     engine(100);
    //                     activeTiles.push(grid[ki][k]);
    //                 }
    //             }


    //         }
    //     }
    //     if(recusrionFlag.length!=0) checkToEliminate();
    //     //else {console.log('ho finito')}

    // }
    function colorRoutine(tiles) {
        var group = tiles;
        var currColor = group[0][0];
        for (var i = 0; i < group.length; i++) {
            if(true) {
                if(group[i][2] < columns-1 && grid[group[i][1]][group[i][2]+1][0]==currColor ){
                    if(group.indexOf(grid[group[i][1]][group[i][2]+1])==-1 ) {
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
                if(group[i][1] < columns-1 && grid[group[i][1]+1][group[i][2]][0]==currColor){
                    if(group.indexOf(grid[group[i][1]+1][group[i][2]])==-1) {
                    group.push(grid[group[i][1]+1][group[i][2]]);
                    //if(usertype == 'user')score++;
                }
                }
            }
        }

        if(group.length>=3) {
           for (var i = 0; i < group.length; i++) {
                grid[group[i][1]][group[i][2]][0] = 'free';
               drawGridLight(group[i][1],group[i][2]);
            };
        }
    }
    function shiftRight() {
        for (var i = 0; i < activeTiles.length; i++) {
            if(activeTiles[i][1]<columns-1 && grid[activeTiles[i][1]+1][activeTiles[i][2]][0] == 'free') {
                var prevColor = activeTiles[i][0];
                grid[activeTiles[i][1]][activeTiles[i][2]][0] = 'free';
                drawGridLight(activeTiles[i][1],activeTiles[i][2])

                grid[activeTiles[i][1]+1][activeTiles[i][2]][0] = prevColor;
                drawGridLight(activeTiles[i][1]+1,activeTiles[i][2]);
                activeTiles[i] = grid[activeTiles[i][1]+1][activeTiles[i][2]];
            };
        };
    }
    function shiftLeft() {
            for (var i = activeTiles.length-1; i >= 0; i--) {
                if(activeTiles[i][1]>0 && grid[activeTiles[i][1]-1][activeTiles[i][2]][0] == 'free') {
                    var prevColor = activeTiles[i][0];
                    grid[activeTiles[i][1]][activeTiles[i][2]][0] = 'free';
                    drawGridLight(activeTiles[i][1],activeTiles[i][2])
                    grid[activeTiles[i][1]-1][activeTiles[i][2]][0] = prevColor;
                    drawGridLight(activeTiles[i][1]-1,activeTiles[i][2]);
                    activeTiles[i] = grid[activeTiles[i][1]-1][activeTiles[i][2]];
                }
            };
    }
    function shiftUp() {
            //clearInterval(engine);
            if(activeTiles.length==2 && activeTiles[0]!='free' && activeTiles[1]!='free'){
                console.log(activeTiles)
                var old = activeTiles[0][0];
                activeTiles[0][0] = activeTiles[1][0];
                activeTiles[1][0] = old;
                drawGridLight(activeTiles[0][1],activeTiles[0][2])
                drawGridLight(activeTiles[1][1],activeTiles[1][2])
            }
            //engine(500);
    }
    $( "#grid" ).on( 'swiperight', function() {
           shiftRight();
    });
    $( "#grid" ).on( 'swipeleft', function() {
           shiftLeft() ;
    });
    $( "#moveRight" ).on( clickType, function() {
           shiftRight() ;
    });
    $( "#moveLeft" ).on( clickType, function() {
           shiftLeft();
    });
    $( "#controlsMobile" ).on( 'swipeup', function() {
           shiftUp() ;
    });
    $( "#controlsMobile" ).on( 'swipedown', function() {
           fast() ;
    });
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
        for(var ki=0;ki<columns;ki++) {
            for(var k=0;k<rows;k++) {
                var optimize = $( ".pixel:eq("+elementPos(ki,k)+")" );
                optimize.attr('class', 'pixel '+grid[ki][k][0]);

            }
        }
    }
    function drawGridLight(a,b) {
        var position = elementPos(a,b);
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
                height: pixelDimension/2+'%',
                width: pixelDimension+'%'
                // height: '20%',
                // width: '20%'
              });
        });
    }
    function gridPos(elemposition) {
        return([elemposition%rowTiles,((rowTiles-1)-(parseInt(elemposition/rowTiles)))]);
    }
    function elementPos(x,y) {
        var pass = columns*(rows-1-y)+x;
        return pass;
    }

    function populateGrid() {
            //cane++;f
            grid = new Array(columns);
            for(var ty=0;ty<columns;ty++) {
                grid[ty] = new Array(rows);
            }
            for(var ki=0;ki<columns;ki++) {
                for(var k=0;k<rows;k++) {
                    if(k<  3  ) {
                    var rndmColor =  Math.floor(Math.random()*6+1);
                    grid[ki][k] = [randomColor(),ki,k];
                    } else grid[ki][k] = ['free',ki,k];

                }
            }
    }
    function newBlock() {

        if(grid[3][rows-1][0] != 'free' || grid[2][rows-1][0] != 'free') {
            clearInterval(gameInterval);
            notificateClick('HAI PERSO');
        }
        else {
            grid[3][rows-1] = [randomColorFromPresent('none'),3,rows-1];
            drawGridLight(3,rows-1)
            grid[2][rows-1] = [randomColorFromPresent(grid[3][rows-1][0]),2,rows-1];
            //grid[2][rows-1] = ['red',2,rows-1];
            drawGridLight(2,rows-1)
            activeTiles.push(grid[3][rows-1],grid[2][rows-1]);

        }



    }
    function fast() {
        engine(100);
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
    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: shiftLeft();// left
            break;

            case 38: shiftUp();// up
            break;

            case 39:  shiftRight();// right
            break;

            case 40: fast();// down
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    $(document).keyup(function(e) {
        switch(e.which) {

            case 40: //engine(500);// up
            break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
});

