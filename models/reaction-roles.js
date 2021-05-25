const mongo = require('mongoose');

const schema = new mongo.Schema({
  Guild: String,
  Channel: String,
  Message: String,
  Emoji: String,
  Role: String,
})

module.exports = mongo.model('reaction-roles', schema)