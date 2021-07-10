/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "roast",
  description: "Roasts a user",
  usage: "@user",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send({content:
        `${client.error} Whom are you roasting? mention them`
      
      }
      );
    const mentions = message.mentions.members.first();
    if (!mentions)
      return message.lineReply({content:`${client.error} I could not find that user.`});
    let msg = await message.channel.send({content: `${client.yes} Preparing a roast...`});
    fetch(`https://evilinsult.com/generate_insult.php?lang=en&type=json`)
      .then((res) => res.json())
      .then((json) => {
        const roasted = new MessageEmbed()
          .setDescription(` ${mentions.user.tag} ${json.insult}`)
          .setColor("RANDOM")
          .setFooter(
            `Lmfao ${mentions.user.tag} just got roasted`
          );
        msg.delete();
        message.channel.send({embeds : [roasted]});
      });
  },
};
