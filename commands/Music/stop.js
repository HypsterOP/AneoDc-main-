const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'stop', // Optional
    category: 'Music',
    description: 'Clears the queue and leave the vc', 
    aliases: ['st', 's'], // Optional
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor('#FF5757')
            .setDescription(`You need to be in a vc to execute this command!`)
            if (!voice_channel) return message.channel.send(embed);
            if (!client.player.getQueue(message)) return message.channel.send(`No music currently playing !`);
            let isDone = client.player.stop(message);
            message.channel.send( new MessageEmbed()
            .setColor('#85b0d2')
            .setDescription('Music stopped!')
            )
    }
}