const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'set-max-channel-create-limt',
    aliases: ['smccl'],
    description: 'Set the max channel create limit **Anti Raid**',
    usage: '<number>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const db = client.db;
        if(await db.has(`anti_raid-${message.guild.id}`)) {
        let NUMber = parseInt(args[0])

        if(!NUMber) message.channel.send(`[Anti-Raid]: The number is missing. Here is an example: ${ await client.prefix(message)}set-max-channe-create-limit 5`)

        } else {
            return message.channel.send(`You cannot use this command as anti raid module is not enabled.`)
        }
    }
}