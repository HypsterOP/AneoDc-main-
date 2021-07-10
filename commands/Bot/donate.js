/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "donate",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
      .setTitle("Donate!")
      .setDescription(
        "[Paypal](https://paypal.me/hypsterop)\nPatreon: Coming soon!"
      )
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter("Thank you for donating and using the bot.");
    message.channel.send({ embeds: [embed] });
  },
};
