const client = require('../index');
const { GiveawayClient } = require('reconlx');
const config = require('../config.json');

const giveaway = new GiveawayClient(client, {
    mongoURI: config.mongo,
    emoji: '🎉',
    defaultColor: "#23DCEA"
});

module.exports = giveaway;