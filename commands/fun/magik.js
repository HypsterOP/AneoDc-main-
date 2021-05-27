const {
	Client,
	Message,
	MessageEmbed,
	MessageAttachment,
} = require('discord.js');
const Ame = require('amethyste-api');
require('dotenv').config();
const AmeClient = new Ame(process.env.AME);
module.exports = {
	name: 'magik',
	description: 'Nice magik bro',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const user = message.mentions.users.first() || message.author;

        const buffer = await AmeClient.generate("magik", { url: user.displayAvatarURL({ format: "png", size: 512 }) });
		message.channel
			.send(`Generating.....`)
			.then((msg) => msg.delete({ timeout: 1000 }));

		const attach = new MessageAttachment(buffer, 'magik.png');

		message.channel.send(attach);
	},
};
