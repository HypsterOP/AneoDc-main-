const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        const member = message.mentions.members.first();
        if(!member) return message.channel.send('Please mention a correct user to kick!');

        if(member.id === message.author.id) return message.reply("You cannot kick yourself!")

        if(member.id === client.user.id) return message.reply("You cannot kick me with my own command!")

        if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send("You're role is not higher than the member.")

      const reason = args.slice(1).join(" ") || "No reason provided";
        member.kick({ reason: reason})
        message.channel.send(
          new MessageEmbed()
          .setTitle('Kicked')
          .setDescription(`Kicked ${member} for ${reason}.`)
          .setColor('RANDOM')
        )
    },
};