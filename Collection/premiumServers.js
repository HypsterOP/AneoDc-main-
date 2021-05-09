const { Collection } = require("discord.js");

const prems = new Collection();
const prem = require("../models/premium");

function loadPrems(client) {
  client.guilds.cache.forEach((guild) => {
    prem.findOne({ Guild: guild.id }, async (err, data) => {
      if (data) {
        prems.set(guild.id, true);
      }
    });
  });
}

module.exports = {
  prems,
  loadPrems,
};