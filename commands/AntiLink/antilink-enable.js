const db = require("../../reconDB")

const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'antilink-enable',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_GUILD")) return;
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I do not have permission to delete messages.')

        if(await db.has(`antilink-${message.guild.id}`) === false) {
            await db.set(`antilink-${message.guild.id}`, true)
            message.channel.send(`Anti-Link has been enabled`)

        } else return message.channel.send("Anti-Link has already been turned on!")
    }
}