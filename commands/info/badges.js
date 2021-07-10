/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, UserFlags } = require("discord.js");

module.exports = {
  name: "badges",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const user = message.mentions.users.first() || message.author;

      const flags = user.flags.toArray();

      message.channel.send({content:
        `${user}'s badges : ${flags.join(", ")}`
      }
      );
    } catch (e) {
      return message.channel.send({contact:
        `An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`
      }
      );
    }
  },
};
