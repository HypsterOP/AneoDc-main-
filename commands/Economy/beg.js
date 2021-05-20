const Discord = require("discord.js")
const ms = require("parse-ms")

module.exports = {
  name: 'beg',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client , message , args, quick) => {


  let user = message.author;

  let timeout = 30000;
  let rand = Math.round(Math.random() * 500 + 1);


  let beg = await quick.fetch(`beg_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
 message.lineReply(`You've already begged recently. Beg again in **${time.seconds}s**`, { allowedMentions: { repliedUser: false } })
  } else {


    message.lineReply(`You Begged And Received **${rand}** Coins!`, { allowedMentions: { repliedUser: false } })
    quick.add(`money_${user.id}`, rand)
    quick.set(`beg_${user.id}`, Date.now())
  }
  }
}