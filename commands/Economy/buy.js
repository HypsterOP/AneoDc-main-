const Discord = require('discord.js')
require("../../ExtendedMessage")
const db = require('quick.db')
module.exports = {
  name: 'buy',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run:async (client , message , args) => {



    let user = message.author;

    let author = db.fetch(`money_${user.id}`)


    if (args[0] == 'car') {
        if (author < 5000) return message.inlineReply('You need atleast **5000** Coins in your Wallet to buy a Car!', { allowedMentions: { repliedUser: false } })
        
        db.fetch(`car_${user.id}`);
        db.set(`car_${user.id}`, true)

      
        db.subtract(`money_${user.id}`, 5000)
        message.inlineReply(`Succesfully bought a **Car** for **5000** Coins!`)
    
    } else if (args[0] == 'miner' || args[0] == 'miner' || args[0] == 'fresh miner') {
        if (author < 1000) return message.inlineReply('You need atleast **1000** Coins in your Wallet to buy a Miner!', { allowedMentions: { repliedUser: false } })
        
        db.fetch(`miner_${user.id}`);
        db.set(`miner_${user.id}`, true)

      
        db.subtract(`money_${user.id}`, 1000)
        message.inlineReply(`Succesfully bought a **Miner** for **1000** Coins!`)
    } else if (args[0] == 'mansion' || args[0] == 'house' || args[0] == 'Mansion') {
        if (author < 20000) return message.inlineReply('You need atleast **20000** Coins to buy a Mansion!', { allowedMentions: { repliedUser: false } })
        
        db.fetch(`house_${user.id}`);
        db.set(`house_${user.id}`, true)

      
        db.subtract(`money_${user.id}`, 20000)
        message.inlineReply(`Succesfully bought a **Mansion** for **20000** Coins!`)
       } else if (args[0] == 'minecraft' || args[0] == 'mc' || args[0] == 'game') {
        if (author < 50) return message.inlineReply('You need atleast **50** Coins in your Wallet to buy a copy of Minecraft!', { allowedMentions: { repliedUser: false } })
        
        db.fetch(`mc_${user.id}`);
        db.set(`mc_${user.id}`, true)

      
        db.subtract(`money_${user.id}`, 50)
        message.inlineReply(`Succesfully bought **Minecraft** for **50** Coins!`)
        } else if (args[0] == 'diAmond' || args[0] == 'Diamond' || args[0] == 'diamond') {
            if (author < 250000000) return message.inlineReply('You need atleast **250,000,000** Coins to buy a Diamond!', { allowedMentions: { repliedUser: false } })

            db.fetch(`diamond_${user.id}`)
            db.set(`diamond_${user.id}`, true)

            db.subtract(`money_${user.id}`,250000000)
            message.inlineReply('Succesfully bought **Diamond** for **250,000,000** Coins!')
        }else {
        message.inlineReply("That item doesn't exist! 😂")
        }
       

}
}