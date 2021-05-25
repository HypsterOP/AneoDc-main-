const client = require('../index');
client.slash = require("../utils/slash-commands")
const Dashboard = require('../src/router')
const path = require('path');
const chalk = require("chalk")
const ms = require('ms');
const Schema = require('../models/member-count');
const WokCommands = require('wokcommands');
const Schema1 = require('../models/blacklist-word');
const { BlacklistedWords } = require('../Collection');
const guildId = '814117890701787157';
const quick = require('quick.db');
client.on('ready', () => {
	new WokCommands(client, {
		commandsDir: 'command',
		testServers: [guildId],
		showWarns: false,
	});

	console.log('------------------------------------------------')
	console.log(chalk.blue(`${client.user.username} is Ready!`))
	console.log(chalk.red(`Shards ${client.shard.count}`))
	console.log(chalk.green(`Connected to ${client.channels.cache.size} Channels`))
	console.log(chalk.yellowBright(`Listening to ${client.guilds.cache.size} Servers`))
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
