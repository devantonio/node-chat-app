var moment = require('moment');

//unix Jan 1st 1970 00:00:10 am

// var date = new Date();
// console.log(date.getMonth());

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
date.add(1, 'year').subtract(9, 'months');
console.log(date.format('h:mm a'));