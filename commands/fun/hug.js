/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const neko = new nekos();
module.exports = {
  name: "hug",
  aliases: ["hg"],
  description: "Hug someone uwu",
  usage: "<@mention>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  // eslint-disable-next-line no-unused-vars
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member)
      return message.channel.send({ content: `Whom do you want to hug 🤗` });

    const image = await neko.sfw.hug();

    message.channel.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            `${message.author.username} is hugging ${member.user.username} 🥰`
          )
          .setImage(image.url)
          .setColor("#2F3136"),
      ],
    });
  },
};
