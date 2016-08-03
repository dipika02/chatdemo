module.exports = function (io,groups){
	
	var chat = io.of('/grouplist').on('connection',function(socket){
		console.log ("connection Estabilished on the server @!!!");
			 socket.emit('groupupdate', JSON.stringify(groups));


		socket.on('newgroup',function(data){
			 groups.push(data);
			 // console.log("data"+data);
			 socket.broadcast.emit('groupupdate', JSON.stringify(groups));
			 socket.emit('groupupdate', JSON.stringify(groups));
			 console.log("JSON.stringify(groups)"+JSON.stringify(groups));
			 // console.log("data1111"+data);
		})
	}) 


var messages =  io.of('/messages').on('connection',function(socket){
	console.log('connected to the chatIndex...');
	
socket.on('joingroup',function(data){
	socket.username = data.user;
	socket.userPic = data.userPic;
	socket.join(data.group);
})
socket.on('newMessage',function(data){
socket.broadcast.to(data.group_number).emit('messagesfeed',JSON.stringify(data));
// console.log(messagesfeed + "emit('messagesfeed',JSON.stringify(data)");
// console.log(emit('messagesfeed',JSON.stringify(data) + "emit('messagesfeed',JSON.stringify(data)1234");
})
})
}
