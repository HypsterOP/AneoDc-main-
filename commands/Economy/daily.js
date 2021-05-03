const { Client, Message, MessageEmbed } = require('discord.js');
const cooldown = new Map()
module.exports = {
    name: 'daily',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(cooldown.has(message.author.id)) {
            message.reply(`You are on a 1 day cooldown`)
        } else {

            const jobs = ["Footballer", "Driver", "Chef", "Doctor", "Cosplayer"]

            const job = Math.floor(Math.random() * jobs.length);
            const coins = Math.floor(Math.random() * 2000) + 1;
    
            message.channel.send(
                new MessageEmbed()
                .setTitle(`Earned Coins`)
                .setDescription(`You have got **${coins}** Coins, Come back tomorrow again to claim your daily reward!`)
            )
            client.add(message.author.id, coins)

            cooldown.add(message.author.id)
            setTimeout(() => {
                cooldown.delete()
            }, 86400000)
        }
    }
}