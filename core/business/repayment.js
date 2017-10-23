var Finance = require('financejs');


module.exports = function(amount, period, rate) {
	var finance = new Finance();
	return finance.AM(amount, rate, period, 1);
};