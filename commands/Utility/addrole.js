/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "addrole",
  description: "Add role to a user !",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return;
      const user =
        message.mentions.members.last() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          (x) =>
            x.user.username.toLowerCase() === args.slice(0).join(" ") ||
            x.user.username === args[0]
        );

      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[1]) ||
        message.guild.roles.cache.find(
          (x) =>
            x.name.toLowerCase() === args.slice(1).join(" ") ||
            x.name === args[1]
        );

      if (!user) {
        return message.channel.send({content: `You need to specify a valid member`});
      }

      if (!role) {
        return message.channel.send({content: `You need to specify a valid role`});
      }

      if (message.guild.me.roles.highest.id === role.id) {
        return message.channel.send({content:
          `I cannot add or remove that role because that is my highest role`
        }
        );
      }

      let clientttt = message.guild.me.roles.highest;

      if (role.position > clientttt.position) {
        return message.reply({content: `Error! That role is above my role.`});
      }

      if (user.roles.cache.has(role.id)) {
        try {
          user.roles.remove(role.id);
          return message.channel.send({content:
            `Removed ${role.name} from ${user.user.tag}`
          }
          );
        } catch (e) {
          return message.channel.send({content: `There was an error: ${e}`});
        }
      } else {
        try {
          user.roles.add(role.id);
          return message.channel.send({content: `Added ${role.name} to ${user.user.tag}`});
        } catch (e) {
          return message.channel.send({content: `There was an error: ${e}`});
        }
      }
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, i think i do not have permissions please try again.`
      }
      );
    }
  },
};
