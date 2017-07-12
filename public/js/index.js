
			// socket.on('newEmail', function (email) {//this email arg is the value we emitted from newEmail sever.js
		// 	console.log('New email:', email);
		// });


			// socket.emit('createEmail', {//sending this to the server as soon as it connects
			// 	to: 'jen@example.com',
			// 	text: 'Hey. This is Antonio'
			// });




var socket = io();//initiate a connection request making a request from the client to the server to open up a web socket and keep that connection open


//we already have socket above sowe dont need to give back the socket arg
		socket.on('connect', function () {
			console.log('Connected to server');
			
			socket.emit('createMessage', {
				from: 'me',
				text: 'hello'
			});
		});

		socket.on('disconnect', function ()  {
			console.log('Disconnected from server');
		});

		socket.on('newMessage', function (message) {
			console.log('newMessage', message);
		});
	

		