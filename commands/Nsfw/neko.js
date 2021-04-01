const { Random } = require("something-random-on-discord")
const random = Random
const{ MessageEmbed } = require('discord.js')

module.exports = {
  name: "neko",
run: async (client, message, args) => {
  if(!message.channel.nsfw) return message.channel.send(
    new MessageEmbed()
    .setTitle(`<:error:826449624013078559>`)
    .setDescription(` This is not a nsfw channel!`)
  )
   let data = await random.getNeko()
   message.channel.send(data)
}
}