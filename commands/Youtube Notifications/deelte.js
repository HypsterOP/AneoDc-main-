const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'delete',
    aliases: ['del'],
    description: 'Delete a youtube channel notification',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let prefix = await client.prefix(message);
         if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(":x: Not allowed!")
        let ChannelLink = args[0];
        if(!ChannelLink) return message.reply(`:x: Usage: \`${prefix}del <link>\``)
        client.YTP.deleteChannel(message.guild.id, ChannelLink)
        .then(ch =>{
            message.reply(`I deleted the Settings.`).then(msg=>msg.react("👍"))
        }).catch(e=>{
            console.log(e);
            message.reply(`${e.message ? e.message : e}`, {code: "js"})
        })
    }
}