const Discord = require("discord.js");
const ms = require("parse-ms");
require("../../ExtendedMessage")
module.exports = {
  name: 'with',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run:async (client , message , args, quick) => {
 

  let user = message.author;

  let member = quick.fetch(`money_${user.id}`)
  let member2 = quick.fetch(`bank_${user.id}`)

  if (args[0] == 'all' || args[0] == "max") {
    let money = await quick.fetch(`bank_${user.id}`)
    
    quick.subtract(`bank_${user.id}`, money)
    quick.add(`money_${user.id}`, money)
  
  message.inlineReply(`You have withdrawn all your Coins from your bank`, { allowedMentions: { repliedUser: false } })
  
  } else {


  
  if (!args[0]) {
      return message.inlineReply(`Please specify an amount to withdraw!`, { allowedMentions: { repliedUser: false } })
  }
  

  if (message.content.includes('-')) { 
      return message.inlineReply(`You can't withdraw negative money!`, { allowedMentions: { repliedUser: false } })
  }
  

  if (member2 < args[0]) {
      return message.inlineReply(`You don't have that much money!`, { allowedMentions: { repliedUser: false } })
  }

message.inlineReply(`Successfully withdrawn ${args[0]} Coins from your bank!`, { allowedMentions: { repliedUser: false } })
  quick.subtract(`bank_${user.id}`, args[0])
  quick.add(`money_${user.id}`, args[0])
  }
}
}