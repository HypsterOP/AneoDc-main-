const Discord = require('discord.js');
require("../../ExtendedMessage");
const ms = require('parse-ms')
const db = require("quick.db")
module.exports = {
  name: 'use',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

run:  async (client , message , args) => {
let user = message.author;

 

if (args[0] == 'minecraft' || args[0] == 'mc') {
 let timeout = 120000;
  let rand = Math.round(Math.random() * 250 + 50);
  let user = message.author;
let mc = await db.fetch(`mc_${user.id}`)
  if (mc !== null && timeout - (Date.now() - mc) > 0) {
    let time = ms(timeout - (Date.now() - mc));
  
 message.inlineReply(`Woaah, slow down there. You already played minecraft for hours last night and you wanna play it again?! Come back in **${time.seconds}s**`, { allowedMentions: { repliedUser: false } })
  } else {

  let mc = await db.fetch(`mc_${user.id}`)
  if(mc === null) return message.inlineReply("You need to buy minecraft from the shop!")
  if(mc > 0) message.channel.send(`You Played Minecraft For The Whole Day. It was so good that you're **${rand}** Coins richer now! `)
   db.add(`money_${user.id}`, rand)
   db.set(`mc_${user.id}`, Date.now())



}
}
    if(args[0] === "miner"){
      let rand = Math.round(Math.random() * 5 + 1);
      let timeout = 86400000;
      let amount = 1000;
        let user = message.author;
      let pop = await db.fetch(`miner_${user.id}`)
        if (pop !== null && timeout - (Date.now() - pop) > 0) {
          let time = ms(timeout - (Date.now() - pop));
        
       message.inlineReply(`You are so greedy. Your Miner Will Only Bless You With Coins Once A Day! Please come back in **${time.hours}**h **${time.minutes}**m **${time.seconds}**s`, { allowedMentions: { repliedUser: false } })
        } else {
      
      let embed = new Discord.MessageEmbed()
      .setTitle('Success')
      .setDescription(`You Use Your Miner, And It Blesses You With **1000** Coins`)
      .setColor("GREEN")
      .setFooter(`Miner Owner: ${message.author.tag}`)
        
        let pop = await db.fetch(`miner_${user.id}`)
        if(pop === null) return message.inlineReply("You need to buy a Miner from the shop!")
        if(pop > 0) message.channel.send(embed)
         db.add(`money_${user.id}`, amount)
         db.set(`miner_${user.id}`, Date.now())
        }
    }

      if(args[0] === "mansion"){
        let timeout = 604800000;
  let rand = Math.round(Math.random() * 30000 + 2000);
  let user = message.author;
let house = await db.fetch(`house_${user.id}`)
  if (house !== null && timeout - (Date.now() - house) > 0) {
    let time = ms(timeout - (Date.now() - house));
  
 message.inlineReply(`You Can Only Collect Rent From The Tenants Once A Week!\n Try again in **${time.days}**d **${time.hours}**h **${time.minutes}**m **${time.seconds}**s`, { allowedMentions: { repliedUser: false } })
  } else {
let embed = new Discord.MessageEmbed()
.setTitle('Payment Success')
.setDescription(`Your Tenant Payed You A Rent of ${rand} Coins`)
.setColor("GREEN")
.setFooter(`Mansion Owner: ${message.author.tag}`)
  let house = await db.fetch(`house_${user.id}`)
  if(house === null) return message.inlineReply("You need to buy a Mansion first!")
  if(house > 0) message.inlineReply({
  embed: embed,
  allowedMentions: { repliedUser: false }
});
   db.add(`money_${user.id}`, rand)
   db.set(`house_${user.id}`, Date.now())


      } 
      }

      if(args[0] === "diamond"){
          let dimID = db.fetch(`diamond_${user.id}`)

          if(dimID === null) return message.inlineReply("You need to buy a Diamond from the shop before using this command!")

          message.channel.send(`**${message.author.username} is flexing on everybody with their diamond 💪**`)
      }
  }
}