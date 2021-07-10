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

    let embed = new MessageEmbed()
    .setTitle(`Pong!`)
    .addField(`WS (Websocket) Ping:`, `${client.ws.ping}`)
    .setColor(`DARK_BUT_NOT_BLACK`)

    message.channel.send({ embeds: [embed] })
  },
};
