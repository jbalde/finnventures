var sse = require('./middleware/sse');
var requireDir = require('require-dir');
var api = requireDir('./api');
var webapi = requireDir('./webapi');
var stream = requireDir('./stream');



module.exports = function(app) {
	app.get('/webapi/call-loan/:amount', webapi.loan);


	app.get('/api/equiloans/:amount', api.equiloans);
	app.get('/api/creditflowbureau/:amount', api.creditflowbureau);


	app.get('/stream/loan', stream.loan);
};