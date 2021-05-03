const { Client, Message, MessageEmbed } = require('discord.js');
const cooldown = new Map()
module.exports = {
    name: 'work',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(cooldown.has(message.author.id)) {
            message.reply(`You are on a 1 hour cooldown`)
        } else {
            
        const jobs = ["Footballer", "Driver", "Chef", "Doctor", "Cosplayer"]

        const job = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 20000) + 1;

        message.channel.send(
            new MessageEmbed()
            .setTitle(`It Payed off`)
            .setDescription(`You worked as a ${jobs[job]} and earned **${coins}** Coins`)
        )
        client.add(message.author.id, coins);

        cooldown.add(message.author.id)
        setTimeout(() => {
            cooldown.delete()
        }, 3600000)
        }
    }
}