const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'profile',
    description: 'view the profile of another user.',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const profiles = new db.table('profiles')

        const member = message.mentions.members.first() || message.member;

        const memberProfile = profiles.get(`profiles_${member.id}`)

        const totalMoney = profiles.get(`profiles_${member.id}.totalmoney`)

        if(!memberProfile) return message.channel.send(`That user doesn't have a profile.`)

        const a = Object.entries(memberProfile.bought).flat()
        var m = [];

        for (let i =0; i < a.length; i++) if (i & 1) m.push(a[i])

        var number = 0;
        if(m[0]) number =+ m[0] * 0.25
        if(m[1]) number =+ m[1] * 0.5
        if(m[2]) number =+ m[2] * 1

        return message.channel.send(new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${member.user.username}'s Profile`)
        .addFields(
            { name: "Money", value: memberProfile.money.toLocaleString() },
            { name: "Money per minute", value: number.toLocaleString() }
        )
        )
    }
}