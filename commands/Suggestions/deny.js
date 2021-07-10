/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const config = require("../../config.json");
let db = require('quick.db');
module.exports = {
  name: "deny-suggestion",
  aliases: ["ds"],
  description: "Deny a suggestion",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
        return message.channel.send({content: `You dont have permissions.`});

      let sugchannel = await db.fetch(`suggestions_${message.guild.id}`);

      const noCh = new MessageEmbed()
        .setDescription(
          `${config.femoji} | This server hasn't setup the suggestion system`
        )
        .setColor("RANDOM");

      if (sugchannel == null) return message.channel.send({embeds: [noCh]});

      const rtx23 = /^(?:<@!?)?(\d+)>?$/;

      const messageID = args[0];
      if (!messageID)
        return message.reply({content: `Please give me the id of the message!`});
      const ReasonQuery = args.slice(1).join(" ");

      const number = new MessageEmbed()
        .setDescription(`${config.femoji} | That is not a message id!`)
        .setColor("RANDOM");

      const id = new MessageEmbed()
        .setDescription(`${config.femoji} | Please specify a message id`)
        .setColor("RANDOM");

      const query = new MessageEmbed()
        .setDescription(`${config.femoji} | You forgot to give me the Reason!`)
        .setColor("RANDOM");

      const success = new MessageEmbed()
        .setDescription(`${config.semoji} | Replied to the message!`)
        .setColor("RANDOM");

      const nomsg = new MessageEmbed()
        .setDescription(
          `${config.femoji} | Couldn't find a message with that id!`
        )
        .setColor("RANDOM");

      if (!messageID) return message.channel.send({embeds: [id]});

      if (!rtx23.test(messageID)) return message.channel.send({embeds: [number]});

      if (!ReasonQuery) return message.channel.send({embeds: [query]});

      try {
        const ssss = message.guild.channels.cache.get(sugchannel);

        const suggetEmbed = await ssss.messages
          .fetch(messageID)
          .catch((error) => {
            message.channel.send({embeds: [nomsg]});
          });

        const data = suggetEmbed.embeds[0];

        const ReasonEmbed = new MessageEmbed()
          .setAuthor(`${data.author.name}`, data.author.iconURL)
          .setDescription(data.description)
          .setColor("BLUE")
          .addField(`Reason from ${message.author.tag}`, ReasonQuery)
          .setFooter("Status: Denied")
          .setTimestamp();

        suggetEmbed.edit({embeds: [ReasonEmbed]});

        message.channel.send({embeds: [success]});

        const user = await client.users.fetch(
          (u) => u.tag === data.author.name
        );

        const embed = new MessageEmbed()
          .setDescription(
            `${config.semoji} | Your suggestion has been denied, [Click Here To Jump To The Message](https://discord/channels/${sugchannel}/${messageID})`
          )
          .setColor("RANDOM")
          .setTimestamp();
        user.send({embeds: [embed]});
      } catch (err) {
        return;
      }
    } catch (e) {
      return message.channel.send({content:
        `An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`
      }
      );
    }
  },
};
