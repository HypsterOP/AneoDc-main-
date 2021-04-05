const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
    name: 'daily',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let timeout = 86400000;
        let user = message.author;
        const amoun = [
            "500",
            "1000",
            "10000",
            "90",
            "1000",
            "69",
            "96",
            "143",
            "50000"
        ]

        const amount = amoun[Math.floor(Math.random() * amoun.length)];

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            return message.channel.send(
                new MessageEmbed()
                .setTitle(`Already Claimed`)
                .setDescription(`You have already claimed your daily, Come back in ${time.days}d, ${time.hours}h, ${time.seconds}s`)
                .setColor('RED')
            )
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            message.channel.send(
                new MessageEmbed()
                .setAuthor(`${amount}`)
                .setDescription(`You have claimed ${amount} <:aneocoin:828621697174208532> coins`)
                .setColor('GREEN')
            )
        }
    }
}