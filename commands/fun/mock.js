/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "mock",
  aliases: ["mo"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const text = args.join("  ");
    if (!text) return message.reply({content: "Please enter a text"});
    if (text.includes("@")) return message.reply({content: "Nope i can't ping!"});

    const data = await fetch(
      `https://api.hypsterisgod.repl.co/mock/${text}`
    ).then((res) => res.json());

    message.channel.send(data.response);
  },
};
