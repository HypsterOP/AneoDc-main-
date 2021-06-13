const { Client, Message, MessageEmbed } = require('discord.js');

const levels = {
	0: 0.0,
	1: 0.5,
	2: 1.0,
	3: 2.0,
};

module.exports = {
    name: 'bassboost',
    aliases: ['bb'],
    description: 'set the bassboost filter',
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
  
      let level = "0";
      if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();
  
      const bands = new Array(3)
        .fill(null)
        .map((_, i) =>
          ({ band: i, gain: levels[level] })
        );
  
      player.setEQ(...bands);
  
      return message.reply(`Set the bassboost level to ${level}`);
    }
}