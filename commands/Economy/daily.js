const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'daily',
    cooldown: 1000*60*60*24,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const jobs = ["Footballer", "Driver", "Chef", "Doctor", "Cosplayer"]

        const job = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 2000) + 1;

        message.channel.send(
            new MessageEmbed()
            .setTitle(`Earned Coins`)
            .setDescription(`You have got **${coins}** Coins, Come back tomorrow again to claim your daily reward!`)
        )
        client.add(message.author.id, coins)
    }
}