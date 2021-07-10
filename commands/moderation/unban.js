/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "unban",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return;

      const id = args[0];
      if (!id) return message.channel.send({content: "Please give me a correct id"});

      if (isNaN(id))
        return message.channel.send({content: `Provided id must be a number!`});


      const bannedMembers = await message.guild.fetchBans(id);
      if (!bannedMembers)
        return message.channel.send({content:
          "Couldn't find that member in the ban list!"
        }
        );

      message.guild.members.unban(id);

      message.channel.send({embeds: [
        new MessageEmbed()
          .setTitle("Unbanned")
          .setDescription(`Unbanned the user.`)
          .setColor("RANDOM")
      ]
      }
      );
    } catch {
      return message.reply({content:
        `An error has occured! Either the member doesn't exist in the ban list or something is wrong with the bot. `
      }
      );
    }
  },
};
