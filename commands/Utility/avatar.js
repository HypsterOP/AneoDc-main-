const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'avatar',
  aliases: ['av'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const memer = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || client.users.cache.get(args[0]);

    message.channel.send(
        new MessageEmbed()
        .setTitle(`${memer.displayName}'s Avatar`)
        .setImage(memer.user.displayAvatarURL({ dynamic: true }))
        .setColor('PURPLE')
    )
  }
}