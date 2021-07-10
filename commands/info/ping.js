/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
  description: "Shows the bot ping",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let msg = message.channel.send({ content: "Reaching out to discord api..." });

    (await msg).edit(
      {
        content: `Pong!\nAPI Latency: ${Date.now() - (await msg).createdAt}ms\nWS (Websocket) Ping: ${client.ws.ping}ms`
      }
    );
  },
};
