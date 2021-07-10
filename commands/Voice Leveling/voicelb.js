/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "voice-leaderboard",
  aliases: ["voice-lb"],
  description: "Look at the voice leaderboard!",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    client.discordVoice.generateLeaderboard({ message: message });
  },
};
