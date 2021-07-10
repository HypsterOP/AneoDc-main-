/* eslint-disable no-unused-vars */
const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const Ame = require("amethyste-api");
require("dotenv").config();
const AmeClient = new Ame(process.env.AME);
module.exports = {
  name: "magik",
  description: "Nice magik bro",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    const buffer = await AmeClient.generate("magik", {
      url: user.displayAvatarURL({ format: "png", size: 512 }),
    });
    let msg = message.channel.send({ content: `Generating.....` });

    const attach = new MessageAttachment(buffer, "magik.png");

    (await msg).delete();

    message.channel.send({files: [attach]});
  },
};
