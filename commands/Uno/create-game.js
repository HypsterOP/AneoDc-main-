const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'creategame',
    aliases: ['cg'],
    description: 'Create a uno card game!',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	await client.uno.createGame(message)
    }
}