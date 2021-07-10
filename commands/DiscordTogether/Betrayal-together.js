/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "betrayl-together",
  aliases: ["bt"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const voicechannel = message.member.voice.channelID;
    if (!voicechannel)
      return message.reply({ content:
        `You need to be in a voice channel to run this command`, allowedMentions: { repliedUser: false }
      }
      );
    client.discordTogether
      .createTogetherCode(voicechannel, "betrayal")
      .then(async (invite) => {
        return message.reply({ content:
          `Hey here is your link! Click on the link to start! ${invite.code}`, allowedMentions: { repliedUser: true }
        }
        );
      });
  },
};
