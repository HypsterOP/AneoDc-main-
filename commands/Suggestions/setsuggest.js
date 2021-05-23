const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const config = require("../../config.json")
module.exports = {
    name: 'setsuggest',
    aliases: ['sts'],
    /**     
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`You need **Manage Channels** permission to use this command.`)

        let ch = message.mentions.channels.first();
        
        if(!ch) return message.channel.send(`${message.author.username} Please mention a channel!`)

        if(!ch.type === "voice") return message.lineReplyNoMention(`You need to mention a text channel!`)

        await db.set(`suggestions_${message.guild.id}`, ch.id);

        const eeeeeeeem = new MessageEmbed()
        .setTitle(`${config.semoji} Success!`)
        .setDescription(`${config.semoji} Set Suggestion Channel to <#${ch.id}>`)

        return message.channel.send(eeeeeeeem)
    }
}