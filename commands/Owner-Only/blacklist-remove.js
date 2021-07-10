/* eslint-disable no-unused-vars */
const blacklist = require("../../models/blacklist");
const { Message } = require("discord.js");

module.exports = {
  name: "blacklist-remove",
  hidden: true,
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  run: async (client, message, args) => {
    if (message.author.id !== "800331322089537538") return;
    const User = message.guild.members.cache.get(args[0]);
    if (!User) return message.channel.send({content: "User is not valid."});

    blacklist.findOne({ id: User.user.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        await blacklist
          .findOneAndDelete({ id: User.user.id })
          .catch((err) => console.log(err));
        message.channel.send({content:
          `**${User.displayName}** has been removed from blacklist.`
        }
        );
      } else {
        message.channel.send({content: `**${User.displayName}** is not blacklisted.`});
      }
    });
  },
};
