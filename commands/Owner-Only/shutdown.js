/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "restart",
  aliases: ["shut"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!require("../../config.json").owners.includes(message.author.id))
      return message.reply(`No u`);

    message.channel.send({content: `Bye bitch`});
    console.log(`i killed my self`);
    process.exit(1);
  },
};
