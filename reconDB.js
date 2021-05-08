const { reconDB } = require('reconlx')
const client = require('./index')
require("dotenv").config()
const db = new reconDB(client, {
    uri:
        process.env.MONGO_BOT
});

module.exports = db;