const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return;

        const id = args[0];
        if(!id) return message.channel.send('Please give me a correct id')

        const bannedMembers = await message.guild.fetchBans();
        if(!bannedMembers) return message.channel.send("Couldn't find that member in the ban list!")

        message.guild.members.unban(id);

        message.channel.send(
          new MessageEmbed()
          .setTitle('Unbanned')
          .setDescription(`Unbanned the user ${id}`)
          .setColor('RANDOM')
        )

        .catch(error)
        console.log(error)
        message.channel.send('An error has occured')
    },
};