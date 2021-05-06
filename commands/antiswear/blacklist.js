const { Client, Message, MessageEmbed } = require('discord.js');
const { BlacklistedWords } = require('../../Collection');
const Schema = require('../../models/blacklist-word');
module.exports = {
	name: 'blacklist-word',
	aliases: ['bl-word'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_MESSAGES')) return;

		const query = args[0]?.toLowerCase();
		const guild = { Guild: message.guild.id };
		if (query === 'add') {
			const word = args[1]?.toLowerCase();
			if (!word) return message.reply('U need to specify a word!');

			Schema.findOne(guild, async (err, data) => {
				if (data) {
					if (data.Words.includes(word))
						return message.reply(
							'That word is already there for this guild in my database'
						);
					data.Words.push(word);
					data.save();
					BlacklistedWords.get(message.guild.id).push(word);
				} else {
					new Schema({
						Guild: message.guild.id,
						Words: word,
					}).save();

					BlacklistedWords.set(message.guild.id);
				}
				message.reply(`Added ${word} as a blacklisted word`);
			});
		} else if (query === 'remove') {
			const word = args[1]?.toLowerCase();
			if (!word) return message.reply('U need to specify a word!');

			Schema.findOne(guild, async (err, data) => {
				if (!data) return message.reply(`No Words for ${message.guild.name}`);

				if (!data.Words.includes(word))
					return message.reply(`That word doesn't exist in the database!`);

				const filtered = data.Words.filter((target) => target !== word);

				await Schema.findOneAndUpdate(guild, {
					Guild: message.guild.id,
					Words: filtered,
				});
;
				BlacklistedWords.set(message.guild.id, filtered)
			});
			message.reply(`Rmemoved the word!`);
		} else if (query === 'display') {
			Schema.findOne(guild, async (err, data) => {
				if (!data) return message.reply('No data for this server');
				message.channel.send(
					new MessageEmbed()
						.setTitle(`Blacklisted Words in ${message.guild.name}`)
						.setDescription(data.Words.join(', '))
				);
			});
		} else if (query === 'collection') {
			const getBlacklistedWords = BlacklistedWords.get(message.guild.id);
			if (getBlacklistedWords)
				return message.channel.send(getBlacklistedWords, { code: 'js' });
			message.channel.send('No data');
		} else
			return message.channel.send(
				new MessageEmbed()
					.setTitle(`Query not found`)
					.setDescription(
						`Query's Avaliable - add, remove, display, collection`
					)
			);
	},
};
