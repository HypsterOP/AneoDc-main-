const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'lock',
    aliases: ['lo'],
    description: 'Lock a channel',
    usage: '<#channel/id/name>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has(`MANAGE_CHANNELS`)) return;
        if(!message.guild.me.permissions.has(`MANAGE_CHANNELS`)) return message.lineReply(`I am missing permission: **MANAGE_CHANNELS**.`);
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(u => u.name === args[0])
        if(!channel) return message.lineReply(`Couldn't find that channel or no channel mentioned.`)

        let msg = await message.channel.send(`${client.loading} Please wait`)

        try {
            channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === '@everyone'), {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            msg.edit(`🔐 Locked ${channel.name}`)
        } catch (e) {
            message.channel.send(`${client.error} An error has occured: ${e}`)
        }
    }
}