const { Collection, Client, Discord, MessageEmbed } = require('discord.js');
const fs = require('fs');
const afk = new Collection();
const db2 = require('quick.db');
const alt = require('discord-anti-alt');
const coinsSchemaa = require('./models/Economy');
const moment = require('moment')
module.exports = afk;
const client = new Client({
	disableEveryone: true,
	partials: ['CHANNEL', 'MESSAGE', 'GUILD_MEMBER', 'REACTION', 'USER'],
});
require('dotenv').config();
require('discord-reply');
require('discord-buttons')(client);
module.exports = client;
const mongoose = require('mongoose');

mongoose
	.connect(process.env.MONGO_BOT, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(console.log('Connected to mongo db'));

require('./logger')(client);

const blacklist = require('./models/blacklist');
const prefixSchema = require('./models/prefix');
const altSchema = require('./models/alt');
const altlog = require('./models/alt-logs');
const reactionSchema = require('./models/reaction-roles')

const { Database } = require('quickmongo');

const db21 = new Database(process.env.MONGO_BOT);

db21.on('ready', () => {
	console.log('Connected to quick mongo db');
});

client.db = db21;


const config = require('./config.json');

const clientID = config.clientID
const clientSecret = config.clientSecret

const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify')

const stringlength = 69;

client.manager = new Manager({
	plugins: [
		new Spotify({
			clientID,
			clientSecret,
		}),
	],

	nodes: [
		{
			host: config.host,
			port: config.port,
			password: config.password,
			retryDelay: 5000,
		},
	],

	send: (id, payload) => {
		const guild = client.guilds.cache.get(id);
		if (guild) guild.shard.send(payload);
	},
}).on('nodeConnect', (node) => {
	            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + `Node connected: `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node connected: `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + ` { ${node.options.identifier} } `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
})
.on('nodeError', (node) => {
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightRed)
            console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
            console.log(`     ┃ `.bold.brightRed + `Node reconnected: `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightRed)
            console.log(`     ┃ `.bold.brightRed + ` { ${node.options.identifier} } `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightRed)
            console.log(`     ┃ `.bold.brightRed + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightRed)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightRed)
        })

.on('nodeReconnect', (node) => {
	 console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightYellow)
            console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightYellow)
            console.log(`     ┃ `.bold.brightYellow + `Node reconnected: `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightYellow)
            console.log(`     ┃ `.bold.brightYellow + ` { ${node.options.identifier} } `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightYellow)
            console.log(`     ┃ `.bold.brightYellow + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightYellow)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightYellow)
})
.on('nodeDisconnect', (node) => {
	console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightMagenta)
            console.log(`     ┃ `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightMagenta)
            console.log(`     ┃ `.bold.brightMagenta + `Node reconnected: `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node reconnected: `.length) + "┃".bold.brightMagenta)
            console.log(`     ┃ `.bold.brightMagenta + ` { ${node.options.identifier} } `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightMagenta)
            console.log(`     ┃ `.bold.brightMagenta + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightMagenta)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightMagenta)
})

