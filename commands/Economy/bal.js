const Discord = require("discord.js");
module.exports = {
  name: 'bal',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run :async (client , message , args, quick) => {
 let user = message.mentions.members.first() || message.author;

  let bal =  await quick.fetch(`money_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await quick.fetch(`bank_${user.id}`)
  if (bank === null) bank = 0;

 
  let moneyEmbed = new Discord.MessageEmbed()
  .setDescription(`**${user}'s Balance**\n\nWallet: ${bal} Coins\nBank: ${bank} Coins`)
  .setColor("GREEN")
      message.lineReply({
  embed: moneyEmbed,
  allowedMentions: { repliedUser: false }
});
}

  
}  
