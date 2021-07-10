/* eslint-disable no-unused-vars */
const db = require("../../models/warns");
const { Permissions, Message, Client } = require('discord.js');
module.exports = {
  name: "remove-warn",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send({content: "User not found."});
    db.findOne(
      { guildid: message.guild.id, user: user.user.id },
      async (err, data) => {
        if (err) throw err;
        if (data) {
          let number = parseInt(args[1]) - 1;
          data.content.splice(number, 1);
          message.channel.send({content: "Removed the warn"});
          data.save();
        } else {
          message.channel.send({content:
            "This user does not have any warns in this server!"
          }
          );
        }
      }
    );
  },
};
