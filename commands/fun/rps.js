/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "rockpaperscissors",
  aliases: ["rps"],
  description: "",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let prefix = await client.prefix(message);
    const acceptedReplies = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * acceptedReplies.length);
    const result = acceptedReplies[random];

    const choice = args[0];
    if (!choice)
      return message.channel.send({content:
        `How to play: \`${prefix}rps <rock|paper|scissors>\``
	  }
      );
    if (!acceptedReplies.includes(choice))
      return message.channel.send({content:
        `Only these responses are accepted: \`${acceptedReplies.join(", ")}\``
	  }
      );

    console.log("Bot Result:", result);
    if (result === choice)
      return message.reply({content: "It's a tie! We both made the same choice!"});

    switch (choice) {
      case "rock": {
        if (result === "paper") return message.reply({content: "i won!"});
        else return message.reply({ content: "You won!" });
      }
      case "paper": {
        if (result === "scissors") return message.reply({content: "i won!"});
        else return message.reply({ content: "You won!" });
      }
      case "scissors": {
        if (result === "rock") return message.reply({content: "i won!"});
        else return message.reply({ content: "You won!" });
      }
      default: {
        return message.channel.send({
          content: `Only these responses are accepted: \`${acceptedReplies.join(
            ", "
          )}\``,
        });
      }
    }
  },
};
