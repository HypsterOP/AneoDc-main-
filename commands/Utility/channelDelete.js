const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'delete-channel',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
        const channelTarget = message.mentions.channels.first() || message.channel;

        channelTarget.delete()
        .then(ch => {
            message.author.send(`Channel has been deleted!! `)
        })
        
      } catch (e) {
        return message.channel.send(`An error has occured maybe i do not have permissions.`)
      }
  },
};
