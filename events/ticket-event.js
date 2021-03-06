const TicketData = require('../models/TicketData');
const cooldown = new Set();
const client = require('../index')
const {
	MessageEmbed,
	MessageCollector
} = require('discord.js');
	client.on('messageReactionAdd', async(reaction, user) => {

	if (user.bot) return;

	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if (!reaction.message.guild) return;

	const data = await TicketData.findOne({
		GuildID: reaction.message.guild.id
	});
	if (!data) return;
	if (reaction.message.partial) await reaction.message.fetch();

	if (reaction.emoji.name === '🎟' && reaction.message.id === data.MessageID) {
		if (cooldown.has(user.id)) {
			reaction.users.remove(user.id);
			return;
		}
		data.TicketNumber += 1;
		await data.save();
		const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {
			type: 'text',
			permissionOverwrites: [{
				id: reaction.message.guild.id,
				deny: ['VIEW_CHANNEL'],
			},],
		});
		await channel.permissionOverwrites.edit(user, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			SEND_TTS_MESSAGES: false
		});
		await channel.permissionOverwrites.edit(data.WhitelistedRole, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			SEND_TTS_MESSAGES: false
		});
		reaction.users.remove(user.id);
		const successEmbed = new MessageEmbed()
			.setTitle(`Ticket #${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
			.setDescription(`Ticket created by: ${user.toString()}. Support Will be with you soon\nType \`done\` when you're finished.`)
			.setColor('BLUE');
		let successMsg = await channel.send({
			content: `${user.toString()}`,
			embeds: [successEmbed]
		});
		await cooldown.add(user.id);
		await checkIfClose(client, reaction, user, successMsg, channel);
		setTimeout(function () {
			cooldown.delete(user.id);
		}, 300000);
	}
})

async function checkIfClose(client, reaction, user, successMsg, channel) {
	const filter = m => m.content.toLowerCase() === 'done'
	const collector = new MessageCollector(channel, filter);

	collector.on('collect', async msg => {
		channel.send(`This ticket will be deleted in **10** seconds.`);
		await collector.stop();
		setTimeout(function () {
			channel.delete();
		}, 10000);
	});
}