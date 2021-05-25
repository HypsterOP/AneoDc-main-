const { MessageEmbed } = require('discord.js')
const schema = require('../../models/reaction-roles')

module.exports = {
  name: 'rradd',
  description: "Adds a reaction roles",
  timeout: '1000',
  aliases: ['addrr'],
  run: async (client, message, args) => {
      const p = await client.prefix(message)
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`)
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    const msg1 = args[1]
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
    let emoji = args[3]
    if (!channel) return message.channel.send(`Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`)
    if (!msg1) return message.channel.send(`Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`)
    if (!role) return message.channel.send(`Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`)
    if (!emoji) return message.channel.send(`Inccorect Usage! correct usage ${p}rradd <channel> <messageid> <role> <emoji>`)
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
      Emoji: emoji
    }, async (err, data) => {
      if (data) return message.channel.send(`This Reaction Roles is already exist`);
      try {
      await msg.react(emoji)
      }catch(err) {
        return message.channel.send(`Please provide valid emoji`)
      }
      new schema({
        Guild: message.guild.id,
        Channel: channel.id,
        Message: msg.id,
        Emoji: emoji,
        Role: role.id
      }).save()
      message.channel.send(new MessageEmbed().setTitle(`Reaction Roles Added`).addField(`Role`, role, true).addField(`Channel`, channel , true).addField(`Message`, msg.id , true).addField(`Emoji`, emoji, true).setColor("GREEN").setTimestamp().addField(`Link`, `[Jump](https://discord.com/channels/${message.guild.id}/${channel.id}/${msg.id})`))
    })
  }
}