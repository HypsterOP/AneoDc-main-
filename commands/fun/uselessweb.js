/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "useless-web",
  aliases: ["uselessweb"],
  description: "Shows a useless web",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let data = await axios
      .get(`https://api.hypsterisgod.repl.co/useless-web`)
      .then((res) => message.channel.send({ content: res.data.url }));
  },
};
