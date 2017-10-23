var events = require('events');
var eventEmitter = new events.EventEmitter();


//Create events queue for multiple frontend clients
module.exports = eventEmitter;