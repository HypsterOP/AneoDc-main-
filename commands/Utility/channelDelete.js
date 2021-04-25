const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'delete-channel',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
        const channelTarget = message.mentions.channels.first() || message.channel;

        channelTarget.delete()
        .then(ch => {
            message.author.send(`Channel has been deleted!! `)
        })
        

  },
};
