const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'nuke',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You cannot nuke a channel.')
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('I need manage channels permission!')

    message.channel.clone().then((ch) => {
        ch.setParent(message.channel.parent.id);
        ch.setPosition(message.channel.position);
        message.channel.delete()

        ch.send('This channel has been nuked! https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831')
    })
  }
}