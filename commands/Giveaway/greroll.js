/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "greroll",
  aliases: ["reroll"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;

    if (!args[0]) return message.reply({content: "You need to specify the message ID!"});

    if (isNaN(args[0])) return message.reply({content: `Message id must be a number.`});

    let giveaway = client.giveawaysManager.giveaways.find(
      (g) => g.messageID === args[0] && g.guildID === message.guild.id
    );
    if (!giveaway)
      return message.channel.send({content:
        `I was not able to find a message with that id in this server.`
      }
      );

    // reroll
    client.giveawaysManager
      .reroll(giveaway.messageID)
      .then(() => {
        // Success message
        message.channel.send({content: "Giveaway rerolled!"});
      })
      .catch((err) => message.channel.send({content: `That giveaway is not yet ended.`}));
  },
};
