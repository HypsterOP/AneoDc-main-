const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'volume',
    aliases: ['v','vol'],
    description: 'Adjust the volume of the current song playing.',
    usage: '<number>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
const player = message.client.manager.get(message.guild.id);
  
      if (!player) return message.reply("There is no player for this guild.");
      if (!args.length) return message.reply(`The player volume is \`${player.volume}\`.`)
  
      const { channel } = message.member.voice;
      
      if (!channel) return message.reply("You need to join a voice channel.");
      if (channel.id !== player.voiceChannel) return message.reply("You're not in the same voice channel.");
  
      const volume = Number(args[0]);
      
      if (!volume || volume < 1 || volume > 100) return message.reply("You need to give me a volume between 1 and 100.");
  
      player.setVolume(volume);
      return message.reply(`Player volume set to \`${volume}\`.`);
    }
}