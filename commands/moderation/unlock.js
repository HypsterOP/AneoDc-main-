/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
module.exports = {
  name: "unlock",
  aliases: ["unlo"],
  description: "unLock a channel",
  usage: "<#channel/id/name>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return;
    if (!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
      return message.reply({content: `I am missing permission: **MANAGE_CHANNELS**.`});
    const channel =
    message.channel ||
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]) ||
      message.guild.channels.cache.find((u) => u.name === args[0]);
    if (!channel)
      return message.reply({content:
        `Couldn't find that channel or no channel mentioned.`
      }
      );

    let msg = await message.channel.send(`${client.loading} Please wait`);

    try {
      channel.permissionOverwrites.edit(
        message.guild.roles.cache.find(
          (e) => e.name.toLowerCase().trim() === "@everyone"
        ),
        {
          SEND_MESSAGES: true,
          ADD_REACTIONS: true,
        }
      );
      msg.edit({content: `🔓 Unlocked ${channel.name}`});
    } catch (e) {
      message.channel.send({content: `${client.error} An error has occured: ${e}`});
    }
  },
};
