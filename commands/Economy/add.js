const db = require("quick.db")
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'add',
    run: async(client, message, args) => {
        if(!require("../../config.json").owners.includes(
            message.author.id
        )) return message.reply(`Sorry this is an owner only command`);
        const profiles = new db.table('profiles')

        const member = message.mentions.users.first() || message.member

        const memberProfile = profiles.get(`profiles_${member.id}`)

        if(!memberProfile) return message.channel.send(`That user does not have an account!`)

        if(!args[1]) return message.channel.send(`You need to specify an amount`)

        if(isNaN(args[1])) return message.channel.send(`Need to specify number above 0`)

        profiles.add(`profiles_${member.id}.money`, args[1])

        return message.channel.send(`Added ${args[1].toLocaleString()}$ to ${member}`)
    }
}