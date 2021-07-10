/* eslint-disable */
const { Client, Message, MessageEmbed } = require("discord.js");
const { ICONS, AchievementCreator } = require("mc-achievements");

module.exports = {
  name: "achievement",
  aliases: ["ach", "acv"],
  description: "Minecraft achievement image!",
  usage: "<text>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const text = args[0];
    if (!text)
      return message.channel.send({
content: `\`\`\`fix
Provide a text.
\`\`\`
      `,
      });
    AchievementCreator.create(
      ICONS.blockOfDiamond,
      "New achievement!",
      text
      ).then((buffer) => {

        message.channel.send({ files: [buffer] })
      });
  },
};
