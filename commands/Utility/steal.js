/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Util, Permissions } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: "steal",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)) return;
      if (!args.length) return message.channel.send({content: "No emoji specified"});

      for (const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji);

        if (parsedEmoji.id) {
          const extension = parsedEmoji.animated ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/emojis/${
            parsedEmoji.id + extension
          }`;
          message.guild.emojis
            .create(url, parsedEmoji.name)
            .then((emoji) =>
              message.channel.send({content:
                `Added the emoji with the link: \`${emoji.url}\``
              }
              )
            );
        }
      }
    } catch (e) {
      return message.channel.send(`The slots of the emojis are full!`);
    }
  },
};
