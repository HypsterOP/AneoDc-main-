/* eslint-disable no-unused-vars */
const RankSchema = require("../../models/ranks");
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "addrank",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;

      const rankName = args.slice(1).join(" ");
      const role = message.mentions.roles.first();

      if (!role) return message.reply({content: "Please tell me a role."});
      if (!rankName) return message.reply({content: "Please tell me a rank"});
      RankSchema.findOne(
        { Guild: message.guild.id, Rank: rankName },
        async (err, data) => {
          if (data) return message.channel.send({content: "This rank already exists"});
          else {
            data = new RankSchema({
              Guild: message.guild.id,
              Rank: rankName,
              Role: role.id,
            });
            data.save();
            message.channel.send({
              embeds: [
                new MessageEmbed().setDescription(
                  `${role} is now a new rank! ➡ ${rankName}`
                ),
              ],
            });
          }
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
