const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('parse-ms')
const db = require('quick.db')
module.exports = {
    name: 'daily',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let timeout = 86400000;
        let daily = await db.fetch(`daily__${message.author.id}`);
        const amouns = [
            "10000",
            "50000",
            "69780",
            "7809",
            "1",
            "69000",
            "100000",
            "110000",
            "1690000",
            "100001"
        ]
        const amount = amouns[Math.floor(Math.random() * amouns.length)];

        if(daily != null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`Woah, Slow down!`)
                .setDescription(`You have already claimed you daily come back in **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**`)
                .setColor("RED")
            )
        } else {
            let embed = new MessageEmbed()
            .setAuthor(`Daily`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Daily Reward**`)
            .addField(`Amount Given`, amount)
            .setColor("GREEN")
            message.channel.send(embed)

            db.add(`money__${message.author.id}`, amount)
            db.add(`daily__${message.author.id}`, Date.now())
        }
    }
}