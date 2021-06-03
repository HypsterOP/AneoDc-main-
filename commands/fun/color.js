const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'color',
    aliases: ['cc'],
    description: 'Shows a color',
    usage: '<color>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let color = args[0]
        if (color.includes("#")) {
            color = args[0].split("#")[1]
        }
 const url = (`https://api.alexflipnote.dev/colour/${color}`)
 let json
        try{
            json = await fetch(url).then(res => res.json())
        }
        catch(e) {
            return message.reply('An Error Occured, Try Again Later.')
        }
if (json.description) return message.reply("Invalid color!")
 let embed = new MessageEmbed()
 .setTitle(json.name)
 .addField("Rgb(red green blue)", json.rgb, true)
 .addField("Brightness", json.brightness, true)
 .addField("Hex", json.hex, true)
 .setThumbnail(json.image)
 .setImage(json.image_gradient, true)
 .setColor(json.hex)
 message.channel.send(embed)
    }
}