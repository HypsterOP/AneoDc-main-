const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play-card',
    aliases: ['pc'],
    description: 'Play a card in uno',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.playCard(message);
    }
}