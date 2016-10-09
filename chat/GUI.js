//var socket = io.connect('http://192.168.1.104:3000');
//var socket = io.connect('http://localhost:3000');
var socket = io.connect('http://besachat.herokuapp.com:80');

function GUI(){
	var _this 	   = this;
    function detectmob() {
    	if ($(window).width() > $(window).height()) {
	        $('body').addClass('landscape');
	        $('body').removeClass('portrait');
	    }else {
	        $('body').removeClass('landscape');
	        $('body').addClass('portrait');
	    }
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		){
			$('body').addClass('mobile');
        	clickType = 'touchstart';
		}else {
			$('body').addClass('desktop');
        	clickType = 'click';
		}
    }

    function getName(){
        socket.emit('get_name');
    }
    function sendMessage(){
        var message = $('#testo').val();
        var pass = $('#key').val();
        var encryptedAES = CryptoJS.AES.encrypt(message, pass).toString();
        if(message.trim()!='')
        socket.emit('send_message', {'message':encryptedAES});
        $('#testo').val('');

    }
    function setEncryption() {
        $('body').toggleClass('settingsLayout');
         $('#setEnc').attr('disabled', 'disabled');
    }
    function submitName(){
        var name = $('#userName').val();
        socket.emit('set_name', {'name':name});
        $('#setName').attr('disabled', 'disabled');
    }
    function displaySettings() {
        socket.emit('get_name');
        $('body').toggleClass('settingsLayout');
    }
    function clearAll() {
        socket.emit('send_message', {'message':'/clear'});
    }
    this.showJoinErr = function(data){
    	$('#game_join .error').html(data.err);
    }
	this.updateChat = function(data){
        var pass = $('#key').val();
        var decrypted = CryptoJS.AES.decrypt(data.message,pass).toString(CryptoJS.enc.Utf8);
        if(decrypted=='') decrypted = "Encripted"
        $('.chat').append('<div class="message"><div class="author">'+data.author+'</div>'+decrypted+'</div>')
        $(".chat").scrollTop($(".chat")[0].scrollHeight);
	}
    this.reloadChat = function(data){
        $('body').toggleClass('settingsLayout');
       // $('.chat').html('');

    }
    this.initChat = function(data){
        $('.chat').html('');
        for (var i = 0; i < data.length; i++) {
             var pass = $('#key').val();
             var decrypted = CryptoJS.AES.decrypt(data[i].message,pass).toString(CryptoJS.enc.Utf8);
             if(decrypted=='') decrypted = "Encripted"
            $('.chat').append('<div class="message"><div class="author">'+data[i].author+'</div>'+decrypted+'</div>')
        };
        $(".chat").scrollTop($(".chat")[0].scrollHeight);
        //$('.chat').append('<div class="message">'+data.message+'</div>')
    }
    this.userCount = function(data){
        $('.online').html('Online: '+data);
    }
    this.displayName = function(_data){
        $('#userName').val(_data.name)
    }
	this.init = function(){
		detectmob();
        // $(".power").on(clickType, colorClick);
        // $("#create_game").on(clickType, createGame);
        // $("#join_game").on(clickType,  showJoinGame);
        // $("#join_random").on(clickType,joinRandomGame);
        // $("#submit_join").on(clickType,  joinGame);
        $("#set_name").on(clickType,  getName);

 //       $("#submit_name").on(clickType,  submitName);
        $('body').html('<div class="panel"><div class="online"></div><div class="settings"></div><div class="clear"></div></div><div class="options"><input type="text" value="" id="userName"/><input type="button" id="setName" value="SET NAME" disabled/><input type="text" value="" id="key"/><input type="button" id="setEnc" value="SET ENCRYPTION" disabled/></div><div class="chat"></div><div class="controls"><input type="text" id="testo"/><input type="button" id="send" value=""/><div style="clear:both;"></div></div>')
        $("#send").on(clickType,  sendMessage);
        $("#setEnc").on(clickType,  setEncryption);
        $("#setName").on(clickType,  submitName);
        $(".settings").on(clickType,  displaySettings);
        socket.emit('add_user', {});
        $("#testo").keyup(function(event) {
                if (event.keyCode==13) {
                    $("#send").trigger(clickType)
                    $("#testo").trigger('blur')
                    setTimeout(function(){$("#testo").trigger('focus') }, 200);
                }
        });
        $("#testo").focus(function(event) {
            setTimeout(function(){$(".chat").scrollTop($(".chat")[0].scrollHeight); }, 200);
        });
        $('#userName').focus(function(event) {
           $('#userName').val('');
           $('#setName').removeAttr('disabled');
        });
        $('#key').focus(function(event) {
           $('#key').val('');
           $('#setEnc').removeAttr('disabled');
        });
        $(".clear").on(clickType,  clearAll);
	}
}

function init(){
	var gui = new GUI();
	gui.init();
    socket.on('messages', gui.initChat);
    socket.on('user-count', gui.userCount);
    socket.on('player-name', gui.displayName);
	socket.on('update-chat', gui.updateChat);
    socket.on('name-setted', gui.reloadChat);
    socket.on('player-disconnected', function(event) {
        $('body').html('Connection Error');
        setTimeout(function(){ location.reload(); }, 100);
    });
  	socket.on('join-err', gui.showJoinErr);


    }

$(document).ready(init);


