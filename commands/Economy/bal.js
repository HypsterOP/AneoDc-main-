const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'balance',
    aliases: ["bal", "money", "cash"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;


        const bal = await client.bal(member.id);
        let embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s Balance`)
        .setDescription("Coins: " + bal)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
}