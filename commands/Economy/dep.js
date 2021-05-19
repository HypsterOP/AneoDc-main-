const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
require("../../ExtendedMessage")
module.exports = {
  name: 'dep',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client , message , args) => {

let user = message.author;
  let bank = await db.fetch(`bank_${user.id}`)
  if (bank === null) bank = 0;

  

  let member = db.fetch(`money_${user.id}`)
  let member2 = db.fetch(`bank_${user.id}`)

  if (args[0] == 'all' || args[0] == "max") {
    let money = await db.fetch(`money_${user.id}`)
    let bank = await db.fetch(`bank_${user.id}`)


    if(money === 0) return message.inlineReply(`You don't have any Coins to deposit!`, { allowedMentions: { repliedUser: false } })

    db.add(`bank_${user.id}`, money)
    db.subtract(`money_${user.id}`, money)
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
  db.add(`bank_${user.id}`, args[0])
  db.subtract(`money_${user.id}`, args[0])
  }
}
}
