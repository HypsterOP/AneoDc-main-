const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'queue',
    aliases: ['que'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${config.femoji} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${config.femoji} - You are not in the same voice channel !`);

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(`${config.femoji} - No songs currently playing !`);

        const descrip = queue.songs.map((song, id) =>
        `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
    ).join("\n")

        message.channel.send(
            new MessageEmbed()
            .setTitle(`Currently Playing Songs`)
            .setDescription(descrip)
        )
    }
}