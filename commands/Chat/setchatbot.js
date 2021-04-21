const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const confing  = require("../../config.json")
module.exports = {
    name: 'set-chatbot-channel',
    aliases: ["scc", "sc"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`${confing.femoji} Missing permissions!`)
        const channel = args[0]
        if(!channel) return message.channel.send(`${confing.femoji} Please tell me a channel!`)
        if(isNaN(parseInt(args[0]))) return message.reply("Channel id must be a number")
        const chatbotchannel = db.fetch(`chatbotchannel_${message.guild.id}`)
        if(chatbotchannel !== null) return message.reply(`The chat bot channel is already set as <#${chatbotchannel}>`)
        else if(chatbotchannel === null) {
            message.reply(`Setted the chat bot channel as <#${channel}>`)
            db.set(`chatbotchannel_${message.guild.id}`, channel)
        }
    }
}