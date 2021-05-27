const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
    Member: Array,
})

module.exports = mongoose.model('anti-ping',Schema)