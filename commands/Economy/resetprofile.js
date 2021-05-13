const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const config = require("../../config.json")
module.exports = {
    name: 'resetprofile',
    description: 'Reset your economy profile!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profiles = new db.table(`profiles`)

        const userProfiles = profiles.get(`profiles_${message.author.id}`)

        if (userProfiles === null) return message.channel.send("You have not created your profile yet!")

        const msg = await message.channel.send(`Are you sure you want to delete your profile? React with ✅ if yes, React with ❌ if no.`)
        await msg.react('✅')
        await msg.react('❌')

        const filter = (reaction, user) => {
            return (reaction.emoji.name === '✅' || reaction.emoji.name === "❌") && user.id === message.author.id
        }

        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(reaction => {
                if(reaction.first().emoji.name === '✅') {
                    profiles.delete(`profiles_${message.author.id}`)
                    return message.channel.send(`Reset your profile! ${config.semoji}`)
                } else if (reaction.first().emoji.name === '❌') {
                    message.channel.send(`Cancelled!`)
                }
            })
            .catch(() => {
                return message.channel.send(`You ran out of time try again! ${config.femoji}`)
            })
    }
}