const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const Discord = require("discord.js")
require("../../ExtendedMessage")
module.exports = {
    name: 'remove',
    aliases: ['rmm'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!require("../../config.json").owners.includes(
            message.author.id
        )) return message.lineReply(`Only the owner can run this command`)

        let user = client.users.cache.get(args[0])

        let member = db.fetch(`money_${message.author.id}`)

        if(!user) return message.lineReply(`not found`)

        if (!args[1]) {
            return message.inlineReply('Specify an amount')
        }

        let embed5 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`You have removed coins from ${user} amount- ${args[1]}`);
      
        message.channel.send(embed5)
        db.subtract(`money_${user.id}`, args[1])
    } 
}