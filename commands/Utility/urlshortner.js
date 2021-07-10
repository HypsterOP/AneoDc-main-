/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
let isgd = require("isgd");
module.exports = {
  name: "url-shorten",
  aliases: ["us"],
  description: "Shorten a url",
  usage: "<url>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send({content:
        `${client.error} Incorrect usage! ${await client.prefix(
          message
        )}url-shorten <url> [title]`
      }
      );

    if (!args[1]) {
      isgd.shorten(args[0], function (res) {
        if (res.startsWith("Error:"))
          return message.channel.send({content:
            `Please enter a valid url.`
          }
          );

        message.channel.send({content: `Here is the url:\n${res}`});
      });
    } else {
      isgd.custom(args[0], args[1], function (res) {
        if (res.startsWith(`Error:`))
          return message.channel.send({content:
            ` An error has occured: ${res}`
          }
          );

        message.channel.send({content: `Here is the url:\n${res}`});
      });
    }
  },
};
