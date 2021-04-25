const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'bans',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('BAN_MEMBERS')) return;

    const fetchBans = message.guild.fetchBans();
    const bannedMembers = (await fetchBans)
    .map((member) => `\`${member.user.tag}\``)
    .join("\n");

    message.channel.send(
        new MessageEmbed()
        .setTitle(`List of banned users!`)
        .setDescription(bannedMembers)
        .setColor('RANDOM')
    )
  }
}