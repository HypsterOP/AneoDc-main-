const {
	Client,
	Message,
	MessageEmbed,
	MessageAttachment,
} = require('discord.js');
const nsfw = require('discord-nsfw');
const topgg = require(`top.gg-core`);
const top = new topgg.Client(
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxMTI2NTE5NTE4Njk3ODgyOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjIyMjY3NDI4fQ.7SRva33Av2xaB1_jZ4PSaedpYn_H9rzsO52EKjucvds'
);
const anal = new nsfw();
module.exports = {
	name: 'boobs',
	aliases: ['bobs'],
	description: 'boobs?',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
        if(!message.channel.nsfw) return message.reply(`❌ | This is not an nsfw channel smh!`)
		if (!top.isVoted(message.author.id)) {
		 return message.channel.send(
			`Nsfw commands are only available to voters on top.gg , Link to vote - https://top.gg/bot/811265195186978828/vote`
		);
        } else if (top.isVoted(message.author.id)) {
		 const image = await anal.boobs();
		message.channel.send(new MessageAttachment(image, 'boobs.png'));
	}
},
}