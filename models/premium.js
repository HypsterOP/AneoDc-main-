const { model, Schema } = require('mongoose');

module.exports = model(
	'premium',
	new Schema({
		Guild: String,
	})
);
