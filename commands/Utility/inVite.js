const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
  name: 'invite',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
    const inviteemebd = new MessageEmbed()
    .setTitle('Invite me')
    .setDescription(`Click on the below button to invite me!`)
    .setColor('RANDOM')

    let linkingbutton = new MessageButton().setStyle("url").setLabel("Click Me!").setURL("https://dsc.gg/ayumu")

    let row = new MessageActionRow()
    .addComponent(linkingbutton)

    message.channel.send({ embed: inviteemebd, component: row })
    } catch (e) {
      return message.channel.send(`An error has occured: ${e.stack}`)
    }
  }
}