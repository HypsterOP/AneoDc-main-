const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    aliases: ["v", "vo"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send(
          new MessageEmbed()
          .setTitle('Vote for Aneo!')
          .addField(`Discord Bots List`, `[Click Here](https://discordbotlist.com/bots/aneo/upvote)`)
          .addField(`Void Bots`, `[Click Here](https://voidbots.net/bot/811265195186978828/vote)`)
          .setColor('RANDOM')
        )
    },
};