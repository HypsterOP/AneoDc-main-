const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'draw',
    aliases: [''],
    description: 'Draw a card',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.draw(message);
    }
}