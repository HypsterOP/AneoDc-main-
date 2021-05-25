const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild : String,
    Avatar: String,
    Days: Number,
})

module.exports = mongoose.model('alt',Schema)