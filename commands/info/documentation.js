/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "djs",
  aliases: ["docs"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply({content: "Please tell me a query!"});
    const url = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(
      query
    )}`;

    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embeds: [data] });
      }
    });
  },
};