const { Client, Message, MessageEmbed } = require('discord.js');
const db = require(`quick.db`)
module.exports = {
    name: 'balance',
    aliases: ["bal", "b"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author;
        let money = db.fetch(`money__${user.id}`)

        if(money === null) money = 0;

        message.channel.send(
            new MessageEmbed()
            .setAuthor(`${user.tag}'s Balance`)
            .setDescription(`${user} Has ${money} <:aneocoin:828621697174208532> coins`)
            .setColor("GREEN")
        )
    }
}