const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'buy',
    description: 'Buy an item from the shop',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profile = new db.table('profiles')

        const memberProfile = profile.get(`profiles_${message.author.id}`)

        if(!memberProfile) return message.channel.send("You dont have a profile | create one by using h!newprofile")

        const items = [];

        items.push("sword")
        if(memberProfile.bought.sword > 30) items.push("crown")
        if(memberProfile.bought.crown > 50) items.push("fruits")
        if(memberProfile.bought.fruits > 500) items.push("fruits")

        if(!items.includes(args[1]) || !args[1]) return message.channel.send(`
            What are you buying lol?!, Items That Exist ${items.map(i => i).join(", ")}
        `)

        var cost = profile.get(`profiles_${message.author.id}.bought.${args[1]}`) * 20 + 20 || 20

        if(!args[2]) {
            const afterBal = profile.get(`profiles_${message.author.id}.money`) - cost
            if(afterBal > 0) {
                profile.subtract(`profiles_${message.author.id}.money`, cost)
                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, 1)
                return message.channel.send(`You bought a ${args[1]} for ${cost.toLocaleString()}`)
            } else {
                return message.channel.send(`You dont have that many coins to buy that item`)
            }
        } else if (args[2]) {
            if (args[2] === 'max') {
                var bal = profile.get(`profiles_${message.author.id}.money`)
                const cost2 = (profile.get(`profiles_${message.author.id}.bought.${args[1]}`)) * 20 + 20 || 20

                if (cost2 > bal) return message.channel.send(`You dont have enough money`)

                var oldBal = bal
                var newBal = 0
                var boughtItems = 0

                while (bal > 0) {
                    newBal = bal - cost2
                    bal = bal - cost2
                    boughtItems = boughtItems + 1
                }

                var latestPrice = profile.get(`profiles_${message.author.id}.bought.${args[1]}`) || 20
                newBal = newBal = (latestPrice * 20) + (latestPrice)
                boughtItems = boughtItems - 2

                if (boughtItems === 0) return message.channel.send(`You can only buy maximum more than 1`)

                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, boughtItems)
                profile.set(`profiles_${message.author.id}.money`, newBal)

                return message.channel.send(`You have bought ${boughtItems.toLocaleString()} ${args[1]} for ${(oldBal - newBal).toLocaleString()}`)
            } else if (args[2]) {
                const bal = profile.get(`profiles_${message.author.id}.money`)

                if(isNaN(args[2])) return message.channel.send(`Not a valid amount of ${args[1]} to buy.`)

                if(args[2] < 0) return message.channel.send(`You can only buy more than 1 of ${args[1]}`)
                
                const extraCost = (20 * args[2]) - 20

                const newCost = (cost * args[2]) + extraCost

                if(newCost > bal) return message.channel.send(`You dont have enough money`)

                profile.subtract(`profiles_${message.author.id}.money`, newCost)

                profile.add(`profiles_${message.author.id}.bought.${args[1]}`, args[2])

                return message.channel.send(`You have bought ${args[2]} ${args[1]} for ${newCost.toLocaleString()}`)
            }
        }
    }
}