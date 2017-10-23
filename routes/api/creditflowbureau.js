var _ = require('lodash');
var core = require('./../../core');


module.exports = function(req, res) {
	var amount = parseFloat(req.params.amount);
	var period = _.random(6, 48, false);
	var apr = _.random(3, 30, false);
	var delay = _.random(200, 400, false);
	
	var repayment = core.business.repayment(amount, period, apr);


	setTimeout(function() {
		res.json({
			'interests': {
				'annual percentage rate': apr + '%',
				'monthly repayments': repayment
			},
			'amount': amount,
			'period': period
		});
	}, delay);
}