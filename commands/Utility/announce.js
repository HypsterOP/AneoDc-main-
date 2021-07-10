/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "announce",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
        return;

      let mention;

      if (!args.length)
        return message.channel.send({
          content: "> Usage: announce <#channel> <message> <-ping ?>",
        });

      const channel = message.mentions.channels.first();
      if (!channel) return message.reply({ content: "tell me a channel!" });

      if (!args[1])
        return message.reply({ content: "tell me a message to announce" });

      if (args.some((val) => val.toLowerCase() === "-ping")) {
        for (let i = 0; i < args.length; i++) {
          if (args[i].toLowerCase() === "-ping") args.splice(i, 1);
        }

        mention = true;
      } else mention = false;

      if (mention === true) channel.send("@everyone");

      channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("New announcement")
            .setDescription(args.slice(1).join(" "))
            .setTimestamp()
            .setColor("RANDOM"),
        ],
      });
    } catch (e) {
      return message.channel.send({
        content: `An error has occured, i think i do not have permissions please try again.`,
      });
    }
  },
};
