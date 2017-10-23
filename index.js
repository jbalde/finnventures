var express = require('express');
var sse = require('./routes/middleware/sse');
var events = require('events');
var routes = require('./routes');


var eventEmitter = new events.EventEmitter();
var app = express();


app.use(express.static('public'));
app.use(sse);

routes(app);

app.listen(3000, function () {
	console.log('START FV PROJECT - PORT: 3000');
});