/*
//var api = require('fixer-io-node');
var fx = require('node-fixer-io');

//TODO: Cache???
module.exports = function(amount, base, to, callback) {
	fx.get(function() {
		var fxAmount = fx.convert(to, base, amount);
		callback(fxAmount);
	});
};
*/


var Client = require('node-rest-client').Client;
var client = new Client();


module.exports = function(amount, base, to, callback) {
	client.get(`http://api.fixer.io/latest?base=${base}&symbols=${to}`, function (data, response) {
		callback(data.rates[to]);
	});
};