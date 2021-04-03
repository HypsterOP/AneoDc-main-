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
          .setDescription(`[Discord Bot lists](https://discordbotlist.com/bots/aneo/upvote)`)
          .setColor('RANDOM')
        )
    },
};