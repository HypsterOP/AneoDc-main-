/* eslint-disable no-unused-vars */
const RankSchema = require("../../models/ranks");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "rank",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const rankName = args.join(" ");
      if (!rankName) return message.channel.send({content: "Please tell me a rank name!"});
      RankSchema.findOne(
        { Guild: message.guild.id, Rank: rankName },
        async (err, data) => {
          if (!data) return message.channel.send({content: "That rank doesn't exist"});
          message.member.roles.add(data.Role);
          return message.channel.send({content: `You have received <@&${data.Role}>`});
        }
      );
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`
      }
      );
    }
  },
};
