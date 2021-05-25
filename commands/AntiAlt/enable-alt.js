const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/alt.js')
module.exports = {
    name: 'enable-alt',
  description: "Enable Alt Identifier Module (Usage: first true/false is for avatar check. If the option = true, new member join the server require avatar or will get kicked. next minimum days is minimum age to be in the server)",
  usage: '[true/false] [minimum days]',
  aliases: ['ealt'],
  timeout: '10000',
  requirePermission: "Administrator",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You need Admin permission to use this command`);
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`I need Admin permission to run Alt Identifier Module`);
    const avatar = args[0]
    if(!avatar) return message.channel.send(`Avatar Checker Settings must: \`true\` to enable, \`false\` to disable`)
    const day = args[1]
    if(!Number(day) || !day) return message.channel.send(`Days must be a number`)
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) return message.channel.send(`This Module is enabled already. Minimum Age: \`${data.Days} days\`, Avatar: \`${data.Avatar}\``)
      if(avatar == 'true') {
        new schema({
          Guild: message.guild.id,
          Avatar: `Enabled`,
          Days: day
        }).save()
        message.channel.send(`● Saved ! AntiAlt Module Settings: Minimum Age: \`${day} days\` , Avatar: \`Enabled\``)
      } else if(avatar == 'false') {
        new schema({
          Guild: message.guild.id,
          Avatar: `Disabled`,
          Days: day
        }).save()
        message.channel.send(`● Saved ! AntiAlt Module Settings: Minimum Age: \`${day} days\` , Avatar: \`Disabled\``)
      }
      })
    }
}