/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms");
const config = require("../../config.json");
module.exports = {
  name: "gend",
  aliases: ["end"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;

    if (!args[0]) return message.reply({ content: "You need to specify the message ID" });

    if (isNaN(args[0])) return message.reply({content: `Message id must be a number.`});

    let giveaway = client.giveawaysManager.giveaways.find(
      (g) => g.messageID === args[0] && g.guildID === message.guild.id
    );
    if (!giveaway) {
      message.channel.send({ content :
        `I was not able to find a message with that id in this server.`
      }
      );
    } else {
      client.giveawaysManager
        .edit(giveaway.messageID, {
          setEndTimestamp: Date.now(),
        })
        .then(() => {
          message.channel.send({ content :
            "Giveaway will end in less than " +
              client.giveawaysManager.options.updateCountdownEvery / 1000 +
              " seconds..."
          }
          );
        })
        .catch((e) => {
          if (
            e.startsWith(
              `Giveaway with message ID ${giveaway.messageID} is already ended.`
            )
          ) {
            message.channel.send({content: "This giveaway is already ended!"});
          } else {
            console.error(e);
            message.channel.send({content: "An error occured..."});
          }
        });
    }
  },
};
