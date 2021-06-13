const client = require('../index');
client.slash = require("../utils/slash-commands")
const dc = require('discord.js')
const path = require('path');
const chalk = require("chalk")
const ms = require('ms');
const Schema = require('../models/member-count');
const Topgg = require('@top-gg/sdk')
const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxMTI2NTE5NTE4Njk3ODgyOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjIyMjY3NDI4fQ.7SRva33Av2xaB1_jZ4PSaedpYn_H9rzsO52EKjucvds')
const WokCommands = require('wokcommands');
// https://discord.com/api/webhooks/847787309877559306/UrTB3GsKzJq6PIo7WZIISZKNvCYJ8u3OQBp2CEB9q14G5z5CZoNXgCXMYUEboWzZBXtj
const Schema1 = require('../models/blacklist-word');
const { BlacklistedWords } = require('../Collection');
const guildId = '814117890701787157';
const quick = require('quick.db');
client.on('ready', () => {
client.manager.init(client.user.id)
setInterval(() => {
	api.postStats({
		serverCount: client.guilds.cache.size,
		shardId: client.shard.ids[0],
		shardCount: client.options.shardCount
	})
}, 1800000)

	new WokCommands(client, {
		commandsDir: 'command',
		testServers: [guildId],
		showWarns: false,
	});


	console.log('------------------------------------------------')
	console.log(chalk.blue(`[CLIENT] ${client.user.username} is Ready!`))
	console.log(chalk.red(`[SHARD] Shards ${client.options.shardCount}`))
	console.log(chalk.green(`[CHANNELS] Connected to ${client.channels.cache.size} Channels`))
	console.log(chalk.yellowBright(`[SERVERS] Listening to ${client.guilds.cache.size} Servers`))
	console.log('------------------------------------------------')


	Schema1.find().then((data) => {
		data.forEach((val) => {
			BlacklistedWords.set(val.Guild, val.Words);
		});
	});

	client.ws.on('INTERACTION_CREATE', async (interaction) => {
		client.slash.commandsrun(interaction, client);
		 }) 

	client.user.setPresence({
		status: 'online',
		activity: {
			name: `h!help | ${client.guilds.cache.size} Servers`,
			type: 'WATCHING',
		},
	});
});
