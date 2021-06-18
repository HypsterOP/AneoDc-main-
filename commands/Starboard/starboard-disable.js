const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
module.exports = {
    name: 'starboard-disable',
    aliases: ['sd'],
    description: 'Disable starboard.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
        if(!message.member.permissions.has('MANAGE_GUILD')) return message.reply(`You are missing permissions!`);
        if(!db.has(`starboard_${message.guild.id}`)){
            return message.channel.send(`${message.guild.name} hasn't setup starboard yet :star:`);
        }
        db.delete(`starboard_${message.guild.id}`)
        return message.lineReplyNoMention(`Removed :star: Star board`)
    } catch (e) {
        return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
    }
    }
}