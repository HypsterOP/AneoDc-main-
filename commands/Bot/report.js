/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "report-bug",
  aliases: ["bug"],
  description: "Report a bug",
  usage: "<bug>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const argsss = args.join(" ");
    if (!argsss)
      return message.reply({
        content: "Please mention a bug.",
        allowedMentions: { repliedUser: false },
      });

    const chnl = client.channels.cache.get("861459299875029002");

    chnl.send({ content: `\`\`\`fix
New Bug has been reported: ${argsss}
UserID: ${message.author.id}
User Name: ${message.author.username}
Reported Time: ${new Date}
\`\`\`
    ` });
    message.reply({ content: "Thank you for reporting a bug. Ayumu will direct message you when the developers fix it or decline it." });
  },
};
