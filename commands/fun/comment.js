/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "comment",
  run: async (client, message, args) => {
    let yee = false;
    message.channel.startTyping();
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let image = await canvacord.Canvas.youtube({
      username: message.author.username,
      content: args.join(" "),
      avatar: avatar,
    }).catch((err) => {
      yee = true;

      message.channel.stopTyping();
      return message.channel.send(err.toString());
    });
    let msg = args.join("");

    if (!yee) {
      let attachment = new Discord.MessageAttachment(image, "comment.png");
      let embed = new MessageEmbed()
        .setAuthor(`Connecting YouTube`)
        .setColor("NAVY");
      message.channel
        .send({ embeds: [embed] })
        .then((msg) => {
          setTimeout(function () {
            msg.delete().then((msg) => {
              message.channel.send({files: [attachment]});
            });
          }, 5000);
        });
      message.channel.stopTyping();
    }
  },
};
