const { hangman } = require('../../classes/HangmanClass');
module.exports = {
  name: "hangman",
  run: async (client, message, args) => {
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel)
      return message.channel.send({content: "Please specify a channel for the hangman"});
    const word = args.slice(1).join(" ");
    if (!word) return message.channel.send({content: "Please specify a word to guess."});

    const hang = new hangman({
      message: message,
      word: word,
      client: client,
      channelID: channel.id,
    });

    hang.start();
  },
};
