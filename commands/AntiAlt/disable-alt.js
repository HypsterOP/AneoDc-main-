/* eslint-disable no-unused-vars */
const { MessageEmbed, Message, Client, Permissions } = require("discord.js");
const schema = require("../../models/alt.js");

module.exports = {
  name: "disable-alt",
  description: "Disable Alt Identifier Module",
  aliases: ["dalt"],
  timeout: "10000",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.channel.send(
        `You need Admin permission to use this command`
      );
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.channel.send({ content: "I need administrator Permissions to run this module." });
    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data)
        return message.channel.send({
          content: ":x: Anti Alt Module is already disabled.",
        });
      data.delete();
      message.channel.send({ content: "Disabled Anti Alt" });
    });
  },
};
