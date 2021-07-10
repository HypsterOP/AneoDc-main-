/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "create-channel",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return;

      const channelNameQuery = args.join(" ");
      if (!channelNameQuery)
        return message.reply({content: "Please tell me the name of the new channel!"});

      message.guild.channels.create(channelNameQuery).then((ch) => {
        message.channel.send({content: `Created ${ch} channel!`});
      });
    } catch {
      return message.channel.send({content:
        `An error has occured i maybe do not have permissions, please try again later.`
      }
      );
    }
  },
};
