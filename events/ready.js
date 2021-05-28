const client = require('../index');
client.slash = require("../utils/slash-commands")
const dc = require('discord.js')
const path = require('path');
const chalk = require("chalk")
const ms = require('ms');
const Schema = require('../models/member-count');
const WokCommands = require('wokcommands');
// https://discord.com/api/webhooks/847787309877559306/UrTB3GsKzJq6PIo7WZIISZKNvCYJ8u3OQBp2CEB9q14G5z5CZoNXgCXMYUEboWzZBXtj
const Schema1 = require('../models/blacklist-word');
const { BlacklistedWords } = require('../Collection');
const guildId = '814117890701787157';
const quick = require('quick.db');
client.on('ready', () => {

	const hook = new dc.WebhookClient('847787309877559306', 'UrTB3GsKzJq6PIo7WZIISZKNvCYJ8u3OQBp2CEB9q14G5z5CZoNXgCXMYUEboWzZBXtj')

	hook.send('<:status_online:843174802683592714> Aneo has just been restarted and is now `Online`', {
		username: client.user.username,
		avatarURL: client.user.displayAvatarURL()
	})

	new WokCommands(client, {
		commandsDir: 'command',
		testServers: [guildId],
		showWarns: false,
	});

	client.on('error', () => hook.send(`Aneo has just encountered an error, the developers are on it! Please have some patience`))

	console.log('------------------------------------------------')
	console.log(chalk.blue(`[CLIENT] ${client.user.username} is Ready!`))
	console.log(chalk.red(`[SHARD] Shards ${client.shard.count}`))
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
