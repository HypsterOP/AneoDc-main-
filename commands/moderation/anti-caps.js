/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
let db = require("quick.db");
module.exports = {
  name: "anticaps-disable",
  aliases: ["acccd"],
  description: "Disable anti caps system",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return;
    let limit = await db.fetch(`anticaps_${message.guild.id}`);
    if (limit === null)
      return message.channel.send({
        content: `Anti caps system has not been enabled in this guild.`,
      });
    db.delete(`anticaps_${message.guild.id}`);
    const msg = await message.channel.send({content:
      `Removing from database...`
    }
    );
    msg.edit({ content: `Successfully disabled anti caps system.` });
  },
};
