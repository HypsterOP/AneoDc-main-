const { Client, Message, MessageEmbed } = require('discord.js');

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
      if(!message.member.hasPermission("BAN_MEMBERS")) return;
      const aneo = message.guild.me;
      if(!aneo.hasPermission("BAN_MEMBERS")) return message.channel.send(`I do not have permissions to ban members`)

      let banNoob = 
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.username === args[0]) ||
      message.guild.members.cache.find((m) => m.user.tag === args[0]) || 
      message.guild.members.cache.find((m) => m.user.id === args[0]);

      if(!banNoob) {
        return message.channel.send('Couldn\'t Find that member!')
      }

      if(banNoob.id === message.author.id) {
        return message.channel.send(`You cannot ban yourself`)
      }

      if(banNoob.id === client.user.id) {
        return message.channel.send(`You cannot ban me with my own command!`)
      }

      if(message.member.roles.highest.position <= banNoob.roles.highest.position) {
        return message.channel.send(`You're role is not higher than the member's role.`)
      }

      if(aneo.roles.highest.position <= banNoob.roles.highest.position){
        return message.channel.send(`My role is not above the member!`)
      }

      const reason = args[1] || "No reason provided";

      banNoob.ban(reason)

      const banedNoob = new MessageEmbed()
      .setTitle(`baned`)
      .setDescription(`baned ${banNoob}(${banNoob.id}) for ${reason}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Action performed by: ${message.author.username}(${message.author.id})`)

      message.channel.send(banedNoob)

    }
}