const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'debug',
    aliases: ['deb'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send(`${config.semoji} : ${client.user.username} Connected to ${client.voice.connections.size} Voice Channels!`)
    }
}