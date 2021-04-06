const { Client, Message, MessageEmbed } = require('discord.js');
const db = require(`quick.db`)
module.exports = {
    name: 'inventory',
    aliases: ["inv"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let items = db.get(message.author.id)
        let user = message.author || message.mentions.users.first()
        if(items === null) items = "This user has nothing"

        let embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s Inventory`)
        .setColor(`RANDOM`)
        .addField("Inventory", items)
        message.channel.send(embed)
    }
}