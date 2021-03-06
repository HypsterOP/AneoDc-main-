/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const db = require("../../reconDB");
module.exports = {
  name: "autorole-check",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return;
      const check = await db.has(`autorole-${message.guild.id}`);
      if (check === false)
        return message.reply({content:"There is no autorole set for this guild!"});
      const role = await db.get(`autorole-${message.guild.id}`);
      message.channel.send({embeds: [
        new MessageEmbed()
          .setTitle(`Autorole for ${message.guild.name}`)
          .setDescription(`<@&${role}> is the autorole!`)
      ]
      }
      );
    } catch (e) {
      return message.channel.send({content:
        `An error has occured please try again later`
      }
      );
    }
  },
};
