
// Wait for DOM to Load
jQuery(function($) {

    // Create New Socket Connection using Socket.io
    var socket = io();
    
    
    
    
    // on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.emit('adduser', prompt("What's your name?"));
	});

	// listener, whenever the server emits 'updatechat', this updates the chat body
	socket.on('updatechat', function (username, data) {
		$('.messages').append('<b>'+username + ':</b> ' + data + '<br>');
	});

	// listener, whenever the server emits 'updateusers', this updates the username list
	socket.on('updateusers', function(data) {
		
		$.each(data, function(key, value) {
			$('#users').append('<div>' + key + '</div>');
		});
    
    
    
    

    // Send A Message To The Server
    $('.sendbtn').on('click', function(){
      var text = $('textarea').val();
      socket.emit('message', text);
      socket.emit('username', data);

      
      // Clear text in text area after submission
      $('textarea').val('');
      
    });

    // Recieve Update Event From The Server
    socket.on('update', function(msg){
      $('.messages').append(msg).append('<br>');
    });
    
  


    
    

    
    
    // 
    $('#emoticonbox a').click(function(){

    var smiley = $(this).attr('title');
    
    var caretPos = caretPos();

    var strBegin = $('#messagebox').val().substring(0, caretPos);
    var strEnd   = $('#messagebox').val().substring(caretPos);
    
    $('#messagebox').val( strBegin + " " + smiley + " " + strEnd);




function caretPos()
{
    var el = document.getElementById("messagebox");
    var pos = 0;
    // IE Support
    if (document.selection) 
    {
        el.focus ();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart ('character', -el.value.length);
        pos = Sel.text.length - SelLength;
    }
    // Firefox support
    else if (el.selectionStart || el.selectionStart == '0')
        pos = el.selectionStart;

    return pos;

}

  

    });

	});

});
