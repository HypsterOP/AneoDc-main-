const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../models/Interantionnal-chat');
module.exports = {
	name: 'list',
	aliases: ['l'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		db.find({ Activated: true }, async (err, data) => {
			if (!data) return;
			const map = data
				.map(({ Guild, Channel, Author }) => {
					return `${client.channels.cache.get(Channel)} in ${
						client.guilds.cache.get(Guild).name
					} added by ${client.users.cache.get(Author)}`;
				})
				.join('\n');

			const embed = new MessageEmbed()
				.setTitle(`List of international Chat-Channels`)
				.setDescription(map)
				.setColor('RANDOM');

			message.channel.send(embed);
		});
	},
};
