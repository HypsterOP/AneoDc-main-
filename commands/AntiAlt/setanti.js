const db2 = require('quick.db')
const discord = require('discord.js')
const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'anti-alt',
    category: "Anti-Alt",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        let option = args[0]
        if(!option) {
            const embed = new discord.MessageEmbed()
            .setAuthor("Options for anti alt system")
            .setDescription("`enable` To turn on the anti-alt system\n`disable` To turn off the anti-alt system")
            .setColor('RED')
            return message.channel.send(embed)
        }

        let logsChannel = message.mentions.channels.first()
        let database = db2.get(`antialt.${message.guild.id}`)

        if(option.toLowerCase() === 'enable') {
            if(database) {
                return message.channel.send("This server already has anti-alt system enabled.")
            }
            let days = args[2]
            if(!logsChannel) {
                return message.channel.send("Please mention the channel which should be set as the logs channel for the alt detection!")
            }
            if(!days) {
                return message.channel.send("Please tell me the minimum age/days requirement of the account")
            }
            if(isNaN(days)) {
                return message.channel.send("Days must be a number")
            }

            db2.set(`antialt.${message.guild.id}`, logsChannel)
            db2.set(`altdays.${message.guild.id}`, days)
            const embed = new MessageEmbed()
            .setAuthor("Enabled Anti Alt System for this server")
            .setColor('GREEN')
            .setDescription(`${message.author.tag} has enabled the anti-alt system!`)
            .setTimestamp()
            return message.channel.send(embed)
        } else if(option.toLowerCase() === 'disable') {
            if(!database) {
                return message.channel.send("This server does not have the anti-alt system enabled.");
            }

            db2.delete(`antialt.${message.guild.id}`)
            db2.delete(`altdays.${message.guild.id}`)
            
            const embed = new MessageEmbed()
            .setAuthor("Anti Alt System disabled")
            .setColor('RANDOM')
            .setDescription(`${message.author.tag} has disabled anti alt system.`)
            .setTimestamp()
            return message.channel.send(embed)
           
        }
    },
};