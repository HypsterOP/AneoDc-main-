const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'test',
    hidden: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id != "800331322089537538") return;

        message.reply("test command working hypster", { allowedMentions: 
            { 
                repliedUsers: false 
            }})
    }
}