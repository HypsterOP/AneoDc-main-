const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'starboard-channel',
    aliases: ['sch'],
    description: 'Set the starboard channel',
    usage: '#channel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`You are missing permissions!`);
        if(!args[0]) return message.lineReply(`You haven't given the id a channel!`)
        var channel2 = message.mentions.channels.first();
        if(!channel2){
            var channelto = args[0];
            var channelto = client.channels.cache.get(channelto)
            if(!channelto){
                message.lineReply(`You have given me a wrong id!`)
                return;
            }
            var channel2 = channelto.id;
        } else {
            var channel2 = channel2.id;
        }
        db.set(`starboard_${message.guild.id}`, channel2)
        message.channel.send(`⭐ | Successfully setup starboard channel!`)
    } catch (e){
        return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
    }
    }
}