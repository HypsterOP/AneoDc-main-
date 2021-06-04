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
    const inviteemebd = new MessageEmbed()
    .setTitle('Invite me')
    .setDescription(`Click on the below button to invite me!`)
    .setColor('RANDOM')

    let linkingbutton = new MessageButton().setStyle("url").setLabel("Click Me!").setURL("https://dsc.gg/aneo")

    let row = new MessageActionRow()
    .addComponent(linkingbutton)

    message.channel.send({ embed: inviteemebd, component: row })
  }
}