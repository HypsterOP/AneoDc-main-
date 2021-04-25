const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'nuke',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return;
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('I need manage channels permission!')

    message.channel.clone().then((ch) => {
        ch.setParent(message.channel.parent.id);
        ch.setPosition(message.channel.position);
        message.channel.delete()

        ch.send(
          new MessageEmbed()
          .setDescription(`This channel has been nuked`)
          .setImage(`http://www.coogfans.com/uploads/db5902/original/3X/1/8/1871b689d8487f292c079b619bac2a8a570f8a1f.gif`)
        )
    })
  }
}