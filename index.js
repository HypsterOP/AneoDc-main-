const { Collection, Client, Discord, MessageEmbed } = require('discord.js')
const fs = require('fs')
const afk = new Collection();
const db2 = require("quick.db")
const alt = require("discord-anti-alt")
const coinsSchemaa = require("./models/Economy")
module.exports = afk;
const client = new Client({
    disableEveryone: true,
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION", "USER"],
})
require("dotenv").config()
require('discord-reply');
require('discord-buttons')
module.exports = client;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_BOT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo db'))

require("./logger")(client);

const blacklist = require('./models/blacklist')
const prefixSchema = require('./models/prefix')

const { Database } = require("quickmongo")

const db21 = new Database(process.env.MONGO_BOT)

db21.on("ready", () => {
    console.log("Connected to quick mongo db")
})

client.db = db21;



const config = require('./config.json')
const prefix = config.prefix
const reconDB = require('./reconDB');
const db = require('./reconDB');
client.commands = new Collection();
client.aliases = new Collection();
client.config = config;

const { GiveawaysManager } = require("discord-giveaways")
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./give.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#ADD8E6",
        reaction: "🎉"
    }
});

const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client)

const blacklistedWords = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);


    /**
     * @param {Client} client
     */
    client.prefix = async function (message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild: message.guild.id })
            .catch(err => console.log(err))

        if (data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }




});

client.bal = (id) => new Promise(async ful => {
    const data = await coinsSchemaa.findOne({ id });
    if (!data) return ful(0);
    ful(data.coins)
})

client.add = (id, coins) => {
    coinsSchemaa.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.coins += coins;
        } else {
            data = new coinsSchemaa({ id, coins })
        }
        data.save();
    })
}

client.rmv = (id, coins) => {
    coinsSchemaa.findOne({ id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.coins -= coins;
        } else {
            data = new coinsSchemaa({ id, coins })
        }
        data.save();
    })
}

client.snipes = new Map()
client.on('messageDelete', function (message, channel) {

    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})


module.exports = client;


client.on('guildDelete', async (guild) => {
    prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log('okokokokokoko, setting up prefix ... done!'))
})



const { Player } = require("discord-player")

client.player = new Player(client)

const discord = require("discord.js")

client.on('guildMemberAdd', async member => {
    const altdays = db2.get(`altdays.${member.guild.id}`);
    const altChannel = db2.get(`antialt.${member.guild.id}`)
    if (!altdays || !altChannel) return;

    const account = new alt.config({
        days: parseInt(altdays),
        options: 'kick'
    });

    let running = account.run(member);
    let profile = alt.profile(member);
    if (running) {
        let embed = new discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setColor("RANDOM")
            .addField("Account Age: ", profile.userAge, true)
            .addField("Age Requirement: ", altdays, true)
            .addField("Account Created", profile.date.userDateCreated, true)
            .setTimestamp()

        member.guild.channels.cache.get(altChannel).send(embed)
    }

})

client.login(process.env.TOKEN)
