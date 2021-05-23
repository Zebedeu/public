$(function(){
	let socket = io.connect('http://my.kepya.co.ao/');

	let message = $("#message");
	let send_message = $("#send_message");
	let chatroom = $("#chatroom");

	send_message.click(function(){
		console.log(message.val());
		socket.emit('new_message', { message: message.val() })
	})

	socket.on("new_message", (data) => {
		var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
		console.log(data);
		if(data.message.trim()){
			chatroom.append("<div class='outgoing_msg'><div class='sent_msg'><p>"+data.message+"</p><span class='time_date'>"+datetime+"</span></div></div>");
			$(message).val('')
		}
	})
})



