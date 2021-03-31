const discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name:"uptime",
    aliases: ["up"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let days = Math.floor(client.uptime / 86400000 );
        let hours = Math.floor(client.uptime / 3600000 ) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let upembed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`My Uptime <:down_vote:825940618990583848>`)
        .addField(`Days`, `${days}`)
        .addField(`Hours`, `${hours}`)
        .addField(`Minutes`, `${minutes}`)
        .addField(`Seconds`, `${seconds}`)
        message.channel.send(upembed)
    }
}