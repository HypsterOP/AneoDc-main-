const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'roles',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!member) return message.channel.send('Please mention a member.')

    const memberRoles = member.roles.cache
        .filter((roles) => roles.id !== message.guild.id)
        .map((role) => role.toString());

    message.channel.send(
        new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`${member}'s roles <:Hype_Role:821003023835987998> ${memberRoles}`)
        .setColor('BLUE')
    )
  }
}