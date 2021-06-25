const client = require('../index');
const { Collection, MessageEmbed } = require('discord.js');
const blacklist = require('../models/blacklist');
const mongoose = require('mongoose');
const schema = require('../models/custom-commands');
const db = require('../reconDB');
const db2 = require('quick.db');
const ms = require('ms');
const quick = client.db;
const levelSchema = require('../models/level');
const Levels = require('discord-xp');
require('dotenv').config();
Levels.setURL(process.env.MONGO_BOT);

const Timeout = new Collection();

client.on('message', async (message) => {
	if (message.author.bot) return;
	const p = await client.prefix(message);
	if (message.mentions.users.first()) {
		if (message.mentions.users.first().id === '813356831002198026')
			return message.channel.send(
				new MessageEmbed()
					.setTitle(`<:status_online:843174802683592714> Hello there!`)
					.setDescription(
						`My prefix in ${message.guild.name} is ${p}\nUse ${p}help to get started!\n[Invite](https://dsc.gg/aneo)・[Support Server](https://discord.gg/kR27E5WaQG)`
					)
					.setThumbnail(client.user.displayAvatarURL())
					.setColor('RANDOM')
					.setFooter(`Thank you for using me!`)
			);

		await levelSchema.findOne(
			{ Guild: message.guild.id },
			async (err, data) => {
				if (!data) return;
				const randomXp = Math.floor(Math.random() * 98) + 1;
				const hasLeveledUp = await Levels.appendXp(
					message.author.id,
					message.guild.id,
					randomXp
				);
				if (hasLeveledUp) {
					const user = await Levels.fetch(message.author.id, message.guild.id);
					message.channel.send(
						`Congrats ${message.author.username}, You just leveled up to level ${user.level}!`
					).then(msg => msg.delete({ timeout: 10000 }));
				}
			}
		);
	}
	if (!message.content.startsWith(p)) return;
	if (!message.content.startsWith(p)) return;
	blacklist.findOne({ id: message.author.id }, async (err, data) => {
		if (err) throw err;
		if (!data) {
			if (!message.guild) return;
			if (!message.member)
				message.member = await message.guild.fetchMember(message);
			const args = message.content.slice(p.length).trim().split(/ +/g);
			const cmd = args.shift().toLowerCase();
			if (cmd.length == 0) return;
			const data = await schema.findOne({
				Guild: message.guild.id,
				Command: cmd,
			});
			if (data) message.channel.send(data.Response);
			let command = client.commands.get(cmd);
			if (!command) command = client.commands.get(client.aliases.get(cmd));
			if (command) command.run(client, message, args, quick);
		} else {
			message.channel.send(
				'You are blacklisted! Try contacting the developer in support server you will find the link of server here - https://aneo.ml'
			);
		}
	});
});
