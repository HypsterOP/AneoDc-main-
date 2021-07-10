/* eslint-disable no-unused-vars */
const { Client, Message, MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
  name: "wanted",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const avatar = user.displayAvatarURL({ format: "png" });

    const image = await Canvas.wanted(avatar);

    let acct = new MessageAttachment(image, "wanted.png");

    message.channel.send({ files: [acct] });
  },
};
