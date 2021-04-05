const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'bal',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.users.first() || message.author;

        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
        if(bal === null) bal = 0;

        message.channel.send(
            new MessageEmbed()
            .setAuthor(message.author.tag)
            .setDescription(`${user} Currently has ${bal} <:aneocoin:828621697174208532> coins`)
            .setColor("RANDOM")
        )
    }
}