const fetch = require('node-fetch')
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

		let data = await fetch(`https://meme-api.herokuapp.com/gimme/memes`).then(res => 
		res.json())

		const embed = new MessageEmbed()
		embed.setTitle(data.title)
		embed.setImage(data.url)
		embed.setURL(data.postLink)
		embed.setColor('2F3136')
		embed.setFooter(data.ups+ " Upvotes | Author: " + data.author)
		embed.setTimestamp()

		message.channel.send(embed)
	},
};
