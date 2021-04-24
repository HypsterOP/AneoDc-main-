const { Client, Message, MessageEmbed } = require('discord.js');
const TicketData =  require("../../models/TicketData")
const config = require("../../config.json")
module.exports = {
    name: 'ticket-setup',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let ticketData = TicketData.findOne({ GuildID: message.guild.id });
        if(!message.member.hasPermission("MANAGE_GUILD"))return message.channel.send(`You are missing permissions ${config.femoji}`)
        
    }
}