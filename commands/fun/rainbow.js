/* eslint-disable no-unused-vars */
const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const { Canvas } = require("canvacord");
module.exports = {
  name: "gay",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const avata = user.displayAvatarURL({ format: "png" });

    const rainbow = await Canvas.rainbow(avata);

    message.channel.send({files: [new MessageAttachment(rainbow, `gay.png`)]});
  },
};
