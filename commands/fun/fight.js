const { fight } = require("weky")
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'fight',
    aliases: ['f'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
        if(!user) return message.reply(`Why do u want to fight with air? Lmao | Mention a user!`)
        if(user.id === message.author.id) return message.reply(`Breh u can fight yourself`)
        const x = new fight({
            client: client,
            message: message,
            acceptMessage: `Click to fight with ${message.author.username}, ${user.username} React with ✅ to start, React with ❌ To stop the fight!`,
            challenger: message.author,
            opponent: user
        })
        x.start()
    }
}