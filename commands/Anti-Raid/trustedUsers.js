const { Client, Message, MessageEmbed } = require('discord.js');
const fs = require('fs')
const colors = require('colors')
module.exports = {
    name: 'trusted-users',
    aliases: ['tus'],
    description: 'See the trusted users.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	    if(!message.member.permissions.has('MANAGE_GUILD')) return;
	    const prefix =  await client.prefix(message)
	const ID = message.guild.id;

	const path = `database/guilds/${ID}.json`;

	fs.access(path, fs.F_OK, (err) => {
		if (err){
		console.error('File: ' + path + ' does not exist'.red)

		const nothing = new MessageEmbed()
		.setDescription(`This server does not have a database setup. use ${prefix}set to create a new database.`)
		.setColor('2F3136')
		message.channel.send(nothing)
		} else {
			const Info = require(`../../database/guilds/${ID}.json`)

			if(Info.Data.TrustListedUserIDs.length > 0){
				const list = new MessageEmbed()
				.setAuthor(`Trusted users list for ${message.guild.name} | Total: ${Info.Data.TrustListedUserIDs.length} trusted users`, message.guild.iconURL({ dynamic: true }))
				.setDescription(`${Info.Data.TrustListedUsers}`)
				.setColor('2F3136')
				message.channel.send(list)
			} else {
				const xd = new MessageEmbed()
				.setDescription(`No Trusted users yet.`)
				.setColor('2F3136')
				return message.channel.send(xd)
			}
		}
	})
    }
}