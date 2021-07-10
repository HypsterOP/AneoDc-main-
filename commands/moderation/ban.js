/* eslint-disable */
const { Client, Message, MessageEmbed, Permissions } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'ban',
    description: 'ban a user',
    usage: "ban <member> [reason]",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return;
      const ayumu = message.guild.me;
      if (!ayumu.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
        return message.channel.send({content:`I do not have permissions to ban members`});

      let kickNoob = 
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) || 
      message.guild.members.cache.find((m) => m.user.id === args[0]);

      if(!kickNoob) {
        return message.channel.send({content:'Couldn\'t Find that member!'})
      }

      if(kickNoob.id === message.author.id) {
        return message.channel.send({content: `You cannot ban yourself`})
      }

      if(kickNoob.id === client.user.id) {
        return message.channel.send({content:`You cannot ban me with my own command!`})
      }

      if(message.member.roles.highest.position <= kickNoob.roles.highest.position) {
        return message.channel.send({content: `You're role is not higher than the member's role.`})
      }

      if(ayumu.roles.highest.position <= kickNoob.roles.highest.position){
        return message.channel.send({content: `My role is not above the member!`})
      }

      const reason = args[1] || "No reason provided";

      kickNoob.ban({ reason: reason })
      message.channel.send({ content: `Banned ${kickNoob.displayName} with the reason ${reason} Moderator: ${message.author.tag}` })

    }
}