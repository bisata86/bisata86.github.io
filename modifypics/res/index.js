  var events = {};
  $( document ).ready(function() {
     document.getElementById('canvas').width  = $(window).width();
     document.getElementById('canvas').height  = $(window).height();
     addMenu();
     var prev = {};
     var color = '';
     function addMenu() {
        $('body').append('<div class="menu"></div>')
        $('.menu').append('<div class="handDraw">handdraw</div>')
        $('.handDraw').on('click',function(){
          $(this).addClass('selected')
          $('body').append('<div class="settings"></div>')
          $('.settings').append('<div class="color"><input type="color" value="#000000"/></div><div class="thick">thick</div>')
          $('.color input').on('change',function(e){
              color = $(this).val();
          })
          var write = false;
          $('body').on(events.move,function(e){
              if(e.touches) 
                  e = e.touches[0];
              if(write) {

                var ctx = document.getElementById('canvas').getContext('2d');
                var curr = {x:e.clientX,y:e.clientY}
                line(curr,prev,ctx, color)
                prev = {x:e.clientX,y:e.clientY}
                //point(e.clientX, e.clientY, ctx)
              }
          })
          $('body').on(events.start,function(e){
              write = true;
          })
          $('body').on(events.end,function(e){
              write = false
              prev  = {};
          })
        })
     }
    isMobile()
    $( window ).resize(function() {
        isMobile()
    })


  })

  function point(x, y, canvas){
    canvas.beginPath();
    canvas.moveTo(x,y);
    canvas.lineTo(x+1, y+1);
    canvas.stroke();
  }

  function line(c, p, canvas, color){
    console.log(color)
    canvas.strokeStyle = color;
    canvas.lineWidth = 5;
    canvas.beginPath();
    canvas.moveTo(c.x,c.y);
    canvas.lineTo(p.x,p.y);
    canvas.stroke();
  }

  function isMobile() {
    if( $(window).height() > $(window).width() ) {
        $('body').removeClass('landscape');
    } else {
        $('body').addClass('landscape');
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('body').addClass('mobile');
        $('body').removeClass('desktop');
        events.move = 'touchmove';
        events.start = 'touchstart';
        events.end = 'touchend';
        return true;
    } else {
        $('body').removeClass('mobile');
        $('body').addClass('desktop');
        events.move = 'mousemove';
        events.start = 'mousedown';
        events.end = 'mouseup';
        return false;
    }
  }