/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
let Discord = require("discord.js");
module.exports = {
  name: "latest-video",
  aliases: ["lvid", "latest-vid", `allvids`],
  description: " ",
  usage: " ",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let prefix = await client.prefix(message);
    let ChannelLink = args[0];
    if (!ChannelLink)
      return message.reply(`:x: Usage: \`${prefix}latest-video <link>\``);
    //get the Latest Videos
    client.YTP.getLatestVideos(ChannelLink)
      .then((Videos) => {
        //console.log(Videos) See the Responses: https://github.com/Tomato6966/discord-yt-poster/wiki/Responses
        //define the Embed
        let embed = new Discord.MessageEmbed()
          .setTitle(`Videos of ${Videos[0].author}`)
          .setColor("RED")
          .setURL(ChannelLink);
        //For Each Video, add a new Field (just the first 10 Videos!)
        Videos.forEach((v, i) => {
          if (i < 10) {
            embed.addField(
              v.title,
              `[Watch it](${v.link}) | Published at: \`${v.pubDate}\``
            );
          }
        });
        //Send the Message
        message.channel.send({ embed: embed }).then((msg) => msg.react("👍"));
      })
      .catch((e) => {
        console.log(e);
        message.reply(`${e.message ? e.message : e}`, { code: "js" });
      });
  },
};
