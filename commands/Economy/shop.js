const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'shop',
    aliases: ['sh'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const p = new db.table(`profiles`)

        const member = message.member.id;

        const sword = p.get(`profiles_${member}.bought.sword`)
        const crown = p.get(`profiles_${member}.bought.crown`)
        const ak47 = p.get(`profiles_${member}.bought.ak47`)

        return message.channel.send(new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`
Sword - $${(sword * 20 + 20 || "20").toLocaleString()} - $0.25/ 10s
${sword > 15 ? `Crown - $${(crown * 20 + 20 || "20").toLocaleString()} - $0.5/ 10s ` : ''}
${crown > 50 ? `Ak47 - $${(ak47 * 20 + 20 || "20").toLocaleString()} - $1 /10s` : ''}
`)
        )
    }
}