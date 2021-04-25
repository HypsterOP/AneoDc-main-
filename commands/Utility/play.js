const { Client, Message, MessageEmbed } = require('discord.js');
const fs = require('fs')
module.exports = {
    name: 'play-audio',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const voicechannel = message.member.voice.channel;
        if(!voicechannel) return message.channel.send("Join a voice channel!")

        if(!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send("Your audio isn't recorded")

        const connection = await message.member.voice.channel.join();
        const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

        const dispatcher = connection.play(stream, {
            type: "converted"
        });
        dispatcher.on("finish", () => {
            message.member.voice.channel.leave();
            return message.channel.send("finished playing the audio!")
        })
    }
}