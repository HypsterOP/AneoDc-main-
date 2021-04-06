const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'shop',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle("Items available for buying :")
        .setDescription(`Sword`)
        .setFooter(`More items will be added`)

        message.channel.send(embed)
    }
}