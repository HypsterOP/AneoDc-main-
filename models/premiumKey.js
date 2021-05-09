const { Schema, model } = require("mongoose");

module.exports = model(
  "premium-keys",
  new Schema({
    Key: String,
  })
);