const { Permissions } = require("discord.js");
const db = require("../../models/warns");

module.exports = {
  name: "remove-all-warns",
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
          await db.findOneAndDelete({
            user: user.user.id,
            guildid: message.guild.id,
          });
          message.channel.send({content: `Cleared ${user.user.tag}'s warns`});
        } else {
          message.channel.send(
            {content: "This user does not have any warns in this server!"}
          );
        }
      }
    );
  },
};
