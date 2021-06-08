const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'channel-info',
	aliases: ['channelinfo', 'ci'],
	description: 'Shows the channel info',
	usage: '[#channel]',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		var channel = message.mentions.channels.first() || message.channel;

		let channelname = channel.name;

		let channelid = channel.id;

		let channeltopic = channel.topic || 'No topic';

		let channeltype = channel.type;

		let channelisnsfw = channel.nsfw || 'Not an nsfw channel';

		let channelcooldown = channel.rateLimitPerUser;

		let channelcreatedat = channel.createdAt;

		let channeltypingcount = channel.typingCount;

		let channellastmessage = channel.lastMessage.content;

		let ischannelview = channel.viewable;

		let channelpostion = channel.position;

        let msg = await message.channel.send(`${client.loading}`)

        msg.delete()

        let embed = new MessageEmbed()
        .addField(`✍ Channel Name`, channelname, true)
        .addField(`🆔 Channel Id`, channelid, true)
        .addField(`🌀 Channel Type`, channeltype, true)
        .addField(`⚙ Channel Topic`, channeltopic, true)
        .addField(`🔞 Nsfw Channel?`, channelisnsfw, true)
        .addField(`⏲ Channel Cooldown`, channelcooldown, true)
        .addField(`📅 Channel Created At`, channelcreatedat, true)
        .addField(`<a:typing:393848431413559296> Total Users typing`, channeltypingcount, true)
        .addField(`⏮ Channel Last Message`, channellastmessage, true)
        .addField(`👀 Channel Viewable?`, ischannelview, true)
        .addField(`🔢 Channel Position`, channelpostion, true)
        .setColor('RANDOM')

        await message.channel.send(embed)
	},
};
