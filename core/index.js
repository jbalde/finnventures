var requireDir = require('require-dir');


module.exports = {
	business: requireDir('./business'),
	events: requireDir('./events')
}