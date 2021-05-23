const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'play',
    aliases: ['pla', 'p', 'ts'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${config.femoji} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${config.femoji} - You are not in the same voice channel !`);

        if (!args[0]) return message.channel.send(`${config.femoji} - Please give me a song!`);

        client.player.play(message, args.join(" "), { firstResult: true });

        message.channel.send(`🎵 Started Playing!`)
    }
}