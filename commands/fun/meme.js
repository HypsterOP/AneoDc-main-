const axios = require('axios');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'meme',
	aliases: ['me'],
	description: 'Shows memes',
	usage: '',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		let data = await axios
			.get(`https://api.hypsterisgod.repl.co/meme`)
			.then((res) =>
				message.channel.send(
					new MessageEmbed()
						.setTitle(res.data.response.title)
						.setURL(res.data.response.url)
						.setImage(res.data.response.url)
						.setColor(`RANDOM`)
				)
			);
	},
};
