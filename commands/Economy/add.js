/* eslint-disable no-unused-vars */
const Discord = require("discord.js");
const { Message, Client } = require('discord.js');
const ms = require("parse-ms");
require("../../");
const cf = require("../../config.json");
const db = require("quick.db");
module.exports = {
  name: "addmoney",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let user = message.guild.members.cache.get(args[0]);
    if (!require("../../config.json").owners.includes(message.author.id))
      return message.reply({content: `developer only`});
    let member = db.fetch(`money_${message.author.id}`);

    if (!user) {
      return message.reply({content: `You need to specify a member!`, 
        allowedMentions: { repliedUser: false },
      });
    }

    if (!args[1]) {
      return message.reply({content:"Specify an amount"});
    }

    let embed5 = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`You have payed ${user} ${args[1]}`);

    message.channel.send({embeds: [embed5]});
    db.add(`money_${user.id}`, args[1]);
  },
};
