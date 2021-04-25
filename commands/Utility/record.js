const { Client, Message, MessageEmbed } = require('discord.js');
const fs = require("fs")
module.exports = {
    name: 'record',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const voicechannel = message.member.voice.channel;
        if(!voicechannel) return message.channel.send("You need to join a vc to record audio");

        const connection = await message.member.voice.channel.join();
        const recevier = connection.receiver.createStream(message.member, {
            mode: "pcm",
            end: "silence"
        });

        const writer = recevier.pipe(fs.createWriteStream(`./recorded-${message.author.id}.pcm`));
        writer.on("finish", () => {
            message.member.voice.channel.leave();
            message.channel.send("Finished Recording audio");
        });
    },
};
