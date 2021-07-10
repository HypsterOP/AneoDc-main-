/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "toggle-voice-leveling",
  aliases: ["tvl"],
  description: "Toggle voice leveling.",
  usage: "on/off",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;

    let options = ["on", "off"];

    if (!args[0])
      return message.channel.send(`Please mention an option, on, off`);

    if (args[0] === "on") {
      return (
        (await client.discordVoice.toggle(message.guild.id, true)) &&
        message.channel.send(`Okay! Enabled voice tracking.`)
      );
    }

    if (args[0] === "off") {
      return (
        (await client.discordVoice.toggle(message.guild.id, false)) &&
        message.channel.send(`Okay! Disabled voice tracking.`)
      );
    }

    if (!args[0].includes(options.length))
      return message.channel.send(`Please mention off or on`);
  },
};
