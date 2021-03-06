/* eslint-disable no-unused-vars */
const db = require("../../reconDB");
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "antilink-enable",
  description: `Enable anti-link system!`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return;
    const ayumu = message.guild.me;
    if (!ayumu.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return message.channel.send({content: `I do not have manage_messages permission!`});

    if ((await db.has(`link-${message.guild.id}`)) === false) {
      await db.set(`link-${message.guild.id}`, true);
      message.channel.send({content: `Enabled antilink system!`});
    } else
      return message.channel.send({
        content: "Antilink system is already enabled for this server.",
      });
  },
};
