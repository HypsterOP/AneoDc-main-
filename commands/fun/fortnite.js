const { Client, Message, MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags')

const frclient = require('fortnite')
const fort = new frclient(process.env.FORTNITE)
module.exports = {
    name: 'fortnite',
    aliases: ['fnite', 'ft'],
    description: 'Fortnite stats and items',
    usage: '<user | store>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const platforms = ['pc', 'xbox1', 'psn']

        const lastWord = args[args.length - 1].toLowerCase();

        if(!lastWord) return message.lineReply(`You didin't prove any user`)

        let platform, username;

        if(platforms.includes(lastWord)){
            username = args.slice(0, args.length- 1).join(" ")
            platform = lastWord;
        } else {
            username = args.join(" ")
            platform = 'pc'
        }

        const search = await fort.user(username, platform)

        console.log(search)

        if(!search.username){
            return message.channel.send(`Couldn't Find anyone with that username.`)
        }

        const lifetime = search.stats.lifetime;
        const solo = search.stats.solo;
        const duo = search.stats.duo;
        const squad = search.stats.squad;

        const embed = new MessageEmbed()
        .setColor('#9d4dbb')
        .setTitle(`${search.username} (${search.platform})`)
        .setURL(search.url)
        .setFooter(`Fortnite Stats`)
        .setTimestamp()
        .addField(`Solo Stats:`, stripIndents`**-Wins:** ${solo.wins}
        **~KD:** ${solo.kd}
        **~Kills:** ${solo.kills}
        **~Kills per match:** ${solo.kills_per_match}
        **~Top 3:** ${solo.top_3}`, true)

        .addField(`Duo Stats:`, stripIndents`**-Wins:** ${duo.wins}
        **~KD:** ${duo.kd}
        **~Kills:** ${duo.kills}
        **~Kills per match:** ${duo.kills_per_match}
        **~Top 3:** ${duo.top_3}`, true)

        .addField(`Squad Stats:`, stripIndents`**-Wins:** ${squad.wins}
        **~KD:** ${squad.kd}
        **~Kills:** ${squad.kills}
        **~Kills per match:** ${squad.kills_per_match}
        **~Top 3:** ${squad.top_3}`, true)

        .addField(`Lifetime:`, stripIndents`**-Wins:** ${lifetime.wins}
        **~KD:** ${lifetime.kd}
        **~Kills:** ${lifetime.kills}
        **~Top 3:** ${lifetime.top_3}`, false)

        message.channel.send(embed)
        }
}