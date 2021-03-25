const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'invite',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.channel.send(
        new MessageEmbed()
        .setTitle("Invite Me!")
        .setDescription(":link: https://dsc.gg/aneo")
    )
  }
}