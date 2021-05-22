const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'volume',
    aliases: ['vol'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${config.femoji} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${config.femoji} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${config.femoji} - No music currently playing !`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${config.femoji} - Please enter a valid number !`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${config.femoji} - Please enter a valid number (between 1 and 100) !`);

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`${config.semoji} - Volume set to **${parseInt(args[0])}%** !`);
    }
}