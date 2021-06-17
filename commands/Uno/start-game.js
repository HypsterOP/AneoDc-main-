const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'start-game',
    aliases: ['sg'],
    description: 'Start a uno game',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.startGame(message);
    }
}