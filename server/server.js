// console.log(__dirname + '/../public');
// console.log(publicPath);

//path is a built in module and does not need to be installed
//using a node module//https://nodejs.org/api/path.html#path_path_join_paths
//go straight from the project folder right in tothe public folder 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;//configure heroku
var app = express();
var server = http.createServer(app);//express is intergrated with http//making this change so the server can use socket.io
var io = socketIO(server);//passing in the server we want to use with our web sockets//we get back our web sockets server//this is how we will communicate with the server and the clients

app.use(express.static(publicPath));

//we can listen for a specific event and do something when that event happens
//io.on lets you register an event listener
//one popular built in event is called connection this lets you listen for a new connection 
//meaning a client connected to the server 
//and it lets you do something when that connection comes in

io.on('connection', (socket) => {//socket//represents an individual socket as oppose to all the users connected to the server
	//do something when the connection comes in 
//everytime a user connects to our app we can print a message to the console
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	socket.on('createMessage', (message, callback) =>{//listener event//LISTENING FOR DATA TO SEND TO SERVER
		console.log('createMessage', message);
		//socket.emit, emits and event to a single connection...io.emit emits an event to every single connection 
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('This is from the server');//calling the function in createMessage thats in index.js//send an event back to the front end
		
		//broadcasting is the term for emiting an event to everyone but one specific user
		//this message will be sent to everyone but the person that sends it
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});

});

server.listen(port, () => {
	console.log(`started up on port ${port}`);
});























	// socket.emit('newMessage', {//SENT TO CLIENT//FROM HERE, THE SERVER//the second arf is message arg in index.js
	// 	from: 'mike@example.com',
	// 	text: 'Hey. What is going on?',
	// 	createdAt: '123'
	// });


	// socket.emit('createEmail', (newEmail) => {//taking in socket.emit('createEmail', from index.js
	// 	console.log('createEmail', newEmail);
	// });
