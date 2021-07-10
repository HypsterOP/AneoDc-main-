/* eslint-disable */
const {
  Client,
  Message,
  MessageEmbed,
  MessageReaction,
  Permissions
} = require("discord.js");

module.exports = {
  name: "unantivc",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;

    const target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!target)
      return message.reply({content:
        "Please tell me the member who should not be prevented from joining the vc"
      }
      );

    if (target.id === message.author.id)
      return message.reply({content: "You cannot unantivc yourself!"});

    let role = message.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "antivc"
    );
    if (!role) return message.reply({content: "Anti-Vc role doesn't exist"});

    if (!target.roles.cache.has(role.id))
      return message.reply({content:
        `${target} was not event prevented from joining the vc in the first place.`
      }
      );

    target.roles.remove(role.id);
    message.channel.send({content: `${target} will now be able to join vc\'s`});
  },
};
