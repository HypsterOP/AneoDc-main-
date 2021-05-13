const db = require("quick.db")
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shop',
    description: 'shows items that u can buy inside the bot ',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const p = new db.table('profiles')

        const member = message.member.id

        const sword = p.get(`profiles_${member}.bought.sword`)
        const crown = p.get(`profiles_${member}.bought.crown`)
        const fruits = p.get(`profiles_${member}.bought.fruits`)

        return message.channel.send(new MessageEmbed()
        .setColor('BLURPLE')
        .setDescription(`
Sword - $${(sword * 20 + 20 || "20").toLocaleString()} - $0.35/ 10s
${sword > 15 ? `Crown - $${(crown * 20 + 20 || "20").toLocaleString()} - $0.8/ 10s`: ''}
${crown > 50 ? `Fruits - $${(fruits * 20 + 20 || "20").toLocaleString()} - $1/ 10s` : ''}
        `)
        )
    }
}