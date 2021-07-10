/* eslint-disable no-unused-vars */
const prefixSchema = require("../../models/prefix");
const { Message, Permissions } = require("discord.js");
module.exports = {
  name: "prefix",
  /**
   * @param {Message} message
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;
    const res = await args.join(" ");
    if (!res)
      return message.channel.send({content:
        "Please give me the new prefix for the server."
      }
      );
    if (
      res.match(/^(?:<@!?)?(\d{16,22})>/gi) ||
      res.match(/^(?:<#?)?(\d{16,22})>$/gi) ||
      res.match(/^(?:<:(?![\n])[()#$@-\w]+:?)?(\d{16,22})>$/gi)
    ) {
      return message.reply({content: `Trying to break me i see, i dont want custom emojis!`});
    }
    prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        prefixSchema.findOneAndDelete({ Guild: message.guild.id });
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send({content: `Your prefix has been updated to **${res}**`});
      } else {
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send({content:
          `Custom prefix in this server is now set to **${res}**`
        }
        );
      }
    });
  },
};
