const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'random-avatar',
    /**
     * 
     * @param {Client} client
     * @param {Message} message
     */
    run: async(client, message) => {
        const user = client.users.cache.random();

        message.channel.send(
            new MessageEmbed()
            .setColor('RANDOM')
            .setFooter(`${user.tag}'s avatar!`)
            .setImage(user.displayAvatarURL())
        )
    }
}