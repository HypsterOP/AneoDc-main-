const { Client, Message, MessageEmbed } = require("discord.js");
const translate = require('@iamtraction/google-translate');
const { Query } = require("mongoose");

module.exports = {
  name: 'translate',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ");
    if(!query) return message.channel.send('Give me some text to translate!');

    const translated = await translate(query, { to: 'en' });
    message.channel.send(translated.text)
  },
};