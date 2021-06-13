const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    description: 'Skips the current song',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
const player = message.client.manager.get(message.guild.id);
      if (!player) return message.reply("There is no player for this guild.");
  
      const { channel } = message.member.voice;
      if (!channel) return message.reply("You need to join a voice channel.");
      if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");

      if (!player.queue.current) return message.reply("There is no music playing.")

      const { title } = player.queue.current;

      player.stop();
      return message.reply(`${title} was skipped.`)
    }
}