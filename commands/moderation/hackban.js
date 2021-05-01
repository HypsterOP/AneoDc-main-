const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'hackban',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return;

        let userID = args[0];
        let reason = args.slice(1).join(' ');

        if(!userID) return message.reply("Please give a correct user id");
        if(isNaN(userID)) return message.reply("Id must be a number");
        if (userID === message.author.id) return message.reply("You cant ban yourself")
        if(userID === client.user.id) return message.reply("You can't ban me with my own command!")

        if(!reason) reason = "No reason provided";

        client.users.fetch(userID).then(async user => {
            await message.guild.members.ban(user.id, { reason: reason })
            return message.channel.send(
                new MessageEmbed()
                .setTitle("User Hack Banned")
                .setDescription(`User's Name : ${user.tag}`)
            )
        }).catch(error => {
            message.channel.send(`An error occurred: **${error}**`)
        })
    }
}