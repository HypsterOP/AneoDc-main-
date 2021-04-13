const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'dashboard',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send(
            new MessageEmbed()
            .setTitle(`Dashboard for this server`)
            .setDescription("Coming soon!")
        )
    }
}