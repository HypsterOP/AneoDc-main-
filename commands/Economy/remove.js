/* eslint-disable no-unused-vars */
const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "remove",
  aliases: ["rmm"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!require("../../config.json").owners.includes(message.author.id))
      return message.reply({content:`Only the owner can run this command`});

    let user = client.users.cache.get(args[0]);

    let member = db.fetch(`money_${message.author.id}`);

    if (!user) return message.reply({content: `not found`});

    if (!args[1]) {
      return message.reply(`Where amount?`);
    }

    let embed5 = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`You have removed coins from ${user} amount- ${args[1]}`);

    message.channel.send({ embeds: [embed5] });
    db.subtract(`money_${user.id}`, args[1]);
  },
};
