const Discord = require('discord.js')
require("../../ExtendedMessage")
module.exports = {
  name: 'shop',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client , message , args) => {
     let embed = new Discord.MessageEmbed()
    .setTitle("The Shop **Cheap Until 1K Servers!**")
    .addField('Miner — **1000**', `Buy A Miner, And It Earns You With 1000 Coins Daily!`)
    .addField('Car — **5000**', `Use A Car To Go Drivin' And Earn Upto 10000 Coins!`)
    .addField('Mansion — **20000**', `Buy A Mansion And You Can Rent It Out To People And Collect An Amount Anywhere From 2000 To 30000 Coins Weekly!`)
    .addField('Minecraft — **50**', `Play Minecraft And Win Money!`)
    .setColor("RANDOM")
    .setFooter("Type h!buy [item name] to buy the item! To use it, h!use [item]")
    message.channel.send(embed)




}
  }
  