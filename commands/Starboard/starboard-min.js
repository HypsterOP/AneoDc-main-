/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
module.exports = {
  name: "starboard-min",
  aliases: ["smin"],
  description: "Minumun reactions required for starboard.",
  usage: "<number>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
        return message.reply({content: `You are missing permissions!`});

      if (!args[0] || isNaN(args[0])) {
        var embed = new MessageEmbed()
          .setTitle(`${config.femoji}`)
          .setDescription(
            `Either you haven't specified a number or you have not given me an integer.`
          )
          .setColor("RANDOM");
        return message.channel.send({embeds: [embed]});
      }

      const number = parseInt(args[0]);
      if (number === 0) {
        var embed2 = new MessageEmbed()
          .setTitle(`${config.femoji}`)
          .setDescription(`The number that you have given is not aobve 0.`)
          .setColor("RANDOM");
        return message.channel.send({embeds: [embed]});
      }

      db.set(`targetstar_${message.guild.id}`, number);
      var embed3 = new MessageEmbed()
        .setTitle(`${config.semoji}`)
        .setDescription(
          `Success! Minimun reactions required to be in the starboard is now set as: ${number}`
        )
        .setColor("RANDOM");
      return message.channel.send({embeds: [embed3]});
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`
      }
      );
    }
  },
};
