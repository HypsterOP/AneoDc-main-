const { Client, Message, MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
    name: 'vote',
    aliases: ["v", "vo"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
        let embed =  new MessageEmbed()
          .setDescription(`Click on the website button you want to vote on`)
          .setColor('RANDOM')

        let button = new MessageButton()
        .setLabel(`Top.gg`)
        .setStyle('url')
        .setEmoji('🔝')
        .setURL(`https://top.gg/bot/811265195186978828/vote`)

        let button2 = new MessageButton()
        .setLabel(`Discord bot lists`)
        .setStyle('url')
        .setEmoji('🤖')
        .setURL(`https://discordbotlist.com/bots/aneo/upvote`)

        let button3 = new MessageButton()
        .setLabel(`Void Bots`)
        .setStyle('url')
        .setEmoji('📑')
        .setURL('https://voidbots.net/bot/811265195186978828/vote')

        let row = new MessageActionRow()
        .addComponent(button)
        .addComponent(button2)
        .addComponent(button3)

        message.channel.send({ embed: embed, component: row})
    },
};