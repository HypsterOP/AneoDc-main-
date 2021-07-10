/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "setup-anticaps",
  aliases: ["sa"],
  description: "Setup anti capitals for your server",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return;
    const percentageLimit = args[0];
    if (!percentageLimit)
      return message.channel.send({content:
        `Please mention the percentage limit example - ${await client.prefix(
          message
        )}setup-anticaps 75`
      }
      );
    if (isNaN(percentageLimit))
      return message.channel.send({content:
        `Please mention only numbers and not anything else.`
      }
      );
    db.set(`anticaps_${message.guild.id}`, percentageLimit);
    message.channel.send({content:
      `Successfully turned on anti caps with the percentage of ${percentageLimit}`
    }
    );
  },
};
