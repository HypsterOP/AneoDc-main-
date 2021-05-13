const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'balance',
    aliases: ['bal'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profiles = new db.table(`profiles`)

        const member = message.mentions.members.first() || message.member;

        const memberProfile = profiles.get(`profiles_${member.id}`)

        if(!memberProfile) return message.reply(`That user haven't setup thier profile!`)

        const bal = profiles.get(`profiles_${member.id}.money`) || 0;

        return message.channel.send(`${member} has ${bal.toLocaleString()}$`)
    }
}