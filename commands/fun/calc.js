const { Client, Message, MessageEmbed } = require('discord.js');
const { Calculator } = require('weky')
module.exports = {
    name: 'calculator',
    aliases: ['calc'],
    description: 'A calculator?',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        Calculator(message)
    }
}