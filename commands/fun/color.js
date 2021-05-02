const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")
module.exports = {
    name: 'color',
    aliases: ['co'],
    usage: "h!color color_name_or_hexcode",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const color = args[0];
        if(!color) return message.reply(`Please enter a color, Example h!color red or h!color #000000`)

        const img = Canvas.color(color, false, 2048, 2048);
        
        const attachment = new MessageAttachment(img, "color.png");

        message.channel.send(attachment);
    }
}