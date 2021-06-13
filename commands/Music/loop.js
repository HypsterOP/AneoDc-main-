const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    aliases: ['lo'],
    description: 'Set loop mode',
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
      
      if (args.length && /queue/i.test(args[0])) {
        player.setQueueRepeat(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
        return message.reply(`${queueRepeat} queue repeat.`);
      }
  
      player.setTrackRepeat(!player.trackRepeat);
      const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
      return message.reply(`${trackRepeat} track repeat.`);
    }
}