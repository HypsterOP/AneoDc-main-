/* eslint-disable no-unused-vars */
const db = require("../../models/warns");
const { Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "warn",
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
        if (!data) {
          data = new db({
            guildid: message.guild.id,
            user: user.user.id,
            content: [
              {
                moderator: message.author.id,
                reason: reason,
              },
            ],
          });
        } else {
          const obj = {
            moderator: message.author.id,
            reason: reason,
          };
          data.content.push(obj);
        }
        data.save();
      }
    );
    user.send({content:
      new MessageEmbed()
        .setDescription(`You have been warned for ${reason}`)
        .setColor("BLUE")
    }
    );
    message.channel.send({embeds: [
      new MessageEmbed()
        .setDescription(`Warned ${user} for ${reason}`)
        .setColor("BLUE")
    ]
    }
    );
  },
};
