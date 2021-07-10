/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clapify",
  aliases: ["calp"],
  description: ":clap: Clapify your text",
  usage: "clapify <text>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send({content:
        `:clap: **|** :clap: How :clap: can :clap: I :clap: clapify :clap: that :clap: message? :clap:`
      }
      );

    const text = args.join(" :clap: ");

    if (text.includes("@")) return message.reply({content: `:clap: No :clap:`});

    if (text.length > 100)
      return message.channel.send({content:
        `:clap: **|** :clap: That's :clap: over :clap: the :clap: limit! :clap:`

      }
      );

    message.channel.send({content: `:clap: **|** :clap: ${text} :clap:`});
  },
};
