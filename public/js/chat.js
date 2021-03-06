var socket = io();//initiate a connection request making a request from the client to the server to open up a web socket and keep that connection open

function scrollToBottom () {
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child')

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();//prev() moves us the the previous child//we're now at the second to last list item

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	} 
}

//we already have socket above so we dont need to give back the socket arg
		socket.on('connect', function () {
			var params = $.deparam(window.location.search);

			socket.emit('join', params, function (err) {
				if (err) {
					alert(err);
					window.location.href = '/';
				} else {
					console.log('No error');
				}
			});
		});

		socket.on('disconnect', function ()  {
			console.log('Disconnected from server');
		});

		socket.on('updateUserList', function (users) {
			var ol = $('<ol></o>');

			users.forEach(function (user) {
				ol.append($('<li></li>').text(user));
			});

			$('#users').html(ol);
		});

		socket.on('newMessage', function (message) {//LISTENTIG FOR ANY DATA TO BE SENT //message arg is data that is coming in
			var formattedTime = moment(message.createdAt).format('h:mm a');
			var template = $('#message-template').html();
			var html = Mustache.render(template, {
				text: message.text,
				from: message.from,
				createdAt: formattedTime
			}); 
			$('#messages').append(html);

			scrollToBottom();
			// var formattedTime = moment(message.createdAt).format('h:mm a');
			// console.log('newMessage', message);
			// var li = $('<li></li>');
			// li.text(`${message.from} ${formattedTime}: ${message.text}`);

			// $('#messages').append(li);
		});
		
		socket.on('newLocationMessage', function (message) {
			var formattedTime = moment(message.createdAt).format('h:mm a');
			var template = $('#location-message-template').html();
			var html = Mustache.render(template, {
				url: message.url,
				from: message.from,
				createdAt: formattedTime
			}); 

			$('#messages').append(html);
			scrollToBottom();
		 // 	var formattedTime = moment(message.createdAt).format('h:mm a');
		 // 	var li = $('<li></li>');
		 // 	var a = $('<a target="_blank">My current location</a>');

		 // 	li.text(`${message.from} ${formattedTime}: `);
		 // 	a.attr('href', message.url);
		 // 	li.append(a);
			// $('#messages').append(li);
		});

		$('#message-form').on('submit', function (e) {//we need to access the event arg to override the default behavior
			e.preventDefault();

			var messageTextbox = $('[name=message]');
			var currentUser = $('[name=name]');
			var params = $.deparam(window.location.search);
			
			socket.emit('createMessage', {
				text: messageTextbox.val()
			}, function () {//acknowlegment
				messageTextbox.val('');
			});
		});
				

		var locationButton = $('#send-location');
		locationButton.on('click', function () {
			if (!navigator.geolocation) {
				return alert('Geolocation not supported by your browser.');
			}

			locationButton.attr('disabled', 'disabled').text('Sending Location...');
			

			navigator.geolocation.getCurrentPosition(function (position) {
				locationButton.removeAttr('disabled').text('Send Location');
				socket.emit('createLocationMessage', {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			}, function () {
				locationButton.removeAttr('disabled').text('Send Location');//if we're not able to fetch the location or if user denied access to location
				alert('Unable to fetch location.');
			});
		});







//socket.emit('createMessage', {
		// 	from: 'Frank',
		// 	text: 'Hi'
		// }, function (data) {//event acknowledgment//data is the data passed through callback(this is from the server)
		// 	console.log('Got it', data);
		// });


// socket.emit('createMessage', {//SENT TO SERVER FROM HERE, THE CLIENT
// 				from: 'me',
// 				text: 'hello'
// 			});

			// socket.on('newEmail', function (email) {//this email arg is the value we emitted from newEmail sever.js
		// 	console.log('New email:', email);
		// });


			// socket.emit('createEmail', {//sending this to the server as soon as it connects
			// 	to: 'jen@example.com',
			// 	text: 'Hey. This is Antonio'
			// });

