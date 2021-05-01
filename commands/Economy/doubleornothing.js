const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'double-or-nothing',
    aliases : ["don", "d"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Enter an amount to bet lol')

        if(isNaN(args[0])) return message.reply("Actually, use numbers lol")

        const amountToBet = parseInt(args[0])

        if(await client.bal(message.author.id) < amountToBet) return message.reply("You do not have that much balance to bet lol")

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        };

        if(random() === true) {
            const winAmount = amountToBet * 2;
            message.channel.send(`You have won ${winAmount} Congrats`)
            client.add(message.author.id, winAmount)
        } else {
            message.channel.send(
                `You lost ${amountToBet} i feel bad for you`
            );
            client.rmv(message.author.id , amountToBet)
        }
    }
}