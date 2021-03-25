const mongo = require('mongoose');

const Schema = new mongo.Schema({
    Guild: String,
    Channel: String,
});

module.exports = mongo.model('goodbye-channel', Schema);
