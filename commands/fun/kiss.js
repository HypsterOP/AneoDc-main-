const discord = require('discord.js')

module.exports = {
    name: "kiss",
    description: "kisses a user UwU",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.author;

        const user2 = message.mentions.members.first()

        if(!user2) return message.channel.send('Whom do you want to kiss Uwu <a:M_kiss:824544053781725234>')

        message.channel.send(
            new discord.MessageEmbed()
            .setDescription(`${user} Kisses ${user2} Aww So cute <a:M_kiss:824544053781725234>`)
            .setImage(`https://media.tenor.com/images/a6669f4044d66658c7ce96be768965e4/tenor.gif`)
            .setColor('BLUE')
        )
    }
}