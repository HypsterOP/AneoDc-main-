/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { Message, Client } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "bal",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.author;

    let bal = await db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);
    if (bank === null) bank = 0;

    let moneyEmbed = new Discord.MessageEmbed()
      .setDescription(
        `**${user}'s Balance**\n\n💳 Wallet: ${bal} Coins\n🏦 Bank: ${bank} Coins`
      )
      .setColor("GREEN");
    message.reply({embeds: [moneyEmbed], allowedMentions: { repliedUser: false } });
  },
};
