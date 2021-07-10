/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "get",
  aliases: ["details", "info"],
  description: " get the info about a channel ",
  usage: " ",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let prefix = await client.prefix(message);
    let ChannelLink = args[0];
    if (!ChannelLink)
      return message.reply(`:x: Usage: \`${prefix}get <link>\``);
    client.YTP.getChannel(message.guild.id, ChannelLink)
      .then((ch) => {
        message.channel
          .send(
            `**Server:**\n> **\`${
              client.guilds.cache.get(ch.DiscordGuild).name
            }\`**` +
              "\n" +
              `**Channel to Post:**\n> **${message.guild.channels.cache.get(
                ch.DiscordChannel
              )}**` +
              "\n" +
              `**Channel Link:**\n> **${ch.YTchannel}**` +
              "\n" +
              `**Linked User:**\n> **\`${
                message.guild.members.cache.get(ch.DiscordUser).user.tag
              }\`**` +
              "\n" +
              `**Last Video:**\n> **\`https://youtube.com/watch=?v${ch.oldvid}\`**` +
              "\n" +
              `**Message:**\n>>> \`\`\`${ch.message}\`\`\``
          )
          .then((msg) => msg.react("👍"));
      })
      .catch((e) => {
        console.log(e);
        message.reply(`${e.message ? e.message : e}`, { code: "js" });
      });
  },
};
