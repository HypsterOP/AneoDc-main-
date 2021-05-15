const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'inventory',
    aliases: ['inv', 'i'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profiles = new db.table(`profiles`)

        const user = message.mentions.members.first() || message.member;

        const userProfile = profiles.get(`profiles_${user.id}`)

        if(!userProfile) return message.channel.send(`That user doesn't have a profile!`)

        const bought = profiles.get(`profiles_${user.id}.bought`)
        try {
            const items = Object.entries(bought).map(([key, value]) => {
                return `${capitalse(key)} - ${value}`
            })

            return message.channel.send(new MessageEmbed()
                .setColor('PURPLE')
                .setTitle(`${user.username}'s Inventory`)
                .setDescription(items.join("\n").toLocaleString())
            )
        } catch {
            return message.channel.send(`Users's Inventory is empty!`)
        }
    }
}

function capitalse() {
    return string.charAt(0).toUpperCase() + string.slice(1)
}