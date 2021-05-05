const { Client, Message, MessageEmbed } = require('discord.js');
const Guild = require("../../models/Guild")
module.exports = {
    name: 'set-counting-channel',
    aliases: ['sc'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
        const channel = message.mentions.channels.first()
        if(!channel) message.reply("You need to mention a channel!")

        Guild.findOne({
            id: message.guild.id,
        }, async (err, data) => {
           if(err) throw err;
           if( data) {
            data.Channel = channel.id
           }  else {
               data = new Guild({
                   id: message.guild.id,
                   Current: 0,
                   Channel: channel.id
               })
           }
           data.save();

           message.channel.send(`Counting Channel is now set as ` + channel.toString());
        })
    }
}