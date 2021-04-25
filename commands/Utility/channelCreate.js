const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'create-channel',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return;

    const channelNameQuery = args.join(" ");
    if(!channelNameQuery) return message.reply('Please tell me the name of the new channel!')

    message.guild.channels.create(channelNameQuery)
    .then(ch => {
        message.channel.send(`Created ${ch} channel!`)
    })
  }
}