const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const confing = require('../../config.json')
module.exports = {
    name: 'reset-chat-bot',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        const chatbotchannel = db.fetch(`chatbotchannel_${message.guild.id}`)
        if(chatbotchannel === null) return message.reply(`${message.guild.name} Has\'nt setup the chat bot yet! ;C`)
        else if(chatbotchannel !== null) {
            message.reply(`Removed the chat bot`)
            db.delete(`chatbotchannel_${message.guild.id}`, channelbotchannel)
        }
    }
}