/* eslint-disable no-unused-vars */
const schema = require("../../models/custom-commands");
const { Message, Client, Permissions } = require('discord.js');
module.exports = {
  name: "cc-delete",
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

      const name = args[0];

      if (!name)
        return message.channel.send({content:
          "Please tell me the name of the command you want to delete."
        }
        );

      const data = await schema.findOne({
        Guild: message.guild.id,
        Command: name,
      });
      if (!data)
        return message.channel.send({content:"That custom command does not exist! "});
      await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
      message.channel.send({content:
        `Removed **${name}** from custom commands!`
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
