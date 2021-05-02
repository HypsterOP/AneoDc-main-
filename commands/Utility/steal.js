const { Client, Message, MessageEmbed, Util } = require("discord.js");
const config = require("../../config.json")
module.exports = {
  name: 'steal',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_EMOJIS")) return;
    if(!args.length) return message.channel.send('No emoji specified');

    for (const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji);

        if(parsedEmoji.id) {
            const extension = parsedEmoji.animated ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
            message.guild.emojis.create(url, parsedEmoji.name)
                .then((emoji) => message.channel.send(`Added the emoji with the link: \`${emoji.url}\``))
        }
    }
  },
};