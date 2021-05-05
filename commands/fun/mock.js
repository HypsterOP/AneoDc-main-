const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	name: 'mock',
	aliases: ['mo'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const text = args.join("  ");
		if (!text) return message.reply('Please enter a text');

		const data = await fetch(
            `https://hypeapi.herokuapp.com/mock/${text}`
            ).then((res) => res.json());

        message.channel.send(data.response)
	},
};
