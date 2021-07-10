/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "starboard-disable",
  aliases: ["sd"],
  description: "Disable starboard.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
        return message.reply({content: `You are missing permissions!`});
      if (!db.has(`starboard_${message.guild.id}`)) {
        return message.channel.send({content:
          `${message.guild.name} hasn't setup starboard yet :star:`
        }
        );
      }
      db.delete(`starboard_${message.guild.id}`);
      return message.reply({content: `Removed :star: Star board`});
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`
      }
      );
    }
  },
};
