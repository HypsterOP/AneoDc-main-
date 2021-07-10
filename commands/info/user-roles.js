/*eslint-disable */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "roles",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

      if (!member) return message.channel.send({content: "Please mention a member."});

      const memberRoles = member.roles.cache
        .filter((roles) => roles.id !== message.guild.id)
        .map((role) => role.toString());

      message.channel.send({embeds: [
        new MessageEmbed()
          .setAuthor(
            member.user.tag,
            member.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `${member}'s roles:\n\n${memberRoles}`
          )
          .setColor("BLUE")
      ]
    }
      );
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, please try again.`
      }
      );
    }
  },
};
