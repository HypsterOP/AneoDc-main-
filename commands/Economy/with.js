/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { Message, Client } = require('discord.js');
const ms = require("parse-ms");
require("../../");
const db = require("quick.db");
module.exports = {
  name: "with",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let user = message.author;

    let member = db.fetch(`money_${user.id}`);
    let member2 = db.fetch(`bank_${user.id}`);

    if (args[0] == "all" || args[0] == "max") {
      let money = await db.fetch(`bank_${user.id}`);

      db.subtract(`bank_${user.id}`, money);
      db.add(`money_${user.id}`, money);

      message.reply({content:`You have withdrawn all your Coins from your bank`,
        allowedMentions: { repliedUser: false },
      });
    } else {
      if (!args[0]) {
        return message.reply({content:`Please specify an amount to withdraw!`,
          allowedMentions: { repliedUser: false },
        });
      }

      if (message.content.includes("-")) {
        return message.reply({content:`You can't withdraw negative money!`,
          allowedMentions: { repliedUser: false },
        });
      }

      if (member2 < args[0]) {
        return message.reply({content: `You don't have that much money!`,
          allowedMentions: { repliedUser: false },
        });
      }

      message.reply( {content:
        `Successfully withdrawn ${args[0]} Coins from your bank!`,
      allowedMentions: { repliedUser: false } }
      );
      db.subtract(`bank_${user.id}`, args[0]);
      db.add(`money_${user.id}`, args[0]);
    }
  },
};
