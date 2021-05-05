const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("../../models/Interantionnal-chat")
module.exports = {
    name: 'add-channel',
    aliases: ['ac'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return;
        db.findOne({ Guild: message.guild.id, Channel: message.channel.id, Activated: true }, async(err, data) => {
            if(data) return message.channel.send(
                "There is already an international chat channel setup!"
                );

                data = new db({
                    Guild: message.guild.id,
                    Channel: message.channel.id,
                    Author: message.author.id,
                    Activated: true,
                });

                data.save();

                message.channel.send(
                    `${message.channel} is now an international chat-channel`
                    )
        })
    }
}