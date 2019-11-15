  var events = {};
  $( document ).ready(function() {
     document.getElementById('canvas').width  = $(window).width();
     document.getElementById('canvas').height  = $(window).height();
     addMenu();
     
     function addMenu() {
        $('body').append('<div class="menu"></div>')
        $('.menu').append('<div class="handDraw">handdraw</div>')
        $('.handDraw').on('click',function(){
          var write = false;
          $('body').on(events.move,function(e){
              if(e.touches) 
                  e = e.touches[0];
              if(write) {
                var ctx = document.getElementById('canvas').getContext('2d');
                console.log(e, e.clientX, e.clientY)
                point(e.clientX, e.clientY, ctx)
              }
          })
          $('body').on(events.start,function(e){
              write = true;
          })
          $('body').on(events.end,function(e){
              write = false
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
    canvas.moveTo(x, y);
    canvas.lineTo(x+1, y+1);
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