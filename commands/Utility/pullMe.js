const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'pull-from-vc',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
     try {
    if(!message.member.permissions.has('MANAGE_CHANNELS')) return;

    const member = message.mentions.members.first();
    if(!member) return message.channel.send('Please mention a member that you want to pull in your vc!');
    if(!member.voice.channel) return message.channel.send(`${member} is not in a voice channel!`);

    if(!message.member.voice.channel) return message.channel.send('Hey , join a voice channel before you can actually pull them');
    member.voice.setChannel(message.member.voice.channel)
    message.channel.send(`Moved ${member} to your vc!`)
     } catch (e) {
      return message.channel.send(`An error has occured: ${e.stack}`)
     }
  },
};