.on('nodeCreate', (node) => {
	            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + `Node created: `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Node created: `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + ` { ${node.options.identifier} } `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` { ${node.options.identifier} } `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
})
.on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(` 🎵 | Now Playing`, client.user.displayAvatarURL({
      dynamic: true
    }))
    .setDescription(`[${track.title}](${track.uri})`)
    .addField(`Requested By : `,`${track.requester}` , true)
  
    channel.send(embed);
  })

  .on("trackStuck", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`Track Stuck:`, client.user.displayAvatarURL({
      dynamic: true
    }))
    .setDescription(`${track.title}`)
   
    channel.send(embed);
  })

  .on("queueEnd", player => {
    const channel = client.channels.cache.get(player.textChannel);
    const embed2 = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`Queue has ended`, client.user.displayAvatarURL({
      dynamic: true
    }))
 
    channel.send(embed2);
    player.destroy();
  });

  client.on('raw', (d) => client.manager.updateVoiceState(d));

  const { DiscordUNO } = require('discord-uno')
  const discordUNO = new DiscordUNO()

  client.uno = discordUNO

const prefix = config.prefix;
const reconDB = require('./reconDB');
const db = require('./reconDB');
client.commands = new Collection();
client.aliases = new Collection();
client.config = config;

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
	storage: './give.json',
	updateCountdownEvery: 5000,
	default: {
		botsCanWin: false,
		embedColor: '#ADD8E6',
		reaction: '🎉',
	},
});

const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

const blacklistedWords = new Collection();
client.categories = fs.readdirSync('./commands/');
['command', 'distube-handler'].forEach((handler) => {
	require(`./handlers/${handler}`)(client);

	/**
	 * @param {Client} client
	 */
	client.prefix = async function (message) {
		let custom;

		const data = await prefixSchema
			.findOne({ Guild: message.guild.id })
			.catch((err) => console.log(err));

		if (data) {
			custom = data.Prefix;
		} else {
			custom = prefix;
		}
		return custom;
	};
});

client.bal = (id) =>
	new Promise(async (ful) => {
		const data = await coinsSchemaa.findOne({ id });
		if (!data) return ful(0);
		ful(data.coins);
	});

client.add = (id, coins) => {
	coinsSchemaa.findOne({ id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.coins += coins;
		} else {
			data = new coinsSchemaa({ id, coins });
		}
		data.save();
	});
};

client.rmv = (id, coins) => {
	coinsSchemaa.findOne({ id }, async (err, data) => {
		if (err) throw err;
		if (data) {
			data.coins -= coins;
		} else {
			data = new coinsSchemaa({ id, coins });
		}
		data.save();
	});
};

client.error = config.femoji
client.yes = config.semoji
client.loading = '<a:loading:850070616819368016>'

client.snipes = new Map();
client.on('messageDelete', function (message, channel) {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author,
		image: message.attachments.first()
			? message.attachments.first().proxyURL
			: null,
	});
});

module.exports = client;
//-------------------DEBUG AND WARN------------------------//
const chalk = require('chalk')
client.on('warn', console.error)
client.on('debug', console.error)

//------------=----DEBUG AND WARN END-------------------//

let antiPingSchema = require('./models/anti-ping')

client.on('message', async message => {
	if(!message.guild) return;
	if(message.author.id == client.user.id) return;
	if(message.content.length == 0) return;
	const spilittedMsg = message.content.split("")
	const reason = "Anti-Ping System"
	let deleting = false;
	antiPingSchema.findOne({ Guild: message.guild.id }, async(err,data1) => {
	  if(data1) {
		const member = message.mentions.members.first()
		if(member) {
		  if(data1.Member.includes(member.id)) {
			message.channel.send(new MessageEmbed().setDescription(`**<:aneoError:842630488064917525> You can't ping \`${member.user.tag}\`**`).setColor("ORANGE"))
		  message.delete()
		  }
		}
	  }
	})
  })

client.on('guildDelete', async (guild) => {
	const customCmdns = require('./models/custom-commands')
	const ticketData = require('./models/TicketData')
	client.channels.cache.get('838741267227475978').send(
        new MessageEmbed()
        .setTitle('Removed from a server')
        .addField('Guild Info', `${guild.name} (${guild.id}) **${guild.memberCount} members!**`)
        .addField('Owner Info', `${guild.owner} (${guild.owner.id})`)
        .setFooter(`Currently in ${client.guilds.cache.size} guilds!`)
        .setTimestamp()
        .setColor('RANDOM')
    )
	prefixSchema
		.findOneAndDelete({ Guild: guild.id })
		.then(console.log(`i got kicked or banned from ${guild.name}, deleted prefix database for that server yikes`));
	altlog
		.findOneAndDelete({ Guild: guild.id })
		.then(console.log(`i got kicked or banned from ${guild.name}, delete alt log `))
	altSchema	
		.findOneAndDelete({ Guild: guild.id })
		.then(console.log(`i got kicked or banned from ${guild.name}, so deleted altSchema`))
	antiPingSchema
		.findOneAndDelete({ Guild: guild.id })
		.then(console.log(`i got kicked or banned from ${guild.name}, so deleted antiPing`))
	customCmdns
		.findOneAndDelete({ Guild: guild.id })
		.then(console.log(`i got kicked or banned from ${guild.name}, so deleted custom commands`))
	ticketData
		.findOneAndDelete({ Guild: guild.id })
		.then(console.log(`i got kicked or banned from ${guild.name}, so deleted ticket data`))	
});

