/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "leave",
  aliases: ["lev"],
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!require("../../config.json").owners.includes(message.author.id))
      return;

    let guild = client.guilds.cache.get(args[0]);

    if (!guild) return message.channel.send(`oooooooo now stfu and give me the correct guild.`);

    await guild.leave();
    return message.channel.send({content:
      `✅ Name: ${guild.name}\nMember Count: ${guild.memberCount}`
    }
    );
  },
};
