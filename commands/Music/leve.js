const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leave',
    aliases: ['disconnect', 'fuckoff', 'die', 'marja'],
    description: 'Leaves the voice channel',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	const { channel } = message.member.voice;

	if(!channel) return message.channel.send(`${client.error} You need to be in a voice channel before you can use this command.`)

	if(message.member.voice.selfDeaf) return message.channel.send(`${client.error} *You cannot use this command as you are deafend*`)

	const aneo = message.guild.me.voice.channel;

	const player = client.manager.players.get(message.guild.id);

	if(!player || !aneo) return message.channel.send(`${client.error} There is no player for this guild, or the bot is not in the voice channel.`)

	if(!player.queue || !player.queue.current) return message.channel.send(`${client.error} No music is being played.`)

	if(player && channel.id !== player.voiceChannel)
		return message.channel.send(`${client.error} You need to be in the same voice channel as ${client.user.username} to use this command.`)

	player.destroy();

	message.react(`${client.yes}`)
	return message.channel.send(`${client.yes} Successfully left your voice channel`)
    }
}