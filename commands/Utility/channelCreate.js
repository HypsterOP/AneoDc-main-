const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'create',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('You do not have permission to use this command');

    const channelNameQuery = args.join(" ");
    if(!channelNameQuery) return message.reply('Please tell me the name of the new channel!')

    message.guild.channels.create(channelNameQuery)
    .then(ch => {
        message.channel.send(`Created ${ch} channel!`)
    })
  }
}