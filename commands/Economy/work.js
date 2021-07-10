/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const ms = require("parse-ms");
const { Message, Client } = require("discord.js");
require("../../");
const db = require("quick.db");
module.exports = {
  name: "work",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let user = message.author;

    let timeout = 1800000;
    let rand = Math.round(Math.random() * 3000 + 690);

    let beg = await db.fetch(`work_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));

      message.reply({
        content: `You've already worked recently. Please work again in **${time.minutes}m** **${time.seconds}s** <:pepeooo:844599141258625094>`,
        allowedMentions: { repliedUser: false },
      });
    } else {
      let work = [
        `You Collabed With Mr beast And Earned **${rand}** Coins!`,
        `You went and cleaned the sewage system, earning **${rand}** Coins`,
        `You fed a person, they were happy and gave you **${rand}** Coins`,
        `You Got Fired From The Job, But While Leaving You Got **${rand}** Coins From Your Desk!`,
        `Boss: You Suck Anyways So You Won't Be Able To Earn Anything. So Here Take **${rand}** Coins As An Offering`,
      ];
      let job = work[Math.floor(Math.random() * work.length)];

      let embed = new Discord.MessageEmbed()
        .setAuthor(
          "Your Work",
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`${job}`)
        .setColor("GREEN")
        .setFooter(`${message.author.tag}`);
      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
      db.add(`money_${user.id}`, rand);
      db.set(`work_${user.id}`, Date.now());
    }
  },
};
