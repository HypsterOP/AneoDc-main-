const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: 'bal',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run :async (client , message , args) => {
 let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${user.id}`)
  if (bank === null) bank = 0;

 
  let moneyEmbed = new Discord.MessageEmbed()
  .setDescription(`**${user}'s Balance**\n\nWallet: ${bal.toLocaleString()} Coins\nBank: ${bank.toLocaleString()} Coins`)
  .setColor("GREEN")
      message.lineReply({
  embed: moneyEmbed,
  allowedMentions: { repliedUser: false }
});
}

  
}  
