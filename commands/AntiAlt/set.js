/* eslint-disable no-unused-vars */
const schema = require(`../../models/alt-logs`);
const { MessageEmbed, Message, Client, Permissions } = require("discord.js");
module.exports = {
  name: "setaltlogs",
  description: "Set Logs For Alt Identifier Module",
  usage: "[Channel]",
  timeout: "10000",
  aliases: ["sal"],
  requirePermission: Permissions.FLAGS.ADMINISTRATOR,
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.channel.send({ content: `You can't use this` });
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
      return message.channel.send({
        content: `I don't have permission to run Alt Identifier Module`,
      });
    const channel =
      (await message.mentions.channels.first()) ||
      message.guild.channels.cache.get(args[0]) ||
      message.channel;
    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) {
        new schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
        message.channel.send({
          content: `Updated Anti-Alt Logs to ${channel}`,
        });
      } else if (data) {
        data.delete();
        new schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
        message.channel.send({
          content: `Updated Anti-Alt Logs to ${channel}`,
        });
      }
    });
  },
};
