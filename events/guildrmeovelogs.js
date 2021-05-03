const client = require('../index');
const { MessageEmbed } = require('discord.js')
const logsChannel = '838741267227475978';

client.on('guildRemove', (guild) => {
    client.channels.cache.get(logsChannel).send(
        new MessageEmbed()
        .setTitle('Removed from a server')
        .addField('Guild Info', `${guild.name} (${guild.id}) **${guild.memberCount} members!**`)
        .addField('Owner Info', `${guild.owner} (${guild.owner.id})`)
        .setFooter(`Currently in ${client.guilds.cache.size} guilds!`)
        .setTimestamp()
        .setColor('RANDOM')
    )
})