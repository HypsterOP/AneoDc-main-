const schema = require('../../models/level')

module.exports = {
  name: 'enable-leveling',
  aliases: ['elv'],
  description: "Enable Leveling Module",
  timeout: '3000',
  run: async(client, message, args) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You can't use this command`);
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(!data) {
        new schema({
          Guild: message.guild.id
        }).save()
        message.channel.send(`Enabled Leveling System`)
      } else if(data) {
        message.channel.send(`Leveling System is enabled already`)
      }
    })
  }
}