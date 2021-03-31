const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require('axios')

module.exports = {
  name: "binary",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!args) return message.channel.send('Please tell me if you want to encode or decode.')

    const query = args.shift().toLowerCase();
    let word = args.join(" ");

    if(query === 'encode') {
        if(!word) return message.channel.send('Please tell me a word to encode!');
        const { data } = await axios.get(`https://some-random-api.ml/binary?text=${encodeURIComponent(
            word
        )}`
        );

        message.channel.send(data.binary, {
            code: "",
        });
    } else if(query === 'decode') {
        if(!word) return message.channel.send('Please tell me a binary code to decode.');
        const { data } = await axios.get(`https://some-random-api.ml/binary?decode=${encodeURIComponent(
            word
        )}`
        );

        message.channel.send(data.text, {
            code: "",
        });
    } else return message.channel.send('That isn\'t valid!')
  },
};