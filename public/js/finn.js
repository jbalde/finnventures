$(document).ready(function() {
	var loanResults = $('#loan-results');


	var sse = $.SSE('/stream/loan', {
		onMessage: function(e){ 
			console.log(e)
			var data = JSON.parse(JSON.parse(e.data));

			loanResults.append('<h4>Lender name: ' + data.name + '</h4>');
			loanResults.append('<ul>');
			loanResults.append('<li>APR: ' + _.round(data.apr, 2) + '%</li>');
			loanResults.append('<li>Monthly repayments: ' + _.round(data.monthrepayment, 2) + '€</li>');
			loanResults.append('<li>Total interests to be paid: ' + _.round(data.interests, 2) + '€</li>');
			loanResults.append('<li>Month: ' + _.round(data.month, 2) + '</li>');
			loanResults.append('</ul>');
			loanResults.append('<hr/>');
		}
	});

	sse.start();


	$('#loan-clear').on('click', function() {
		loanResults.text('');
		return false;
	});


	$('#loan-form').on('submit', function() {
		var amount = parseFloat($('#fv-amount').val());

		if(amount <= 0 || _.isNaN(amount)) {
			alert('The total price of the product need to be greather than 0€');
			return;
		}

		$.get('/webapi/call-loan/' + amount);


		return false;
	});
});