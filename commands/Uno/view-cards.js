const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'view-cards',
    aliases: ['vcc'],
    description: 'View your cards',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.viewCards(message);
    }
}