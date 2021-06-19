const { Client, Message, MessageEmbed } = require('discord.js');
let db = require('quick.db')
module.exports = {
    name: 'anticaps-disable',
    aliases: ['acccd'],
    description: 'Disable anti caps system',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	let limit = await db.fetch(`anticaps_${message.guild.id}`)
	if(limit === null) return message.channel.send(`Anti caps system has not been enabled in this guild.`)
	db.delete(`anticaps_${message.guild.id}`)
	const msg = await message.channel.send(`Removing from database ${client.loading}`)
	msg.edit(`${client.yes} Successfully disabled anti caps system.`)
    }
}