/* eslint-disable no-unused-vars */
const schema = require("../../models/custom-commands");
const { Message, Client, Permissions } =require('discord.js');

module.exports = {
  name: "cc-create",
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
      const response = args.slice(1).join(" ");

      if (!name) return message.channel.send({content: "Please specify a command name"});
      if (!response) return message.channel.send({content:"Please specify a response"});

      const data = await schema.findOne({
        Guild: message.guild.id,
        Command: name,
      });
      if (data)
        return message.channel.send({content: "This custom commands already exists!"});
      const newData = new schema({
        Guild: message.guild.id,
        Command: name,
        Response: response,
      });
      await newData.save();
      message.channel.send({content:
        `Saved **${name}** as a custom command! <a:Success:821621580215877644>`
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
