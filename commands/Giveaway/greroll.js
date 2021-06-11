const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'greroll',
	aliases: ['reroll'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return;

		if (!args[0]) return message.reply('You need to specify the message ID!');

		if (isNaN(args[0])) return message.reply(`Message id must be a number.`);

		let giveaway = client.giveawaysManager.giveaways.find(
			(g) => g.messageID === args[0] && g.guildID === message.guild.id
		);
		if (!giveaway)
			return message.channel.send(
				`I was not able to find a message with that id in this server.`
			);

		// reroll
		client.giveawaysManager
			.reroll(giveaway.messageID)
			.then(() => {
				// Success message
				message.channel.send('Giveaway rerolled!');
			})
			.catch((err) => message.channel.send(`That giveaway is not yet ended.`));
	},
};
