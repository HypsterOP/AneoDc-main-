const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leave',
    aliases: ['lev'],
    description: '',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!require('../../config.json').owners.includes(message.author.id))
        return;

        let guild = client.guilds.cache.get(args[0])

        if(!guild) return message.channel.send(`Error occured! ${error.message}`)

        await guild.leave()
        return message.channel.send(`✅ Name: ${guild.name}\nMember Count: ${guild.memberCount}`)
    }
}