var assert = require('assert');
describe('API', () => {
	describe('EquiLoans', () => {
		it('should return -1 when the value is not present', () => {
			assert.equal(-1, [1,2,3].indexOf(4));
		});
	});


	describe('CreditFlowBureau', () => {
		it('Check repayment. Should return 89.99', () => {
			var repayment = require('./../core/business/repayment');
			assert.equal(89.99, repayment(3548, 48, 10));
		});
	});
});