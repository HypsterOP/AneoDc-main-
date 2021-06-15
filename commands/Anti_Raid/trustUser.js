const { Client, Message, MessageEmbed } = require('discord.js');
const colors = require('colors')
const fs = require('fs')
module.exports = {
    name: 'trust-user',
    aliases: ['tu'],
    description: 'Trust a user',
    usage: '<@mention>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	    const prefix = await client.prefix(message)
	const mentions = message.mentions.users.first();

	const getm = message.guild.member(mentions)

	const guildID = message.guild.id;
	const owner = message.guild.ownerID;

	const path = `database/guilds/${guildID}.json`;

	fs.access(path, fs.F_OK, (err) => {
		if(err){
			console.error(`File doesn't exist lol`.red)

		let none = new MessageEmbed()
		.setDescription(`${client.error} | Couldn't fetch the database for this server, use ${prefix}set to create a database.`)
		.setColor('2F3136')
		message.channel.send(none)
		} else {
		const Info = require(`../../database/guilds/${guildID}.json`)
		
		if (mentions){
			if(message.author.id === owner) {
				async function trustUser(id){
					const trusteduserArray = Info.Data.TrustListedUsers;
					const trusteduserIDArray = Info.Data.TrustListedUserIDs;

				if (isNaN(id)){
					return message.channel.send(`Please provide a valid user id`) && console.log(`Didn't provide a correct id`.red)
				}

				if (trusteduserArray.find((i) => i === id)){
					return message.channel.send(`${client.error} | That user is already trusted!`) && console.log(`Trusted User`.bgRed)
				}

				trusteduserArray.push(`<@${id}>`);
				trusteduserIDArray.push(id);

				const content = JSON.stringify(Info, null, 2);

				fs.writeFileSync(`database/guilds/${guildID}.json`, content, 'utf8')
				const success = new MessageEmbed()
				.setDescription(`${client.yes}| \`${getm.id}\` has been trusted.`)
				.setColor('2F3136')
				message.channel.send(success).then((m) => m.react(`${client.yes}`))

				console.log(id + ` has been trusted`.bgGreen)
				}
				trustUser(getm.id)
			} else {
				const unautho = new MessageEmbed()
				.setDescription(`You are not authorized to use this command.`)
				.setColor('2F3136')
				message.channel.send(unautho).then((msg) => msg.react(`${client.error}`))
			}
		} else {
			const noID = new MessageEmbed()
			.setDescription(`No user mentioned`)
			.setColor('2F3136')
			return message.channel.send(noID)
		}
		}
	})
    }
}