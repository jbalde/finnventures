var Client = require('node-rest-client').Client;
var client = new Client();
var core = require('../../core');
var async = require('async');
var _ = require('lodash');


//TODO: capture JSON post customer data
module.exports = function(req, res) {
	var amount = parseFloat(req.params.amount);


	var initResponse = function(name) {
		return {
			name: name,
			apr: -1,
			monthrepayment: -1,
			interest: -1
		};
	}


	//TODO: refactor to core.thirdparty
	//TODO: validate response
	//TODO: Adaptation layer
	//TODO: check the currency is EUR otherwhise exchange the quote
	var equiloans = function(amount, next) {

		client.get(`http://localhost:3000/api/equiloans/${amount}`, function (data, response) {
			var loanResponse = initResponse('equiloans');
			loanResponse.monthrepayment = data.response.quote / 100;
			loanResponse.apr = parseFloat(data.response.APR) * 100;
			loanResponse.interests = core.business.interest(amount, loanResponse.monthrepayment, data.response.months, loanResponse.apr);
			//loanResponse.month = data.response.months;

			core.events.loanEvents.emit('fv-loan', loanResponse);
			next();
		});
	}

	//TODO: refactor to core.thirdparty
	//TODO: Adaptation layer
	//TODO: validate response
	//TODO: exchange USD-EUR
	var credit = function(amount, next) {
		core.business.exchange(1, 'EUR', 'USD', function(exchange) {
			var usdAmount = amount * exchange;

			client.get(`http://localhost:3000/api/creditflowbureau/${usdAmount}`, function (data, response) {
				var loanResponse = initResponse('creditbureau');
				loanResponse.monthrepayment = data.interests['monthly repayments'] / exchange;
				loanResponse.apr = parseFloat(data.interests['annual percentage rate']);
				//loanResponse.month = data.period;

				loanResponse.interests = core.business.interest(amount, loanResponse.monthrepayment, data.period, loanResponse.apr);

				core.events.loanEvents.emit('fv-loan', loanResponse);
				next();
			});
		});
	}



	async.times(3, function(n, next) {
		async.applyEach([equiloans, credit], amount, next);
	}, function() {
		console.log('end loan search');
	});


	res.end('success');
}