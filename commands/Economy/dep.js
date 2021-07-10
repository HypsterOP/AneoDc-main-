/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { Message, Client } = require("discord.js");
const ms = require("parse-ms");
require("../../");
const db = require("quick.db");
module.exports = {
  name: "dep",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let user = message.author;
    let bank = await db.fetch(`bank_${user.id}`);
    if (bank === null) bank = 0;

    let member = db.fetch(`money_${user.id}`);
    let member2 = db.fetch(`bank_${user.id}`);

    if (args[0] == "all" || args[0] == "max") {
      let money = await db.fetch(`money_${user.id}`);
      let bank = await db.fetch(`bank_${user.id}`);

      if (money === 0)
        return message.reply({
          content: `You don't have any Coins to deposit!`,
          allowedMentions: { repliedUser: false },
        });

      db.add(`bank_${user.id}`, money);
      db.subtract(`money_${user.id}`, money);
      message.reply({
        content: `Successfully Deposited **${args[0]}** Coins Into Your Bank`,
        allowedMentions: { repliedUser: false },
      });
    } else {
      if (!args[0]) {
        return message
          .reply({
            content: `:x: Please Specify An Amount To Deposit!`,
            allowedMentions: { repliedUser: false },
          })
          .catch((err) => console.log(err));
      }

      if (message.content.includes("-")) {
        return message.reply({
          content: `❌ You can't deposit negative Coins`,
          allowedMentions: { repliedUser: false },
        });
      }

      if (member < args[0]) {
        return message.reply({
          content: `Why you , why you bully me , You don't have that much money`,
          allowedMentions: { repliedUser: false },
        });
      }

      message.reply({
        content: `Successfully deposited **${args[0]}** Coins into your bank`,
        allowedMentions: { repliedUser: false },
      });
      db.add(`bank_${user.id}`, args[0]);
      db.subtract(`money_${user.id}`, args[0]);
    }
  },
};
