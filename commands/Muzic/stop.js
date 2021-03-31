const { Client, Message, MessageEmbed } = require('discord.js');

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
          .setDescription(`<:error:826449624013078559> You need to be in a voice channel before you can use this command!`)
        )

        client.player.stop(message);
    },
};