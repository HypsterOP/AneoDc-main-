const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove',
    hidden: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== "809007169210810398") return;
        const member = message.mentions.users.first() || message.member;

        client.rmv(member.id, parseInt(args[0]));

        message.channel.send("REMOVED COINS")
    }
}