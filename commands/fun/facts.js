/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const memer = require("memer-api");
const meme = new memer(process.env.MEMER);
const Discord = require("discord.js");
module.exports = {
  name: "facts",
  description: `those are facts......wow`,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const text = args.join(` `);
    if (!text) return message.reply({content: `Hey you didn't provide the text!`});

    meme.facts(text).then((image) => {
      const attachment = new Discord.MessageAttachment(image, "facts.png");
      message.channel.send({files: [attachment]});
    });
  },
};
