const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")
module.exports = {
    name: 'slap',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user1 = message.author;
        
        const user2 = message.mentions.users.first()
        if(!user2) return message.lineReply(`You forgot to mention someone`)

        const avatar1 = user1.displayAvatarURL({ format: "png" })
        const avatar2 = user2.displayAvatarURL({ format: "png" })

        const img = await Canvas.slap(avatar1, avatar2)

        message.channel.send(
            new MessageAttachment(img, "sepia.png")
        )
    }
}