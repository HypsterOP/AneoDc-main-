const { Client, Message, MessageEmbed } = require('discord.js');
const cooldown = new Set();
module.exports = {
    name: 'beg',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

      if(cooldown.has(message.author.id)) {
        message.reply(`You are on a 20 seconds cooldown!`)
      } else {

        const muni = Math.floor(Math.random() * 300) + 60;
        const persons = [
            `**Thanos**`,
            `**The girl that you where caught with in bed last night**`,
            `**Cozmo**`,
            `**Random Noob**`,
            `**Hypsrer**`,
            `**The money that splited in your face**`,
            `**The local dumb Jilly mek Weilly**`,
            `**Spongebob**`,
            `**Nancy James**`,
            `**Your hitman**`,
            `**Your mom**`,
            `**The star that you and your girlfriend were watching when the apocalypse came**`,
            `**Roblox Owner**`,
            `**Noob**`,
            `**Your gmail**`,
            `**Russia**`,
            `**Ad blocker**`,
            `**Miscorsoft Edge**`,
            `**Weky**`,
            `**The youtube like button**`,
            `**The moovie that you watched last night**`,
            `**The meme that you didnt liked**`,
            `**Capcha test**`,
            `**The noob that have skin**`,
            `**Your discord file**`,
            `**Kylie Jenner**`,
            `**Kanye West**`,
            `**Cristiano Ronaldo**`,
            `**Tyler Perry**`,
            `**Neymar**`,
            `**Howard Stern**`
       ]
       const breh = [
           `: uh sure enjoy **${muni}** coins`,
           `: nice begger dude, get **${muni}** coins just for that.`,
           `: ok get my **${muni}** coins.`,
           `: oh ok there, **${muni}** coins.`,
           `: aww no one cares about you, get these **${muni}** coins pls.`,
           `: pro at begging take my **${muni}** coins.`,
           `: o oo oo o **${muni}** coins.`,
           `: and thats your way of gettings money? :/ fine take my **${muni}** coins.`,
           `: why not **${muni}** coins for you.`,
           `: nice get **${muni}** coins.`
       ]
       const ok = [
        `: ur not that good at begging so no coins`,
        `: sorry dude, i've used all my money to donate to cozmo :/`,
        `: hello im from NOTHING federation and you get our name`,
        `: nah`,
        `: seems like no one likes you so i will dont too :D`,
        `: sorry dude im looking to buy ${message.author.username}'s head i cant give u money.`
       ]
       var o = Math.floor(Math.random() * ok.length);
    const okk = ok[o]
       var breh1 = Math.floor(Math.random() * breh.length);
       var persons1 = Math.floor(Math.random() * persons.length);
       var bruh = breh[breh1]
       var person = persons[persons1]
       var num = Math.floor(Math.random() * 2) +0;
    if(num != 1) {
      client.add(message.author.id, muni, message)    
      message.reply(`${person}${bruh}`)
    } else if (num != 0){
      message.reply(`${person}${okk}`)
    }
      cooldown.add(message.author.id)
      setTimeout(() => {
        cooldown.delete(message.author.id)
      }, 20000)
      }
    }
}