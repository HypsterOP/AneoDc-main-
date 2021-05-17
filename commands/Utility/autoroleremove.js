const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../../reconDB');
module.exports = {
    name: 'autorole-remove',
    aliases: ['auto-remove'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission(`MANAGE_ROLES`)) return;
        const check = await db.has(`autorole-${message.guild.id}`);
        if(check === false) return message.lineReply(`This role doesn't have any auto-role setup`)
        const role = await db.get(`autorole-${message.guild.id}`);
        db.delete(role)
        message.lineReplyNoMention(`Removed the role!`)
    }
}