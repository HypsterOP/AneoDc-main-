const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
       try {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;

        const id = args[0];
        if(!id) return message.channel.send('Please give me a correct id')

        if(isNaN(id)) return message.channel.send(`Provided id must be a number!`)

        if(id.length < 18) return message.reply(`User id's are atleast 18 characters.`)

        if(id.length > 18 ) return message.reply(`User id's are not that long.`)

        const bannedMembers = await message.guild.fetchBans(id);
        if(!bannedMembers) return message.channel.send("Couldn't find that member in the ban list!")

        message.guild.members.unban(id);

        message.channel.send(
          new MessageEmbed()
          .setTitle('Unbanned')
          .setDescription(`Unbanned the user ${id}`)
          .setColor('RANDOM')
        )
        } catch {
          return message.reply(`An error has occured! Either the member doesn't exist in the ban list or something is wrong with the bot. `)
        }
    },
};