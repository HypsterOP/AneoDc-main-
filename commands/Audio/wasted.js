const { Client, Message, MessageEmbed } = require('discord.js');
const path = require('path')
module.exports = {
    name: 'wasted-audio',
    aliases: ['wa'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const { voice } = message.member;

        if(!voice.channelID) {
            message.reply("You must be in a voice channel!")
            return;
        }

        voice.channel.join().then((connection) => {
            connection.play(path.join(__dirname, 'wasted.wav'))
        })
    }
}