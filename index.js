const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const afk = new Collection();
const db2 = require("quick.db")
const alt = require("discord-anti-alt")

module.exports = afk;
const client = new Client({
    disableEveryone: true,
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
})
module.exports = client;
const mongoose = require('mongoose');
const coinsSchema = require('./models/currency')

mongoose.connect('mongodb+srv://hypster:hypster@hype.otry4.mongodb.net/Data', {
    useUnifiedTopology : true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo db'))

const blacklist = require('./models/blacklist')
const prefixSchema = require('./models/prefix')


const config = require('./config.json')
const prefix = config.prefix
const reconDB = require('./reconDB');
const db = require('./reconDB');
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.config = config;

const blacklistedWords = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);


    /**
     * @param {Client} client
     */
     client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))
        
        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }
    



}); 

client.snipes = new Map()
client.on('messageDelete', function(message, channel){

  client.snipes.set(message.channel.id, {
    content: message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL: null
  })
})


module.exports = client;


client.on('guildDelete', async (guild) => {
    prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('i was kicked or banned from a server so deleted data.'))
})



const distube = require('distube');
const player = new distube(client)

player.on('playSong', (message, queue) => {
  message.channel.send(`Now playing! ${song.name}`)
});

client.player = player;


client.on('guildMemberAdd', async member => {
    const altdays = db2.get(`altdays.${member.guild.id}`)
    const altchannel = db2.get(`antialt.${member.guild.id}`)
    if(!altdays || !altchannel)return;



    const account = new alt.config({
        days:parseInt(altdays),
        options:'kick'
    })

    let running = account.run(member);
    let profile = alt.profile(member);
    if(running) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag,member.user.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField("Account's Age: ",profile.userAge,true)
        .addField("Minimum Age required: ",altdays,true)
        .addField("Account was created at: ",profile.date.userDateCreated,true)
        return member.guild.channels.cache.get(altchannel).send(embed)
    }
})

client.login(token)
