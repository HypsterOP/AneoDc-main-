const { Client, Message, MessageEmbed } = require('discord.js');
const { ReactionPages } = require('reconlx');
const data = require('../../models/User');
module.exports = {
	name: 'counting-leaderboard',
	aliases: ['cl'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		data.find({ Guild: message.guild.id }, async (err, data) => {
			if (err) throw err;
			const sort = data.sort((a, b) => b.Counts - a.Counts);

			let i = 1;

			if (data.length > 10) {
				const chunz = chunkz(sort, 10);
				const array = [];

				for (chunk of chunks) {
					const chunking = chunk
						.map((v) => `\`#${i++}\` <@${v.id} (${v.Counts} counts)`)
						.join('\n\n');

					array.push(
						new MessageEmbed()
							.setTitle(`Counting Leaderboard for` + message.guild.name)
							.setColor('RANDOM')
							.setDescription(chunking)
					);
				}
				ReactionPages(message, array, true);
			} else {
				const mapping = sort
					.map((v) => `\`#${i++}\` <@${v.id}> (${v.Counts} counts)`)
					.join('\n\n');

				message.channel.send(
					new MessageEmbed()
						.setTitle(`Counting Leaderboard for` + message.guild.name)
						.setColor('RANDOM')
						.setDescription(mapping)
				);
			}
		});
	},
};

function chunkz(arr, size) {
	var array = [];
	for (var i = 0; i < arr.length; i += size) {
		array.push(arr.slice(i, i + size));
	}
	return array;
}
