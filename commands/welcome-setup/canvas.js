const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const canvas = require("discord-canvas")
const Discord = require('discord.js')

module.exports = {
  name: 'canvas-welcome-preview',
  description: "This is a png only not a embed or something new welcome system will be coded!",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const image = await new canvas.Welcome()
  .setUsername("xixi52")
  .setDiscriminator("0001")
  .setMemberCount("140")
  .setGuildName("Server DEV")
  .setAvatar(message.author.displayAvatarURL({ format: "png" }))
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://st2.depositphotos.com/1265894/10726/i/950/depositphotos_107269762-stock-photo-winter-ice-frost-frozen-background.jpg")
  .toAttachment();
 
const attachment = new Discord.MessageAttachment(
    (await image).toBuffer(),
     "welcome-image.png"
     );
 
message.channel.send(attachment);
  },
};