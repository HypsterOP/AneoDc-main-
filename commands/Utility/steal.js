const Discord = require('discord.js')
const config = require('../../config.json')
module.exports = {
  name: 'steal',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client , message , args) => {
    try {
    const errembed = new Discord.MessageEmbed()
          .setTitle(`${config.femoji}`)
          .setDescription(`An error occured! Please check if you used the command correctly. Possible Reasons:\n\n• Correct Usage: ${await client.prefix(message)}steal (emoji name) (link)\n• File cannot be larger than 256.0 kb.\n• Invalid image`)
          .setColor("RED")
    if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.reply("I am missing the `MANAGE_EMOJIS` permission!")
    if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.reply("You are missing the `MANAGE_EMOJIS` permission!")
 const url = args[1];
 const name = args[0]
        if (!name) return message.reply(`Usage: ${await client.prefix(messafe)}steal <name> <image or gif url>`)
        if (name.length < 2 || name.length > 32) return message.reply(`\`\`\`Invalid Form Body
name: Must be between 2 and 32 in length.\`\`\``)
        if (!url) return message.reply(`Usage: ${await client.prefix(message)}steal <name> <image or gif url>`)
   
        message.guild.emojis.create(url, name)
         
   
         let embed = new Discord.MessageEmbed()
         .setTitle("Emoji Added")
         .setDescription(`Added \`${name}\` as an emoji!`)
         .setColor("RANDOM")
         .setThumbnail(url)
         .setFooter(" ")
          message.channel.send(embed).catch(err => 
          message.channel.send(errembed)
          )
    } catch(e) {
      return message.chanel.send(`Seems like there is an error, maybe the server emoji slots are full please check.`)
    }
  }
}