/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "lastvideo",
  aliases: ["last-vid"],
  description: " ",
  usage: " ",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let prefix = await client.prefix(message);
    let Discord = require("discord.js");
    let ChannelLink = args[0];
    if (!ChannelLink)
      return message.reply({content: `:x: Usage: \`${prefix}lastvideo <link>\``});
    //get the latest videos
    client.YTP.getLatestVideos(ChannelLink)
      .then((videos) => {
        let video = videos[0];
        let time = new Date(video.pubDate);
        //define the embed
        let embed = new Discord.MessageEmbed()
          .setTitle(video.title)
          .setURL(video.link)
          .setColor("RED")
          .setFooter(`ID: ${video.id}`)
          .setTimestamp(time.getTime());
        //Send the Message
        message.channel
          .send({ content: `${video.link}`, embed: embed })
          .then((msg) => msg.react("👍"));
      })
      .catch((e) => {
        console.log(e);
        message.reply(`${e.message ? e.message : e}`, { code: "js" });
      });
  },
};
