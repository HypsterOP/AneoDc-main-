const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const db = require(`quick.db`)
const ms = require('parse-ms')
module.exports = {
    name: 'work',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let timeoutworked = 3600000
        let worked = await db.fetch(`worked__${message.author.id}`)

        let timeout = 1800000
        
        if(worked != null && timeout - (Date.now() - worked) > 0) {
            let time = ms(timeoutworked - (Date.now() - worked));
            message.channel.send(
                new MessageEmbed()
                .setAuthor(`Woah, Slow down!`)
                .setDescription(`You have already worked come back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
                .setColor("RED")
            )


        } else {
            const amount = [
                "100000",
                "9800",
                "690000",
                "50000",
                "1000000",
                "96000",
                "100",
                "500",
                "1000",
                "9000",
                "10"
            ]
            const amountearned = amount[Math.floor(Math.random() * amount.length)];

            let jobs = ["Ghost", "Cosplayer", "Footballer", "Astronaut", "ShopKeeper"]
            let job = jobs[Math.floor(Math.random() * jobs.length)]
            let embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}, it payed off`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, you worked as a ${job} and earned ${amountearned}`)
            .setColor("RANDOM")
            message.channel.send(embed)


            db.add(`money__${message.author.id}`, amountearned)
            db.set(`worked__${message.author.id}`, Date.now())

        }
    }
}