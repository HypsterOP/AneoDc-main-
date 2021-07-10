/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const db = require("../../reconDB");
module.exports = {
  name: "autorole-remove",
  aliases: ["auto-remove"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return;
      const check = await db.has(`autorole-${message.guild.id}`);
      if (check === false)
        return message.reply({content: `This role doesn't have any auto-role setup`});
      const role = await db.get(`autorole-${message.guild.id}`);
      db.delete(role);
      message.reply({content: `Removed the role!`});
    } catch (e) {
      return message.channel.send({content: `An error has occured: ${e.stack}`});
    }
  },
};
