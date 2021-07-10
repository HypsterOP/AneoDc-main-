/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
require("../../");
module.exports = {
  name: "suggest",
  description: `Suggest something`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const p = await client.prefix(message);
      const channel = await db.fetch(`suggestions_${message.guild.id}`);
      if (channel === null)
        return message.reply({content:
          `${config.femoji} | This server hasn't setup suggestion system!`
        }
        );

      const suggestion = args.join(" ");
      if (!suggestion)
        return message.reply({content:
          `Please give me a suggestion! EX - ${p}suggest The server logo is not that good please change it ! `
        }
        );

      const embed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`Suggestion: ${suggestion}`)
        .setColor("RANDOM")
        .addField(`Status: `, `Pending`);

      const clientChannel = await message.guild.channels.cache.get(channel);

      message.channel.send({content:
        `${config.semoji} | Nice! You have submitted a suggestion, to check it go to <#${clientChannel.id}>`
      }
      );

      const e = await message.guild.channels.cache.get(channel).send({embeds: [embed]});

      await e.react("👍");
      await e.react("👎");
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`
      }
      );
    }
  },
};
