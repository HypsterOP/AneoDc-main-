const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'guilds',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== '800331322089537538') return;
        message.channel.send(`Hello Hypster, Im in ${client.guilds.cache.size} servers`)
    },
};