const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'stop',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
         if(!message.member.voice.channel) return message.channel.send(
          new MessageEmbed()
          .setDescription(`${config.femoji} You need to be in a voice channel before you can use this command!`)
        )

        client.player.stop(message);

        message.channel.send(
            new MessageEmbed()
            .setTitle("Stopped Playing!")
            .setDescription(`Stopped Playing , Leaving the voice channel!`)
            .setTimestamp()
        )
    },
};