const { Schema, model } = require('mongoose');

module.exports = model('chat-bot', new Schema({
  Guild: String,
  Channel : String,
})
);