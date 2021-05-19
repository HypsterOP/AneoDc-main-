const db = require("../../reconDB")
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'antilink-disable',
    description: `Disable anti-link system!`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        const aneo = message.guild.me;
        if(!aneo.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`I do not have manage_messages permission!`)

        if(await db.has(`link-${message.guild.id}`) === true) {

            await db.delete(`link-${message.guild.id}`)
            message.channel.send(`Disabled anti-link!`)

        } else return message.channel.send('Antilink system is already disabled for this server.')
    }
}