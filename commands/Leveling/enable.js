const { Permissions } = require("discord.js");
const schema = require("../../models/level");
/*eslint-disable*/
module.exports = {
  name: "enable-leveling",
  aliases: ["elv"],
  description: "Enable Leveling Module",
  timeout: "3000",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
      return message.channel.send({ content: `You can't use this command` });
    schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) {
        new schema({
          Guild: message.guild.id,
        }).save();
        message.channel.send({ content: `Enabled Leveling System` });
      } else if (data) {
        message.channel.send({ content: `Leveling System is enabled already` });
      }
    });
  },
};
