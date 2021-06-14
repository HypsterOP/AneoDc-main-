const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")
module.exports = {
    name: 'quote',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.members.first();
        if(!user) return message.channel.send("Please mention a user!")

        let text = args.slice(1).join(" ")
        if(!text) return message.channel.send("Please provide a text!")

        let color = user.displayHexColor

        const userAvatar = user.user.displayAvatarURL({ format: 'png' })

        const img = await Canvas.quote({ image: userAvatar, message: text, username: user.user.username, color: color })

        let attachemnt = new MessageAttachment(img, "quote.png")
        message.channel.send(attachemnt)
    }
}