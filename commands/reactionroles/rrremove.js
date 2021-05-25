const { MessageEmbed } = require('discord.js')
const schema = require('../../models/reaction-roles')

module.exports = {
  name: 'rrremove',
  description: "Remove a reaction roles",
  timeout: '1000',
  aliases: ['removerr'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`)
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    const msg1 = args[1]
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
    let emoji = args[3]
    if (!channel) return message.channel.send(`You must provide channel`)
    if (!msg1) return message.channel.send(`You must provide message ID`)
    if (!role) return message.channel.send(`You must provide role`)
    if (!emoji) return message.channel.send(`You must provide emoji`)
    try {
    let msg = await channel.messages.fetch(msg1)
    }catch(err) {
      return message.channel.send(`I cannot find Message ID \`${msg1}\` in ${channel}`)
    }
    let msg = await channel.messages.fetch(msg1)
    schema.findOne({
      Guild: message.guild.id,
      Channel: channel.id,
      Message: msg.id,
      Emoji: emoji,
    }, async (err, data) => {
      if (!data) return message.channel.send(`This Reaction Roles is not exist`);
      await data.delete()
      message.channel.send(new MessageEmbed().setTitle(`Reaction Roles Removed`).addField(`Role`, role, true).addField(`Channel`, channel , true).addField(`Message`, msg.id , true).addField(`Emoji`, emoji, true).setColor("RED").setTimestamp().addField(`Link`, `[Jump](https://discord.com/channels/${message.guild.id}/${channel.id}/${msg.id})`))
    })
  }
}