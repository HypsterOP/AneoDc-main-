const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reset",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return;
    const member = message.mentions.members.first();

    if (!member) return message.reply("Please tell me the member");

    if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send("You're role is not higher than the member.")

    try {
      member.setNickname(null);
    } catch (err) {
      message.reply(
        "I do not have permission to reset " + member.toString() + " nickname!"
      );
    }
  },
};