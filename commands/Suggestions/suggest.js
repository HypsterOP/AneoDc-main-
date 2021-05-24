const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const config = require("../../config.json")
require("../../ExtendedMessage")
module.exports = {
    name: 'suggest',
    description: `Suggest something`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args, quick) => {
      const p = await client.prefix(message)
      const channel = await quick.fetch(`suggestions_${message.guild.id}`)
      if(channel === null) return message.inlineReply(`${config.femoji} | This server hasn't setup suggestion system!`)

      const suggestion = args.join(' ')
      if(!suggestion) return message.inlineReply(`Please give me a suggestion! EX - ${p}suggest The server logo is not that good please change it ! `)

      const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`Suggestion: ${suggestion}`)
      .setColor('RANDOM')
      .addField(`Status: `, `Pending`)

      const clientChannel = await client.channels.cache.get(channel)

      clientChannel.send(embed)

      message.channel.send(`${config.semoji} | Nice! You have submitted a suggestion, to check it go to <#${clientChannel.id}>`)



    }
}