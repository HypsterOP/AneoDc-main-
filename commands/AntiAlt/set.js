const schema = require(`../../models/alt-logs`)

module.exports = {
  name: 'setaltlogs',
  description: "Set Logs For Alt Identifier Module",
  usage: '[Channel]',
  timeout: '10000',
  aliases: ['sal'],
  requirePermission: "Administrator",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You can't use this`)
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`I don't have permission to run Alt Identifier Module`);
    const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) {
        new schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save()
        message.channel.send(`Updated Anti-Alt Logs to ${channel}`)
      } else if(data) {
        data.delete()
        new schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save()
        message.channel.send(`Updated Anti-Alt Logs to ${channel}`)
      }
    })
  }
}