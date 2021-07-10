/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const { BlacklistedWords } = require("../../Collection");
const Schema = require("../../models/blacklist-word");
module.exports = {
  name: "blacklist-word",
  aliases: ["bl-word"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

    const query = args[0]?.toLowerCase();
    const guild = { Guild: message.guild.id };
    if (query === "add") {
      const word = args[1]?.toLowerCase();
      if (!word) return message.reply("U need to specify a word!");

      Schema.findOne(guild, async (err, data) => {
        if (data) {
          if (data.Words.includes(word))
            return message.reply({
              content:
                "That word is already there for this guild in my database",
              allowedMentions: { repliedUser: true },
            });
          data.Words.push(word);
          data.save();
          BlacklistedWords.get(message.guild.id).push(word);
        } else {
          new Schema({
            Guild: message.guild.id,
            Words: word,
          }).save();

          BlacklistedWords.set(message.guild.id);
        }
        message.reply({
          content: `Added ${word} as a blacklisted word`,
          allowedMentions: { repliedUser: true },
        });
      });
    } else if (query === "remove") {
      const word = args[1]?.toLowerCase();
      if (!word)
        return message.reply({
          content: "You need to specify a word.",
          allowedMentions: { repliedUser: true },
        });

      Schema.findOne(guild, async (err, data) => {
        if (!data)
          return message.reply({
            content: `No Words for ${message.guild.name}`,
            allowedMentions: { repliedUser: true },
          });

        if (!data.Words.includes(word))
          return message.reply({
            content: "That word doesn't exist in the database!",
            allowedMentions: { repliedUser: true },
          });

        const filtered = data.Words.filter((target) => target !== word);

        await Schema.findOneAndUpdate(guild, {
          Guild: message.guild.id,
          Words: filtered,
        });
        BlacklistedWords.set(message.guild.id, filtered);
      });
      message.reply({
        content: `Removed the word!`,
        allowedMentions: { repliedUser: true },
      });
    } else if (query === "display") {
      Schema.findOne(guild, async (err, data) => {
        if (!data) return message.reply("No data for this server");
        let embed = new MessageEmbed()
          .setTitle(`Blacklisted Words in ${message.guild.name}`)
          .setDescription(data.Words.join(", "));
        message.channel.send({ embeds: [embed] });
      });
    } else if (query === "collection") {
      const getBlacklistedWords = BlacklistedWords.get(message.guild.id);
      if (getBlacklistedWords)
        return message.channel.send(getBlacklistedWords, { code: "js" });
      message.channel.send({ content: "No data" });
    } else
      var embeddd = new MessageEmbed()
        .setTitle(`Query not found`)
        .setDescription(`Query's Avaliable - add, remove, display, collection`);
    return message.channel.send({ embeds: [embeddd] });
  },
};
