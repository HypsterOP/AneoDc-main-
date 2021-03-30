const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snipe',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

      const msg = client.snipes.get(message.channel.id)

      if(!msg) return message.channel.send(`There were no deleted messages in this channel`)

      const snipeEmbed = new MessageEmbed()
      .setAuthor(msg.author.tag)
      .setColor(`RANDOM`)
      .setDescription(msg.content)


      if(msg.image)snipeEmbed.setImage(msg.image)
      message.channel.send(snipeEmbed)
    },
};