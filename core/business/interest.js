var Finance = require('financejs');


module.exports = function(amount, monthly, period, rate) {
	/*var finance = new Finance();
	return finance.PMT(rate/100, period, -amount);*/
	//console.log(arguments)

	return (monthly * period) - amount;
};