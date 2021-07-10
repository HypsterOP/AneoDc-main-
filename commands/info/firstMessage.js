/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "firstmessage",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {
      const fetchMessages = await message.channel.messages.fetch({
        after: 1,
        limit: 1,
      });
      const msg = fetchMessages.first();

      let embed = new MessageEmbed()
        .setTitle(`First Messsage in ${message.guild.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Content: ${msg.content}\n\nMember: ${msg.author}\n\nMessage ID: ${msg.id}\n\nMessage Sent on: ${message.createdAt.toLocaleDateString()}`)
        .setColor(`RANDOM`);
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.channel.send(err.message);
    }
  },
};
