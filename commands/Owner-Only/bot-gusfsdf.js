const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'top',
    timeout: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.author.id === "800331322089537538") return;

        const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(10);

        const description = guilds
        .map((guild, index) => {
            return `${index+1} ${guild.name} -> ${guild.memberCount} members`;
        })
        .join("\n")
        message.channel.send(
            new MessageEmbed().setTitle("sdfdsfsf").setDescription(description)
        )
    }
}