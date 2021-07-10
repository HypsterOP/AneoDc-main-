/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const memer =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.member;

      message.channel.send({embeds: [
        new MessageEmbed()
          .setTitle(`${memer.displayName}'s Avatar`)
          .setDescription(`[PNG](${memer.user.displayAvatarURL({ format: "png" })}) - [JPG](${memer.user.displayAvatarURL({ format: "jpg" })}) - [JPEG](${memer.user.displayAvatarURL({ format: "jpeg" })}) - [GIF](${memer.user.displayAvatarURL({ format: "gif" })}) [WEBP](${memer.user.displayAvatarURL({ format: "webp" })})`)
          .setImage(memer.user.displayAvatarURL({ dynamic: true }))
          .setColor("PURPLE")
      ]
      }
      );
    } catch (e) {
      return message.channel.send({content: `An error has occured: ${e.stack}`});
    }
  },
};
