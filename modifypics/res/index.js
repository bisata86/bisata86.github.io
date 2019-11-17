  var events = {};
  $( document ).ready(function() {
     document.getElementById('canvas').width  = $(window).width();
     document.getElementById('canvas').height  = $(window).height()*90/100;
     addMenu();
     var prev = {};
     var color = '';
     function addMenu() {
        $('body').append('<div class="menu"></div>')
        $('.menu').append('<div class="handDraw">handdraw</div>')
        $('.menu').append('<input type="file" id="input" class="selectImage inputfile"></input>');
        $('.handDraw').on('click',function(){
          $(this).addClass('selected')
          $('body').append('<div class="settings"></div>')
          $('.settings').append('<div class="color"><input type="color" value="#000000"/></div><div class="thick"><input id="linew" type="range" value="5" max="10" min="1" step="1"/></div>')
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
                line(curr,prev,ctx, color, $('#linew').val())
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
        var input = document.getElementById('input');
        input.addEventListener('change', handleFiles);
     }
    isMobile()
    $( window ).resize(function() {
        isMobile()
    })


  })

  function handleFiles(e) {
      $('body').append('<canvas id="imgCanvas"></canvas>')
      document.getElementById('imgCanvas').width  = $(window).width();
      document.getElementById('imgCanvas').height  = $(window).height();
      var ctx = $('#imgCanvas')[0].getContext('2d');
      var url = URL.createObjectURL(e.target.files[0]);
      var img = new Image();
      $('body').append('<img id="tempImg" src="'+url+'"></img>')
      img.onload = function(e) {
          $('body').append('<div class="settings"></div>')
          $('.settings').append('<div class="setImg">ok</div>')
          var w = $('#tempImg').width();
          var h = $('#tempImg').height();
          ctx.drawImage(img, 0, 0, w, h);   
          $('#tempImg').remove(); 
          var move = false;
          var hMove = {x:0,y:0};
          var cpos = {x:0,y:0};
          var final = {};
          $('.setImg').on('click',function(){
              $('#imgCanvas').remove();
              $('#canvas')[0].getContext('2d').drawImage(img, final.x,final.y, w, h); 
              $('.settings').remove();
          })
          $('#imgCanvas').on(events.start,function(e){
              move = true;
              hMove = {x:e.clientX,y:e.clientY}
          })
          $('#imgCanvas').on(events.end,function(e){
              move = false
              cpos = {x:e.clientX- hMove.x+cpos.x,y:e.clientY-hMove.y+cpos.y}
          })
          $('#imgCanvas').on(events.move,function(e){
              if(move) {
                if(e.touches) 
                    e = e.touches[0];
                ctx.clearRect(0,0,$(window).width(),$(window).height())
                ctx.drawImage(img, e.clientX- hMove.x+cpos.x,e.clientY-hMove.y+cpos.y, w, h); 
                final = {x:e.clientX- hMove.x+cpos.x,y:e.clientY-hMove.y+cpos.y}
              }
          })
      }
      img.src = url;   
  }

  function point(x, y, canvas){
    canvas.beginPath();
    canvas.moveTo(x,y);
    canvas.lineTo(x+1, y+1);
    canvas.stroke();
  }

  function line(c, p, canvas, color, linew){
    console.log(color)
    canvas.strokeStyle = color;
    canvas.lineWidth = linew;
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