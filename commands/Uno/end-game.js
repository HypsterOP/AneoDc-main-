const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'end-game',
    aliases: ['eg'],
    description: 'End a uno game',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.endGame(message);
    }
}