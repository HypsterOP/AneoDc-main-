const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { Canvas } = require('canvacord')

module.exports = {
  name: 'changemymind',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let text = args.join(" ");

    if(!args) return message.channel.send('Provide some text like "Hypster Is the best" lmao')

    let image = await Canvas.changemymind(text);

    let changeMyMind = new MessageAttachment(image, "cmm.png")

    message.channel.send(changeMyMind);
  }
}