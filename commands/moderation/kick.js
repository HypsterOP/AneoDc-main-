const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'kick',
    description: 'kick a user',
    usage: "kick <member> [reason]",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      if(!message.member.hasPermission("KICK_MEMBERS")) return;
      const aneo = message.guild.me;
      if(!aneo.hasPermission("KICK_MEMBERS")) return message.channel.send(`I do not have permissions to kick members`)

      let kickNoob = 
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) || 
      message.guild.members.cache.find((m) => m.user.id === args[0]);

      if(!kickNoob) {
        return message.channel.send('Couldn\'t Find that member!')
      }

      if(kickNoob.id === message.author.id) {
        return message.channel.send(`You cannot kick yourself`)
      }

      if(kickNoob.id === client.user.id) {
        return message.channel.send(`You cannot kick me with my own command!`)
      }

      if(message.member.roles.highest.position <= kickNoob.roles.highest.position) {
        return message.channel.send(`You're role is not higher than the member's role.`)
      }

      if(aneo.roles.highest.position <= kickNoob.roles.highest.position){
        return message.channel.send(`My role is not above the member!`)
      }

      const reason = args[1] || "No reason provided";

      kickNoob.kick(reason)

      const bannedNoob = new MessageEmbed()
      .setTitle(`<:kick:846290502960545823> | Kicked`)
      .addFields({
        name: `${config.semoji} | User's Name`,
        value: `${kickNoob.displayName}`
      }, {
        name: `${config.semoji} | User Id`,
        value: `${kickNoob.id}`
      }, {
        name: `${config.semoji} | Reason`,
        value: `${reason}`
      }, {
        name: `Action By`,
        value: `${config.semoji} | User Name ${message.author.username}, User Id ${message.author.id}`
      })
      .setColor('RANDOM')

      message.channel.send(bannedNoob)

    }
}