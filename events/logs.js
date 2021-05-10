const client = require('../index.js'); 
const db = require("../models/mod-logs")
const { MessageEmbed } = require('discord.js'); 

client.on("guildMemberAdd", async(member) => {
    db.findOne({ guild: member.guild.id }, async(err ,data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = member.guild.channels.cache.get(ch);

        const guildMemberAddevet = new MessageEmbed()
        .setTitle(`A new member has joined ${member.guild.name}`)
        .setDescription(`Member: ${member}`)
        .setColor("RANDOM")

        channel.send(guildMemberAddevet)
    })
})

client.on("guildMemberRemove", async(member) => {
    db.findOne({ guild: member.guild.id }, async(err ,data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = member.guild.channels.cache.get(ch);

        const guildMemberremoveevt = new MessageEmbed()
        .setTitle(`A Member Has Left ${member.guild.name}`)
        .setDescription(`Member: ${member}`)
        .setColor("RANDOM")

        channel.send(guildMemberremoveevt)
    })
})

client.on("roleCreate", async(role) => {
    db.findOne({ guild: role.guild.id }, async(err ,data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = role.guild.channels.cache.get(ch);

    const roleCreateEvent = new MessageEmbed()
    .setTitle(`A new role was created`)
    .setDescription(`Role: ${role}`)
    .setColor("RANDOM")

    channel.send(roleCreateEvent)
    })
})

client.on("channelCreate", async(channel) => {
    db.findOne({ guild: channel.guild.id }, async(err ,data) => {
        if(!data) return;
        const ch = data.channel;
        const channe = channel.guild.channels.cache.get(ch);

    const channelCreateEmbed = new MessageEmbed()
    .setTitle(`A new channel was created`)
    .setDescription(`Channel: ${channel.name}`)
    .setColor('RANDOM')

    channe.send(channelCreateEmbed)
    })
})

client.on("messageUpdate", async(oldMessage, newMessage) => {
    db.findOne({ guild: oldMessage.guild.id }, async(err ,data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = oldMessage.guild.channels.cache.get(ch);

    let oldMsg= oldMessage.content;
    let newMsg = newMessage.content;

    const messageUpdateEvent = new MessageEmbed()
    .setAuthor(`${oldMessage.author.tag}`)
    .setDescription(`A message was edited!`)
    .addField(`Old Message:`, `${oldMsg}`)
    .addField(`New Message`, `${newMsg}`)
    .addField(`User:`, `${oldMessage.author.tag}`)
    .setColor("RANDOM")

    channel.send(messageUpdateEvent)
    })
})

client.on("messageDelete", async message => {
    db.findOne({ guild: message.guild.id }, async(err ,data) => {
        if(!data) return;
        const ch = data.channel;
        const channel = message.guild.channels.cache.get(ch);

    if(!message.guild) return;
    
    const fectchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: "MESSAGE_DELETE"
    });

    const deletetionlog = fectchedLogs.entries.first();

    const { executor, target } = deletetionlog;
        const embed = new MessageEmbed()
        .setTitle(`A message was deleted`)
        .setDescription(`Member: ${message.author.tag}\nMessage: ${message.content}\nChannel: ${message.channel}`)
        .addField(`Deleted By:`, `${executor.tag}`, true)
        .setColor(`RANDOM`)

        channel.send(embed)
    })
})