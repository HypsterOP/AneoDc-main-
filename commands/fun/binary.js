/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "binary",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args)
      return message.channel.send(
        {content: "Please tell me if you want to encode or decode."}
      );

    const query = args.shift().toLowerCase();
    let word = args.join(" ");

    if (query === "encode") {
      if (!word)
        return message.channel.send({content: "Please tell me a word to encode!"});
      const { data } = await axios.get(
        `https://some-random-api.ml/binary?text=${encodeURIComponent(word)}`
      );

      message.channel.send({
        content: `\`\`\`fix
${data.binary}
\`\`\`
`,
      });
    } else if (query === "decode") {
      if (!word)
        return message.channel.send({content: "Please tell me a binary code to decode."});
      const { data } = await axios.get(
        `https://some-random-api.ml/binary?decode=${encodeURIComponent(word)}`
      );

      message.channel.send({content: `\`\`\`fix
${data.text}
\`\`\`
`});
    } else return message.channel.send({content: "That isn't valid!"});
  },
};
