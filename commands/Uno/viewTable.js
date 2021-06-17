const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'view-table',
    aliases: ['vt'],
    description: 'View the uno table',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.viewTable(message);
    }
}