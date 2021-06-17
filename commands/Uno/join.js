const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'join-game',
    aliases: ['jg'],
    description: 'JOin a uno game',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.addUser(message)
    }
}