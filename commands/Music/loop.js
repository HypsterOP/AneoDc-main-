const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'loop',
    aliases: ['lop'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${config.femoji} - You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${config.femoji} - You are not in the same voice channel !`);

        if (!client.player.getQueue(message)) return message.channel.send(`${config.femoji} - No music currently playing !`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(`${config.semoji} - Loop Mode **disabled** !`);
            } else {
                client.player.setLoopMode(message, true);
                return message.channel.send(`${config.semoji} - Loop Mode **enabled** the whole queue will be repeated endlessly !`);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(`${config.semoji} - Loop Mode **disabled** !`);
            } else {
                client.player.setRepeatMode(message, true);
                return message.channel.send(`${config.semoji} - Loop Mode **enabled** the current music will be repeated endlessly !`);
            };
        };
    }
}