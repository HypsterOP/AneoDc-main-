/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const ms = require("ms");
require("../../");
const db = require("quick.db");
module.exports = {
  name: "crime",
  description: "Commit a crime xD",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let user = message.author;
    let author = await db.fetch(`money_${user.id}`);
    if (author < 250) {
      return message.channel.send({content:
        "You need at least 250 Coins to commit a crime"
      }
      );
    }

    let timeout = 60000;
    let rand = Math.round(Math.random() * 700 + 200);

    let beg = await db.fetch(`crime_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));

      let embedPop = new Discord.MessageEmbed()
        .setTitle("Smh!, Hold Your Hands")
        .setDescription(
          `You've already done a crime recently! Use this command again in \n **${time}**`
        )
        .setColor("RED");
      message.reply({
        embeds: [embedPop],
        allowedMentions: { repliedUser: false },
      });
    } else {
      let crimes = [
        "You beat up an old lady and manage to steal",
        "You steal a car and then sold it for",
        "You go into Mr beast's house and steal",
        "You didn't manage to do anything, but I give you a gift of",
        "You are a genius, and managed to dbly grab someone's purse and run away. In it you found",
        "You ransacked your manager's home, found his prized alarm clock, and sold it for",
        `You sell a truckload of stolen goods and the former president's suit for `,
      ];
      let randomized = crimes[Math.floor(Math.random() * crimes.length)];
      let embedCrime = new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`${randomized} **${rand}** Coins`)
        .setColor("GREEN")
        .setFooter("oMg YoU ComMiTteD a CrImE!");

      message.reply({
        embeds: [embedCrime],
        allowedMentions: { repliedUser: false },
      });
      db.add(`money_${user.id}`, rand);
      db.set(`crime_${user.id}`, Date.now());
    }
  },
};
