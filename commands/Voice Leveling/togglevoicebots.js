const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'togglebots',
    aliases: ['tvm'],
    description: 'Track the bots, on/off',
    usage: 'on/off',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        if(!message.member.permissions.has(`MANAGE_GUILD`)) return;

        let options = ['on', 'off'];

        if(!args[0])
            return message.channel.send(`Please mention an option, on, off`)
            
        if(args[0] === 'on') {
            return await client.discordVoice.trackbots(message.guild.id, true)
            && message.channel.send(`Okay! from now on i will track bot users too.`)
        }

            if(args[0] === 'off') {
            return await client.discordVoice.trackbots(message.guild.id, false)
            && message.channel.send(`Okay! from now on i will not track bot users.`)
            }

            if(!args[0].includes(options.length)) return message.channel.send(`Please mention off or on`)
    }
}