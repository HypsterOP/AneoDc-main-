const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord')
module.exports = {
    name: 'facepalm',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const ava = user.displayAvatarURL({ format: "png" })

        const facepalm = await Canvas.facepalm(ava)

        message.channel.send(
            new MessageAttachment(facepalm, "facepalm.png")
        )
    }
}