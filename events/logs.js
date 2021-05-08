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
    .setTitle(`A new channel was create`)
    .setDescription(`Channel: ${channel.name}`)
    .setColor('RANDOM')

    channe.send(channelCreateEmbed)
    })
})