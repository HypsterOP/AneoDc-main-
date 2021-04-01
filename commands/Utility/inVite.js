const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'invite',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const inviteemebd = new MessageEmbed()
    .setTitle('Invite me')
    .setDescription(`[Click here!](https://dsc.gg/aneo)`)
    .setColor('RANDOM')
    message.channel.send(inviteemebd)
  }
}