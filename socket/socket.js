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
}