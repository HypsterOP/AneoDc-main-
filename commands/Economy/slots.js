const Discord = require('discord.js')
require("../../ExtendedMessage")
const db = require("quick.db")
const ms = require("parse-ms")
module.exports = {
  name: 'slots',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run:async (client , message , args) => {
  
    let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

 

    if (!money) return message.inlineReply(`Please specify an amount to bet!`, { allowedMentions: { repliedUser: false } })
    if (money > moneydb) return message.inlineReply(`You are betting more than you have!`, { allowedMentions: { repliedUser: false } });

    const slotItems = ["win", "loose"]

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            
            .setDescription(` You won ${money} Coins`)
            .setColor("GREEN")
        message.channel.send(slotsEmbed1)
        db.add(`money_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
           
            .setDescription(`You lost ${money} Coins`)
            .setColor("RED")
        message.channel.send(slotsEmbed)
        db.subtract(`money_${user.id}`, money)
    }

}
  }

