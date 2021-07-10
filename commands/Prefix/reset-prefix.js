/* eslint-disable no-unused-vars */
const prefixSchema = require("../../models/prefix");
const prefix = require("../../config.json").prefix;
const { confirmation } = require("@reconlx/discord.js");
const { Permissions } = require("discord.js");

module.exports = {
  name: "prefix-reset",
  run: async (client, message) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;
    message.delete();
    await prefixSchema.findOneAndDelete({ Guild: message.guild.id });
    message.channel.send(`The prefix has been reset to ${prefix}`);
  },
};
