const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const moment = require("moment")
module.exports = {
    name: 'daily',
    aliases: ['da'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profiles = new db.table(`profiles`)

        const userProfile = profiles.get(`profiles_${message.author.id}`)

        if(!userProfile) return message.channel.send(`You do not have a profile create on by using: h!newprofile`)

        const dailyCooldown = profiles.get(`profiles_${message.author.id}.dailycooldown`)

        if (Date.now() > dailyCooldown || dailyCooldown === undefined) {
            const randomNumber = Math.floor(Math.random() * 20000) + 1;
            profiles.add(`profiles_${message.author.id}.money`, randomNumber)
            profiles.set(`profiles_${message.author.id}.dailycooldown`, Date.now() + 86400000)
            return message.channel.send(
                new MessageEmbed()
                .setTitle(`Daily Rewards`)
                .setDescription(`You have recived ${randomNumber.toLocaleString()} coins. Come back in 24 hours to claim your daily reward`)
                .setColor("RANDOM")
            )
        } else {
            return message.channel.send(`You have already claimed your daily reward, come back ${moment(dailyCooldown).fromNow()}`)
        }
    }
}