/* eslint-disable no-unused-vars */
const {
  Client,
  Message,
  MessageEmbed,
  MessageCollector,
  Permissions
} = require("discord.js");
const { prompt } = require("nekoyasui");
module.exports = {
  name: "reset-voice-leveling",
  aliases: ["rvl"],
  description: "Reset the voice leveling system!",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return;

    message.channel.send(
      "Are you sure you want to delete this guilds voice leveling system?! Type yes or no you have 10seconds"
    );

    const filter = (m) => m.author.id === message.author.id;

    const collector = message.channel.createMessageCollector(filter, {
      max: 1,
      time: 10000,
    });

    collector.on("collect", (msg) => {
      switch (msg.content.toLowerCase()) {
      case "yes":
        message.delete() &&
            client.discordVoice.resetGuild(message.guild.id) &&
            message.channel.send("Deleted");

        break;
      case "no":
        message.delete();
        message.channel.send("Cancelled");
        collector.stop("success");
        break;
      }
    });

    collector.on("end", (collecoted) => {
      if (collecoted.size < 1) {
        message.reply({content: `You did not answer in time!!`});
      }
    });
  },
};
