const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/welcomeChannel');
  
module.exports = {
    name: 'set-channel',
    aliases: ['shl'],
    description: 'This command helps you sets the welcome channel!(is it for both welcome and goodbye)',
    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You do not have permission to use this command');

       const channel = message.mentions.channels.first();
       if(!channel) return message.reply('Please tell me a welcome channel!');

       Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
           if(data){
               data.Channel = channel.id;
               data.save();
           } else {
               new Schema({
                   Guild: message.guild.id,
                   Channel: channel.id,
               }).save();
           }
           message.reply(`${channel} has been set as the Welcome Channel of this server!`)
       })
    }
}