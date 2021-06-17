const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'view-winners',
    aliases: ['vw'],
    description: 'View the uno game winners',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.viewWinners(message);
    }
}