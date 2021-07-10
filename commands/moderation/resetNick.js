/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "reset",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return;
    const member = message.mentions.members.first();

    if (!member) return message.reply({content: "Please tell me the member"});

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.channel.send({content:"You're role is not higher than the member."});

    try {
      member.setNickname(null);
      message.channel.send(`reset the nickname!`);
    } catch (err) {
      message.reply({content:
        "I do not have permission to reset " + member.toString() + " nickname!"
      }
      );
    }
  },
};
