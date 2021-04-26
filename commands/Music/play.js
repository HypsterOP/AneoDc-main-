const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'play',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(
          new MessageEmbed()
          .setDescription(`<:error:826449624013078559> You need to be in a voice channel before you can use this command!`)
        )

        const qe = args.join(' ')
        if(!qe) return message.channel.send(
          new MessageEmbed()
          .setDescription(`${config.femoji} what song should i play?`)
        )

        await client.player.play(message, qe);
    },
};