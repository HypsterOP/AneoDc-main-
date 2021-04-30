const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    cooldown: 1000*60*60*2,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const jobs = ["Footballer", "Driver", "Chef", "Doctor", "Cosplayer"]

        const job = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 20000) + 1;

        message.channel.send(
            new MessageEmbed()
            .setTitle(`It Payed off`)
            .setDescription(`You worked as a ${jobs[job]} and earned **${coins}** Coins`)
        )
        client.add(message.author.id, coins);
    }
}