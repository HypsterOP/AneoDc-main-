const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bal',
    aliases: ['balance','cash','money','coin','coins'],
    description: 'Check your balance',
    category: 'money',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member

        const bal = await client.bal(member.id);
        message.channel.send(
            new MessageEmbed()
            .setTitle(`${member.user.tag}'s Balance`)
            .setDescription(`${member} has :  ${bal} Coins `)
            .setColor("RANDOM")
        );

    }
}