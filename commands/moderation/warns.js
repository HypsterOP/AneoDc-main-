/* eslint-disable no-unused-vars */
const db = require("../../models/warns");
const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "warns",
  /**
   * @param {Message} message
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send({content: "User not found."});
    const reason = args.slice(1).join(" ");
    db.findOne(
      { guildid: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          message.channel.send({embeds: [
            new MessageEmbed()
              .setTitle(`${user.user.tag}'s warns`)
              .setDescription(
                data.content.map(
                  (w, i) =>
                    `\`${i + 1}\` | Moderator : ${
                      message.guild.members.cache.get(w.moderator).user.tag
                    }\nReason : ${w.reason}`
                )
              )
              .setColor("BLUE")
          ]
          }
          );
        } else {
          message.channel.send({content: "User has no warns"});
        }
      }
    );
  },
};
