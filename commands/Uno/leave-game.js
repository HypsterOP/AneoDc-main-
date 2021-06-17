const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leave-game',
    aliases: ['lg'],
    description: 'Leave a uno game',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.removeUser(message);
    }
}