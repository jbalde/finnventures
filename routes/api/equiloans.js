var _ = require('lodash');
var core = require('./../../core');


module.exports = function(req, res) {
	var amount = req.params.amount;
	var period = _.random(6, 48, false);
	var apr = _.random(0.02, 0.255, true);
	var delay = _.random(100, 500, false);

	var repayment = core.business.repayment(amount, period, apr * 100);
	var id = _.random(100000, 999999, false);
	

	setTimeout(function() {
		res.json({
			'response' : {
				'id' : id,
				'APR' : apr,
				'amount': _.round(amount * 100, 0),
				'months': period,
				'quote': _.round(repayment * 100, 0),
				'currency': 'EUR'
			},
			'error' : []
		});
	}, delay);	
}