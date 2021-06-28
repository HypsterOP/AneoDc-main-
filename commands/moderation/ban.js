const { Client, Message, MessageEmbed } = require('discord.js');
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
      if(!message.member.permissions.has("BAN_MEMBERS")) return;
      const ayumu = message.guild.me;
      if(!ayumu.permissions.has("BAN_MEMBERS")) return message.channel.send(`I do not have permissions to ban members`)

      let kickNoob = 
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) || 
      message.guild.members.cache.find((m) => m.user.id === args[0]);

      if(!kickNoob) {
        return message.channel.send('Couldn\'t Find that member!')
      }

      if(kickNoob.id === message.author.id) {
        return message.channel.send(`You cannot ban yourself`)
      }

      if(kickNoob.id === client.user.id) {
        return message.channel.send(`You cannot ban me with my own command!`)
      }

      if(message.member.roles.highest.position <= kickNoob.roles.highest.position) {
        return message.channel.send(`You're role is not higher than the member's role.`)
      }

      if(ayumu.roles.highest.position <= kickNoob.roles.highest.position){
        return message.channel.send(`My role is not above the member!`)
      }

      const reason = args[1] || "No reason provided";

      kickNoob.ban({ reason: reason })

      const bannedNoob = new MessageEmbed()
      .setTitle(`<:banhammer:846290055706181682> | Banned`)
      .addFields({
        name: `${config.semoji} | User's Name`,
        value: `${kickNoob.displayName}`
      }, {
        name: `💳 | User Id`,
        value: `${kickNoob.id}`
      }, {
        name: `📖 | Reason`,
        value: `${reason}`
      }, {
        name: `Action By`,
        value: `${config.semoji} | Username ${message.author.username}, User Id ${message.author.id}`
      })
      .setColor('RANDOM')

      message.channel.send(bannedNoob)

    }
}