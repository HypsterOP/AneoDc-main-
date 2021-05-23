const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'resume',
    aliases: ['res'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${config.femoji} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${config.femoji} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${config.femoji} - No music currently playing !`);

        if (!client.player.getQueue(message).paused) return message.channel.send(`${config.femoji} - The music is already playing !`);

        const success = client.player.resume(message);

        if (success) message.channel.send(`${config.semoji} - Song ${client.player.getQueue(message).playing.title} resumed !`);
    }
}