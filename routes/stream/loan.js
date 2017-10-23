var core = require('../../core');

module.exports = function(req, res) {
	res.sseSetup();

	core.events.loanEvents.addListener('fv-loan', function(response) {
		res.sseSend(JSON.stringify(response));
	});
}