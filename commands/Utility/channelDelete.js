/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "delete-channel",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
        return;
      const channelTarget = message.mentions.channels.first();

      if (!channelTarget) {
        return message.channel.send(`Please mention a channel!`);
      }

      channelTarget.delete().then((ch) => {
        message.author.send({content: `Channel has been deleted. `});
      });
    } catch (e) {
      return message.channel.send({content:
        `An error has occured maybe i do not have permissions.`
      }
      );
    }
  },
};
