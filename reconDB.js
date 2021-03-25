const { reconDB } = require('reconlx')
const client = require('./index')
const db = new reconDB(client, {
    uri:
        "mongodb+srv://hypster:hypster@hype.otry4.mongodb.net/Data"
});

module.exports = db;