/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "slowmode",
  description: "use h!slowmode again to remove the slow mode!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return;
    if (!args[0]) {
      message.channel.setRateLimitPerUser(0);
      message.channel.send({content: "Slow mode set to: DEFAULT"});
    }

    const raw = args[0];
    const milliseconds = ms(raw);

    if (isNaN(milliseconds))
      return message.channel.send({content: `That is not a number!`});

    if (milliseconds < 1000)
      return message.channel.send({content: `The minimum slowmode time is 1 second.`});

    message.channel.setRateLimitPerUser(milliseconds / 1000);
    message.channel.send({content:
      `The slowmode for this channel is now set to ${ms(milliseconds, {long: true})}`
    }
    );
  },
};
