const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'buy',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let author = db.fetch(`money__${message.author.id}`)

        if(!args[0]) {
            message.channel.send("What are you buying? :joy:")
        }

        if(args[0] === "sword")
        if (author < 700) {
            message.channel.send("You do not have enough coins to buy a sword")
        } else {
            let items = db.fetch(message.author.id, { items: [] })
            db.push(message.author.id, "sword")
            message.channel.send("You have bought **1x Sword**")
            db.subtract(`money__${message.author.id}`, 700)
        }
    }
}