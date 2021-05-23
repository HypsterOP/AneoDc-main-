const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'restart',
    aliases: ["shut"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
             if(!require("../../config.json").owners.includes(
            message.author.id
        )) return message.reply(`No u`)

        message.channel.send(`Bye im killing my self :cry:`)
        process.exit(1)
        console.log(`i killed my self`)
             
   }
}