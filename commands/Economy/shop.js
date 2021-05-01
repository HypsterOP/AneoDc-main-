const { Client, Message, MessageEmbed } = require('discord.js');
const items = require("../../shopItems")
module.exports = {
    name: 'shop',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(items.length === 0) return message.reply("The shop is closed!")

        const shopList = items
        .map((value, index) => {
            return `**${index+1})** ${value.item} | ${value.price} Coins`
        });

        message.channel.send(
            new MessageEmbed()
            .setTitle(`Item Shop`)
            .setDescription(shopList)
        )
    }
}