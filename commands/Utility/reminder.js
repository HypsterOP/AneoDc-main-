/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "reminder",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let time = args[0];

    if (!time) {
      return message.channel.send({ content: `Please tell me the time!` });
    }

    const reminder = args.slice(1).join(" ");

    if (!reminder)
      return message.channel.send(
        `Please tell me what i should remind you about!`
      );

    const ser = new MessageEmbed()
      .setColor(`DARK_BUT_NOT_BLACK`)
      .setAuthor(
        `Reminder set!`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(`Time to remind you in:`, `${time}`)
      .addField(`Reason:`, `${reminder}`);

    message.channel.send({ embeds: [ser] });

    setTimeout(async function() {
      const aaaa = new MessageEmbed()
        .setColor(`DARK_BUT_NOT_BLACK`)
        .setAuthor(
          `Reminder off!`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(`Your timer is off!`, `${time}`)
        .addField(`Reason:`, `${reminder}`);
      message.author.send({ embeds: [aaaa] });
    }, ms(time));
  },
};
