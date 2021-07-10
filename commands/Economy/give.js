/* eslint-disable no-unused-vars */
const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "give",
  alaises: ["pay"],
  category: "economy",
  description: "Pay to Somebody",
  usage: "[mention | ID] <amount>",
  accessableby: "everyone",
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   * @returns 
   */
  run: async (client, message, args) => {
    try {
      let user2 = message.author;
      if (!args[0]) return message.channel.send({content:"Mention a user"});
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          (r) => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          (r) => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!user) return message.channel.send({content:"Not a valid user"});

      let member = db.fetch(`money_${user2.id}`);

      let embed1 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Mention someone to give`);

      if (!args[0]) {
        return message.channel.send({ embeds: [embed1] });
      }
      let embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Imagine giving money to yourself.`);

      if (user.user.id === message.author.id) {
        return message.channel.send({ embeds: [embed2] });
      }

      let embed3 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`How much are you giving? lol`);

      if (!args[1]) {
        return message.channel.send({ embeds: [embed3] });
      }
      let embed4 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Enter A Valid Amount LOL`);

      if (isNaN(args[1])) {
        return message.channel.send({ embeds: [embed4] });
      }
      let embed5 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`You don't have that much money lol`);

      if (member < args[1]) {
        return message.channel.send({ embeds: [embed5] });
      }

      let embed6 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`You have given ${user.displayName} ${args[1]} coins`);

      message.channel.send({ embeds: [embed6] });
      db.add(`money_${user.id}`, args[1]);
      db.subtract(`money_${user2.id}`, args[1]);
    } catch(err) {
      console.error(err);
    }
  },
};
