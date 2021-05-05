const { Schema, model } = require("mongoose")

module.exports = model("Channels", new Schema({ Guild: String, Channel: String, Author: String, Activated: Boolean }));