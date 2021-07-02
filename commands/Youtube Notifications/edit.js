const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../../index')
let toreplace_format =  
        `**\`{videourl}\` ==> Url / Link**` + "\n" +
        `**\`{video}\` ==> Url / Link**` + "\n" +
        `**\`{url}\` ==> Url / Link**` + "\n" +
        `**\`{videotitle}\` ==> Title/Name` + "\n" +
        `**\`{name}\` ==> Title/Name` + "\n" +
        `**\`{title}\` ==> Title/Name` + "\n" +
        `**\`{videoauthorname}\` ==> Channel author name**` + "\n" +
        `**\`{authorname}\` ==> Channel author name**` + "\n" +
        `**\`{author}\` ==> Channel author name**` + "\n" +
        `**\`{creator}\` ==> Channel author name**` + "\n" +
        `**\`{creatorname}\` ==> Channel author name**` + "\n" +
        `**\`{discorduser}\` ==> ID of the Linked user**` + "\n" +
        `**\`{user}\` ==> ID of the Linked User**` + "\n" +
        `**\`{member}\` ==> Id of the Linked User**` + "\n\n" +
        `**__DEFAULT MESSAGE:__** \`\`\`${client.YTP.options.defaults.Notification}\`\`\``;
module.exports = {
    name: 'edit',
    aliases: ['change', 'adjust'],
    description: 'Change something in the notification',
    usage: ' ',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let prefix = await client.prefix(message);
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(":x: Not allowed!")
        let ChannelLink = args[0];
        let DiscordChannel = message.mentions.channels.filter(c => c.guild.id == message.guild.id).first() || message.guild.channels.cache.get(args[1]);
        let DiscordUser = message.mentions.members.filter(m => m.guild.id == message.guild.id).first()?.user || message.guild.members.cache.get(args[2])?.user;
        let Notification = args.slice(3).join(" ") || client.YTP.options.defaults.Notification;
        if(!ChannelLink || !DiscordChannel || !DiscordUser) return message.reply(`:x: Usage: \`${prefix}edit <link> <Discord Channel> <User> [Text...]\`\n\n**Replacements:**\n` + toreplace_format)
        //Edit a Channel
        client.YTP.editChannel(ChannelLink, DiscordChannel, DiscordUser, Notification)
        .then(ch =>{
            //send information message
            message.reply(`I changed the Settings for ${ch.YTchannel} (<@${ch.DiscordUser}>), posting in <#${ch.DiscordChannel}>\n\nThe Message:\n${ch.message}`).then(msg=>msg.react("👍"))
        }).catch(e=>{
            console.log(e);
            message.reply(`${e.message ? e.message : e}`, {code: "js"})
        })
    }
}