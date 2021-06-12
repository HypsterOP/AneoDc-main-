const { Client, Message, MessageEmbed } = require('discord.js');
const { WouldYouRather } = require('weky');
module.exports = {
	name: 'wouldyourather',
	aliases: ['wyr'],
	description: 'Would you rather hm',
	usage: '',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		WouldYouRather(message);
	},
};
