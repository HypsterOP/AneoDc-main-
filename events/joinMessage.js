const client = require('../index')
const { MessageEmbed } = require('discord.js');
client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === 'text' && 
            !channelToSend && 
            channel.permissionsFor(guild.me).has('SEND_MESSAGES')
            ) channelToSend = channel;
    });

    if(!channelToSend) return;

    channelToSend.send(
        new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription("<:brnd_thanks:821723247187591218> Thanks For inviting me! My prefix is h! I will be more than happy to help out this server! And Please Make sure my role is at the top! If you need anymore help regarding the bot join the support server! https://discord.gg/Qmn6sGmNqU")
        .setTimestamp()
        .setFooter("Aneo Development")
    )
});