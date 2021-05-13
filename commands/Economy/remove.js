const db = require("quick.db")

const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!require("../../config.json").owners.includes(
            message.author.id
        )) return;

        const profiles = new db.table('profiles')

        const member = message.mentions.users.first() || message.member

        const memberProfile = profiles.get(`profiles_${member.id}`)

        if(!memberProfile) return message.channel.send(`That user does not have an account!`)

        if(!args[1]) return message.channel.send("You need to tell me how much money")

        if(isNaN(args[1])) return message.channel.send("not a number")

        const oldBal = profiles.get(`profiles_${member.id}.money`)

        if(oldBal - args[1] < 0 ) return message.channel.send("Cannot remove as balance will be negative")

        profiles.subtract(`profiles_${member.id}.money`, args[1])

        return message.channel.send(`Removed ${args[1].toLocaleString()}$ from ${member}`)
    }
}