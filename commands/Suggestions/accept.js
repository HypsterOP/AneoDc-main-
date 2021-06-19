const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'accept-suggestion',
	aliases: ['arc'],
	description: 'Accept a suggestion',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args, quick) => {
		try {
		if (!message.member.permissions.has('MANAGE_CHANNELS'))
			return message.channel.send(`You dont have permissions.`);

		let sugchannel = await quick.fetch(`suggestions_${message.guild.id}`);

		const noCh = new MessageEmbed()
			.setDescription(
				`${config.femoji} | This server hasn't setup the suggestion system`
			)
			.setColor('RANDOM');

		if (sugchannel == null) return message.channel.send(noCh);

		const rtx23 = /^(?:<@!?)?(\d+)>?$/;

		const messageID = args[0];
		if (!messageID)
			return message.lineReply(`Please give me the id of the message!`);
		const ReasonQuery = args.slice(1).join(' ');

		const number = new MessageEmbed()
			.setDescription(`${config.femoji} | That is not a message id!`)
			.setColor('RANDOM');

		const id = new MessageEmbed()
			.setDescription(`${config.femoji} | Please specify a message id`)
			.setColor('RANDOM');

		const query = new MessageEmbed()
			.setDescription(`${config.femoji} | You forgot to give me the Reason!`)
			.setColor('RANDOM');

		const success = new MessageEmbed()
			.setDescription(`${config.semoji} | Replied to the message!`)
			.setColor('RANDOM');

		const nomsg = new MessageEmbed()
			.setDescription(
				`${config.femoji} | Couldn't find a message with that id!`
			)
			.setColor('RANDOM');

		if (!messageID) return message.channel.send(id);

		if (!rtx23.test(messageID)) return message.channel.send(number);

		if (!ReasonQuery) return message.channel.send(query);

		try {
			const ssss = message.guild.channels.cache.get(sugchannel);

			const suggetEmbed = await ssss.messages
				.fetch(messageID)
				.catch((error) => {
					message.channel.send(nomsg);
				});

			const data = suggetEmbed.embeds[0];

			const ReasonEmbed = new MessageEmbed()
				.setAuthor(`${data.author.name}`, data.author.iconURL)
				.setDescription(data.description)
				.setColor('BLUE')
				.addField(`Reason from ${message.author.tag}`, ReasonQuery)
				.setFooter('Status: Accepted')
				.setTimestamp();

			suggetEmbed.edit(ReasonEmbed);

			message.channel.send(success);

			const user = await client.users.fetch((u) => u.tag === data.author.name);

			const embed = new MessageEmbed()
				.setDescription(
					`${config.semoji} | Your suggestion has been accepted! [Click Here To Jump To The Message](https://discord/channels/${sugchannel}/${messageID})`
				)
				.setColor('RANDOM')
				.setTimestamp();
		} catch (err) {
			return;
		}
	} catch (e) {
		return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
	}
	},
};
