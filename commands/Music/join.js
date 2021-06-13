const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'join',
    aliases: ['joi', 'login', 'create'],
    description: 'Joins your voice channel',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	try {
		var { channel } = message.member.voice;
		if(!channel) return message.reply(
			new MessageEmbed()
			.setAuthor(`${client.error} | You are not in a voice channel.`)
		);

		var player = client.manager.players.get(message.guild.id);
		if(player){
	var vc = player.voiceChannel;
        var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);

	return message.channel.send(
		new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${client.error} | I am already playing music in another voice channel, cannot join your channel.`)
		.setDescription(`Playing Music in \`${vc ? voiceChannel ? voiceChannel.name : vc : "Error Getting Channel"}\``)
	);

	}

	player = client.manager.create({
		guild: message.guild.id,
		voiceChannel: message.member.voice.channel.id,
		textChannel: message.channel.id,
		selfDeafen: true
	});

	if (player.state !== "CONNECTED") {
		player.connect();
		player.stop();
		message.react(`${client.yes}`)
	} else {
	var vc = player.voiceChannel;
	var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);

	return message.channel.send(
		new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${client.error} | I am already in another voice channel.`)
		.setDescription(`Connected to voice channel: \`${vc ? voiceChannel ? voiceChannel.name : vc : "Error no channel"}\``)
		.setFooter(`If you the bot is not in the voice channel run the command ${await client.prefix(message)}stop to fix the issue.`)
	)
	}
	} catch (err) {

	}
    }
}