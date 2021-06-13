const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: ['st', 'sto'],
    description: 'stops the music',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

		const player = message.client.manager.get(message.guild.id);
		if (!player) return message.reply('There is no player for this guild.');

		const { channel } = message.member.voice;

		if (!channel) return message.reply('You need to join a voice channel.');
		if (channel.id !== player.voiceChannel)
			return message.reply("You are not in the same voice channel!");

		player.destroy();
		return message.lineReplyNoMention(`Player for ${message.guild.name} has been destroyed. Leaving the voice channel.`)
	},
};
