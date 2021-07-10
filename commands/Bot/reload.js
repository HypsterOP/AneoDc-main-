/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "reload",
  hide: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "800331322089537538")
      return message.reply({content:"why do u want to break me?", allowedMentions: { repliedUser: false }});
    if (!args[0]) return message.channel.send({content:"Give a category"});
    if (!args[1]) return message.channel.send({content:"Give a command"});

    let category = args[0].toLowerCase();
    let command = args[1].toLowerCase();

    try {
      delete require.cache[
        require.resolve(`../../commands/${category}/${command}.js`)
      ];
      client.commands.delete(command);

      const pull = require(`../../commands/${category}/${command}.js`);
      client.commands.set(command, pull);

      return message.channel.send({content:`Reloaded **${command}**`});
    } catch (error) {
      return message.channel.send({content:
        `Error reloading **${command}**: \`${error.message}\``
      }
      );
    }
  },
};
