const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'update',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== '800331322089537538') return;

        let mention;

        if(!args.length) return message.channel.send('> Usage: announce <#channel> <message> <-ping ?>');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('tell me a channel!');

        if(!args[1]) return message.reply('tell me the new update hypster');

        
        if(args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++ ) {
                if(args[i].toLowerCase() === '-ping') args.splice(i, 1);
            }

            mention = true;
        } else mention = false;

        if(mention === true) channel.send('<@&823925286424674327>');

        channel.send(
            new MessageEmbed()
                .setTitle('New Update!')
                .setDescription(args.slice(1).join(" "))
                .setTimestamp()
                .setColor('RANDOM')
        )


    }
}