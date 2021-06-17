const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'close-game',
    aliases: ['cg'],
    description: 'Close a uno game',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.closeGame(message);
    }
}