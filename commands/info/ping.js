const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Shows the bot ping',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      return message.reply(`Hello! My ping is - \`\`${client.ws.ping}\`ms`)
    }
}