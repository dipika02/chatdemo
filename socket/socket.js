module.exports = function (io,groups){
	
	var chat = io.of('/grouplist').on('connection',function(socket){
		console.log ("connection Estabilished on the server !!!");


		socket.on('newgroup',function(data){
			 groups.push(data);
			 socket.broadcast.emit('gropupdate',JSON.stringify(groups));
			 socket.emit('gropupdate',JSON.stringify(groups));
		})

	}) 
}