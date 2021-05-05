const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("../../models/Interantionnal-chat")
module.exports = {
    name: 'remove-channel',
    aliases: ['rc'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return;

        const query = {
             Guild: message.guild.id,
              Channel: message.channel.id,
               Activated: true
             }
        db.findOne(query, async(err, data) => {
            if (data) {
                await db.findOneAndDelete(query)
                return message.channel.send(`${message.channel} has been removed form the international chat-channel`
                );
            }

            message.channel.send(`${message.channel} is not listed as an international chat-channel!`)
        })
    }
}