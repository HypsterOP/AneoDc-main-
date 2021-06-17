const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'uno',
    aliases: [''],
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.UNO(message);
    }
}