const { Player } = require('discord-player');

client.player = new Player(client);

const discord = require('discord.js');

client.on("messageReactionAdd", async(messageReaction, user) => {
	if(user.bot) return;
	const { message , emoji } = messageReaction;
	if(client.user.id == user.id) return;
	await reactionSchema.findOne({
	  Guild: message.guild.id,
	  Channel: message.channel.id,
	  Message: message.id,
	  Emoji: emoji
	}, async(err, data) => {
	  if(!data) return
	  const role = await message.guild.roles.cache.get(data.Role)
	  if(!role) return data.delete()
	  const member = await message.guild.members.cache.get(user.id)
	  await member.roles.add(role)
	  await member.send(new MessageEmbed().setTitle(`Role Added`).setColor("GREEN").setDescription(`You were given role 
	  \`${role.name}\` because you reacted to ${emoji}`))
	})
  })

  client.on("messageReactionRemove", async(messageReaction, user) => {
	const { message , emoji } = messageReaction;
	if(client.user.id == user.id) return;
	await reactionSchema.findOne({
	  Guild: message.guild.id,
	  Channel: message.channel.id,
	  Message: message.id,
	  Emoji: emoji
	}, async(err, data) => {
	  if(!data) return
	  const role = await message.guild.roles.cache.get(data.Role)
	  if(!role) return data.delete()
	  const member = await message.guild.members.cache.get(user.id)
	  await member.roles.remove(role)
	  await member.send(new MessageEmbed().setTitle(`Role Removed`).setColor("RED").setDescription(`You lost a role 
	  \`${role.name}\` by unreacting ${emoji}`))
	})
  })

client.on('guildMemberAdd', async (member) => {
	altSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
		if (!data) return;
		if (data.Avatar === 'Enabled')
			if (member.user.avatar === null) {
				await member
					.send(
						new MessageEmbed()
							.setTitle(`Aneo Bot Alt Detector`)
							.setDescription(
								`You were kicked from ${member.guild.name} | The bot has identified you as an alt.`
							)
							.setColor('RANDOM')
							.setTimestamp()
							.setFooter(`Aneo | The Discord Bot`)
					)
					.catch((er) => {
						member.kick('Account might be an alt!');
					});

				await member.kick('Account might be an alt!');
			}

		if (data.Days == '0') return;
		let f = Date.now() - member.user.createdAt;
		let create = Math.floor(f / 86400000);
		let AltAccAge = data.Days;
		if (create >= AltAccAge) return;
		if (create < AltAccAge) {
			await member
				.send(
					new MessageEmbed()
						.setTitle(`Aneo Bot Alt Detector`)
						.setDescription(
							`You have been kicked from ${member.guild.name} | This was because your account age is below the server's account age requirement.`
						)
						.setColor('RANDOM')
						.setFooter(`Aneo | The Discord Bot`)
						.setTimestamp()
				)
				.catch((err) => {
					member.kick('Account age is below the server requirement!');
				});

			await member.kick('Account age is below the server requirement!');
		}

		await altlog.findOne({ Guild: member.guild.id }, async (err, data1) => {
			if (!data1) return;
			const channel = member.guild.channels.cache.get(data1.Channel);
			const embed = new MessageEmbed()
				.setTitle('Aneo Bot Alt Detector')
				.setDescription(`⚠ | Alt found`)
				.addField(`Information`, [
					`Alt's Name: ${member.user.username}`,
					`Alt's Tag: ${member.user.discriminator}`,
				])
				.addField('More Information', [
					`Bot?: ${member.user.bot}`,
					`Created At: ${moment(member.user.createdTimestamp).format(
						'LT'
					)} ${moment(member.user.createdTimestamp).format('LL')}  ${moment(
						member.user.createdTimestamp
					).fromNow()}`,
					`Joined At: ${moment(member.joinedTimestamp).format('LT')} ${moment(
						member.joinedTimestamp
					).format('LL')}  ${moment(member.joinedTimestamp).fromNow()}`,
					`Avatar: ${member.user.avatar || `No Avatar`}`,
					`Minimum Age: ${data.Days} days`,
				])
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setColor('RANDOM')
				.setFooter(`Alt Kicked | Aneo`)
				.setTimestamp();
		});
	});
});

client.login(process.env.TOKEN);
