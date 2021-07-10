/* eslint-disable no-unused-vars */
const slotItems = ["🍇", "🍉", "💰", "🍎", "🍒"];
const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "slots",
  aliases: ["sl"],
  category: "economy",
  description: "Slot game | 9x - rare | 3x - common",
  usage: "<amount>",
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  run: async (client, message, args) => {
    let user = message.author;
    let moneydb = await db.fetch(`money_${user.id}`);
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new MessageEmbed()
      .setColor("FF2052")
      .setDescription(`You're Betting for more Coins that You've!`);

    let moneyhelp = new MessageEmbed()
      .setColor("FF2052")
      .setDescription(`You forgot to specify the Amount!`);

    if (!money) return message.channel.send({embeds: [moneyhelp]});

    if (money > moneydb) return message.channel.send({embeds: [moneymore]});

    let number = [];
    for (let i = 0; i < 3; i++) {
      number[i] = Math.floor(Math.random() * slotItems.length);
    }

    if (number[0] == number[1] && number[1] == number[2]) {
      money *= 5;
      win = true;
    } else if (
      number[0] == number[1] ||
      number[0] == number[2] ||
      number[1] == number[2]
    ) {
      money *= 2;
      win = true;
    }
    if (win) {
      let slotsEmbed1 = new MessageEmbed()
        .addField(
          `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
            slotItems[number[2]]
          }`,
          `You won ${money} Coins.`
        )
        .setColor("00FFFF");

      message.channel.send({embeds: [slotsEmbed1]});
      db.add(`money_${user.id}`, money);
    } else {
      let slotsEmbed = new MessageEmbed()
        .addField(
          `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
            slotItems[number[2]]
          }`,
          `You lost ${money} Coins.`
        )
        .setColor("FF2052");
      message.channel.send({embeds: [slotsEmbed]});
      db.subtract(`money_${user.id}`, money);
    }
  },
};
