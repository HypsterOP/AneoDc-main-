/* eslint-disable no-unused-vars */
const Meme = require("memer-api");
const memer = new Meme(process.env.MEMER);
const {
  Client,
  Message,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");

module.exports = {
  name: "roblox",
  usage: "roblox @<user>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = message.mentions.users.first();

    if (!user) return message.reply(`You forgot to mention someone!`);

    const av = user.displayAvatarURL();

    memer.roblox(av).then((image) => {
      const attach = new MessageAttachment(image, "roblox.png");
      message.channel.send({files: [attach]});
    });
  },
};
