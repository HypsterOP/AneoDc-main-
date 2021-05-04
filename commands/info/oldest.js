const { Client, Message, MessageEmbed } = require('discord.js');
const { formatDate } = require("../../functions")
module.exports = {
    name: 'oldest',
    description: "Find for the oldest member's account creation date in a server!",
    aliases: ['old'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.guild.members.cache.filter(m => !m.user.bot).sort((a, b) => a.user.createdAt - b.user.createdAt).first()
        const fackEmbed = new  MessageEmbed()
        .setTitle(`Oldest member in ${message.guild.name}`)
        .setColor("RANDOM")
        .setFooter("Date Format is MM/DD/YY")
        .setDescription(`${member.user} is the oldest member in this server!\nAccount created at ${formatDate(member.user.createdAt)}`)
        message.channel.send(fackEmbed)
    }
}