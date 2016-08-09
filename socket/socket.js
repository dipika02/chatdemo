module.exports = function (io,groups){
	
	var chat = io.of('/grouplist').on('connection',function(socket){
		console.log ("connection Estabilished on the server @!!!");
		socket.emit('groupupdate', JSON.stringify(groups));


		socket.on('newgroup',function(data){
			groups.push(data);
			socket.broadcast.emit('groupupdate', JSON.stringify(groups));
			socket.emit('groupupdate', JSON.stringify(groups));
			console.log("JSON.stringify(groups)"+JSON.stringify(groups));
		})

	}) 


	var messages =  io.of('/messages').on('connection',function(socket){
		console.log('connected to the chatIndex...');

		socket.on('joingroup',function(data){
			socket.username = data.user;
			socket.userPic = data.userPic;
			socket.join(data.group);
			// updateUserList(data.group,true);
		});

		socket.on('error',function(er){
			console.log(er);
		});
		
		socket.on('newMessage',function(data){
			socket.broadcast.to(data.group_number).emit('messagesfeed',JSON.stringify(data));
		});

		function updateUserList(group,updateAll){
			var getUsers = io.of('/messages').clients(group);
			
			var userList = [];
			for(var i in getUsers){
				userList.push({user:getUsers[i].username,userPic:getUsers[i].userPic});
				console.log({user:getUsers[i].username,userPic:getUsers[i].userPic} + "{user:getUsers[i].username,userPic:getUsers[i].userPic}");
			}
			socket.to(group).emit('updateUsersList',JSON.stringify(userList));
			console.log("data is print ");
			
			if(updateAll){
				socket.broadcast.to(group).emit('updateUsersList',JSON.stringify(userList));
				console.log("unknwn");
			}
		}

		// socket.on('updateList',function(data){
		// 	updateUserList(data.group);
		// 	console.log("name");
		// })
	})
}
