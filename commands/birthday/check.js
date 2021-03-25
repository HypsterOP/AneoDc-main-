const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/birthday');

module.exports = {
    name: 'check-birthday',
    description: 'This command helps you in checking your birthday date!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        Schema.findOne({ User: user.id }, async(err, data) => {
            if(!data) return message.channel.send(`${user} has not set his birthday yet!`);
            message.channel.send(`${user}'s birthday is on ${data.Birthday} !`);
        })
    }
}