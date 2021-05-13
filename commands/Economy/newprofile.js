const db = require("quick.db")
const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'newprofile',
    description: 'Create a Profile today for economy!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profiles = new db.table("profiles")

        const userProfile = profiles.get(`profiles_${message.author.id}`)

        if(userProfile) return message.reply(`${config.femoji} | You already have a profile!`)

        message.channel.send(`What should you profile name be type it below!`)
        
        const filter = (user) => {
            return user.author.id === message.author.id
        }

        message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const name = collected.first().content
                const regex = !/[^a-zA-Z0-9 ]+/g.test(name)

                if(!regex) return message.channel.send("Name can contain only letters and numbers!")

                profiles.set(`profiles_${message.author.id}.name`, name)

                return message.channel.send(`Created your profile with the name *${name}*! ${config.semoji}`)
            })
            .catch(() => {
                return message.channel.send(`Time ended! Please try again! ${config.femoji}`)
            })
    }
}