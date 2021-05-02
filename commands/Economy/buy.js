const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require('../../models/inventory');
const items = require("../../shopItems")
module.exports = {
    name: 'buy',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.reply(`What do u want to buy lol`)
        const itemToBuy = args[0].toLowerCase()

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.reply(`That item doesn't exist lol`);

        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;

        const userBalance = await client.bal(message.author.id);
        if(userBalance < itemPrice) return message.reply(`LoL you only have ${userBalance}, the price of that item is ${itemPrice} coins!`)

        const params = {
            User: message.author.id
        }
        inventory.findOne(params, async(err, data) => {
            if(data) {
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
                if(!hasItem) {
                    data.Inventory[itemToBuy] = 1;
                } else {
                    data.Inventory[itemToBuy]++
                }
                // console.log(data)
                await inventory.findOneAndUpdate(params, data);
            } else {
                new inventory({
                    User: message.author.id,
                    Inventory: {
                        [itemToBuy]: 1
                    }
                }).save();
            }
            message.reply(`You have bought ${itemToBuy}`);
            client.rmv(message.author.id, itemPrice);
        })
    }
}