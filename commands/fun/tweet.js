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
  name: "tweet",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user1 = message.member;

    const avatar = user1.user.displayAvatarURL({ dynamic: false });

    const text = args.join(" ");

    if (!text) return message.reply({ content: `Please provide a text.` });

    const username = user1.user.username;

    memer.tweet(avatar, username, text).then((image) => {
      const attach = new MessageAttachment(image, "tweet.png");
      message.channel.send({ files: [attach] });
    });
  },
};
