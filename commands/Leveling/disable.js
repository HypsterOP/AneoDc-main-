const schema = require('../../models/level')

module.exports = {
  name: 'disable-leveling',
  aliases: ['dlv'],
  description: "Disable Leveling Module",
  timeout: '3000',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`);
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) {
        await data.delete()
        message.channel.send(`Disabled Leveling System`)
      } else if(!data) {
        message.channel.send(`Leveling System is disabled already`)
      }
    })
  }
}