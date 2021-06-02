const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: 'starboard-min',
    aliases: ['smin'],
    description: 'Minumun reactions required for starboard.',
    usage: '<number>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`You are missing permissions!`);

        if(!args[0] || isNaN(args[0])){
            var embed = new MessageEmbed()
            .setTitle(`${config.femoji}`)
            .setDescription(`Either you haven't specified a number or you have not given me an integer.`)
            .setColor('RANDOM')
            return message.channel.send(embed)
        }
        
        const number = parseInt(args[0]);
        if(number === 0 ){
            var embed2 = new MessageEmbed()
            .setTitle(`${config.femoji}`)
            .setDescription(`The number that you have given is not aobve 0.`)
            .setColor('RANDOM')
            return message.channel.send(embed)
        }

        db.set(`targetstar_${message.guild.id}`, number)
        var embed3 = new MessageEmbed()
        .setTitle(`${config.semoji}`)
        .setDescription(`Success! Minimun reactions required to be in the starboard is now set as: ${number}`)
        .setColor('RANDOM')
        return message.channel.send(embed3)
    }
}