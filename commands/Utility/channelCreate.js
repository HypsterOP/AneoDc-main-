const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'create-channel',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
    if(!message.member.permissions.has('MANAGE_CHANNELS')) return;

    const channelNameQuery = args.join(" ");
    if(!channelNameQuery) return message.reply('Please tell me the name of the new channel!')

    message.guild.channels.create(channelNameQuery)
    .then(ch => {
        message.channel.send(`Created ${ch} channel!`)
    })
  } catch {
    return message.channel.send(`An error has occured i maybe do not have permissions, please try again later..`)
  }
  }
}