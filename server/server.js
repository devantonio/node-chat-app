// console.log(__dirname + '/../public');
// console.log(publicPath);

//path is a built in module and does not need to be installed
//using a node module//https://nodejs.org/api/path.html#path_path_join_paths
//go straight from the project folder right in tothe public folder 
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;//configure heroku
var app = express();

app.use(express.static(publicPath));



app.listen(port, () => {
	console.log(`started up on port ${port}`);
});