/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "guilds",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "800331322089537538") return; //You can change the I'D to you if you want to
    message.channel.send({content:
      `Hello Hypster, Im in ${client.guilds.cache.size} servers` //you can edit this message
    }
    );
  },
}
