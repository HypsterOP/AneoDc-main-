const { Client, Message, MessageEmbed } = require('discord.js');
const { afk } = require("../../Collection");
module.exports = {
    name: 'afk',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const reason = args.join(" ") || "No reason given";

        if(message.content.includes(`@`)) return;

        afk.set(message.author.id, [Date.now(), reason]);

        message.reply(`${message.author.username} I have set your afk : ${reason}`)
    }
}