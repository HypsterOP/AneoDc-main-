const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
require("../../ExtendedMessage")
const cf = require("../../config.json")
module.exports = {
  name: 'addmoney',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run:async (client , message , args) => {



  let user = message.guild.members.cache.get(args[0])
if(!require("../../config.json").owners.includes(
    message.author.id
)) return message.inlineReply(`developer only`)
  let member = db.fetch(`money_${message.author.id}`)

 ;

  if (!user) {
      return message.inlineReply(`You need to specify a member!`, { allowedMentions: { repliedUser: false } })
  }

  
  if (!args[1]) {
      return message.inlineReply('Specify an amount')
  }
  
  let embed5 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(`You have payed ${user} ${args[1]}`);

  message.channel.send(embed5)
  db.add(`money_${user.id}`, args[1])
 

}
}