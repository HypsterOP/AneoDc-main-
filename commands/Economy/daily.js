const Discord = require("discord.js");
const ms = require("parse-ms");
const db = require("quick.db")
module.exports = {
  name: 'daily',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

 run: async (client , message , args) => {




  let user = message.author;

  let timeout = 86400000;
  let amount = 1500;

  let daily = await db.fetch(`daily_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:x: You've already collected your daily reward\n\nCollect it again in __${time.hours}__h __${time.minutes}__m __${time.seconds}__s `)
    .setColor("RED")
        message.lineReply({
  embed: timeEmbed,
  allowedMentions: { repliedUser: false }
});
  } else {
   
  message.lineReply(`You've collected your daily reward of **${amount}** Coins!`, { allowedMentions: { repliedUser: false } })
  db.add(`money_${user.id}`, amount)
  db.set(`daily_${user.id}`, Date.now())


  }
}
}