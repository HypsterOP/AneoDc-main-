const Discord = require("discord.js");
const ms = require("parse-ms");
require("../../ExtendedMessage")
module.exports = {
  name: 'dep',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client , message , args, quick) => {

let user = message.author;
  let bank = await quick.fetch(`bank_${user.id}`)
  if (bank === null) bank = 0;

  

  let member = quick.fetch(`money_${user.id}`)
  let member2 = quick.fetch(`bank_${user.id}`)

  if (args[0] == 'all' || args[0] == "max") {
    let money = await quick.fetch(`money_${user.id}`)
    let bank = await quick.fetch(`bank_${user.id}`)


    if(money === 0) return message.inlineReply(`You don't have any Coins to deposit!`, { allowedMentions: { repliedUser: false } })

    quick.add(`bank_${user.id}`, money)
    quick.subtract(`money_${user.id}`, money)
message.inlineReply(`Successfully Deposited **${args[0]}** Coins Into Your Bank`, { allowedMentions: { repliedUser: false } })
  
  } else {
  

  
  if (!args[0]) {
      return message.inlineReply(`:x: Please Specify An Amount To Deposit!`, { allowedMentions: { repliedUser: false } })
      .catch(err => console.log(err))
  }


  if (message.content.includes('-')) { 
      return message.inlineReply(`❌ You can't deposit negative Coins`, { allowedMentions: { repliedUser: false } })
  }
 

  if (member < args[0]) {
      return message.inlineReply(`Why you , why you bully me , You don't have that much money`, { allowedMentions: { repliedUser: false } })
  }

  message.inlineReply(`Successfully deposited **${args[0]}** Coins into your bank`, { allowedMentions: { repliedUser: false } })
  quick.add(`bank_${user.id}`, args[0])
  quick.subtract(`money_${user.id}`, args[0])
  }
}
}
