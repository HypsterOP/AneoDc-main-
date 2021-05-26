const Levels = require('discord-xp')
const { MessageEmbed } = require('discord.js')
const schema = require('../../models/level')

module.exports = {
  name: "add-xp",
  aliases: ['axp','adxp','addxp'],
  timeout: "3000",
  description: "Add/Plus XP of a member",
  requirePermission: "Manage Server",
  usage: '[@Member] [XP]',
  run: async(client, message, args) => {
    const data = await schema.findOne({ Guild: message.guild.id })
  if(!data) return message.channel.send(`Leveling System is not enabled`)
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(`You specified incorrect usage\nCorrect usage: add-xp <member> <amount>`)
    const xp = args.slice(1).join(" ")
    if(!xp || !Number(xp)) return message.channel.send(`Xp must be a number!`)
 await Levels.appendXp(member.id, message.guild.id, xp);
 const user = await Levels.fetch(member.id, message.guild.id);
 const xpRequired = await Levels.xpFor(user.level + 1)
message.channel.send(new MessageEmbed()
  .setTitle(`${member.user.username} 's Rank`)
  .addField(`Info`,[
    `Current Level: ${user.level}`,
    `Current XP: ${user.xp} / ${xpRequired}`
  ])
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setColor("RANDOM")
  .setFooter(`Added ${xp} XP to ${member.user.tag} || Requested by: ${message.author.tag}`)
)
  }
}