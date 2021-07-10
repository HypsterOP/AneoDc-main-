const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "nick",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) return;
    const member = message.mentions.members.first();

    if (!member)
      return message.reply({content:
        "Please specify a member of whom you want to change the nickname of!"
      }
      );

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply({content: "Please specify a new nickname!"});

    if (message.member.roles.highest.position <= member.roles.highest.position)
      return message.channel.send({content: "You're role is not higher than the member."});

    try {
      member.setNickname(arguments);
      message.channel.send({content: "I have changed the nickname!"});
    } catch (err) {
      console.log(err);
      message.reply({content:
        "I do not have permission to set " + member.toString() + " nickname!"
      }
      );
    }
  },
};
