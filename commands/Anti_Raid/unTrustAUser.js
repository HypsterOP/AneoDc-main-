const { Client, Message, MessageEmbed } = require('discord.js');
const colors = require('colors')
const fs = require('fs')
const { red } = require('chalk')
module.exports = {
    name: 'untrust-user',
    aliases: ['uu'],
    description: 'Un trust a user',
    usage: '<@mention>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	    const prefix = await client.prefix(message)
	const Mentioned = message.mentions.users.first();
	const GetMember = message.guild.member(Mentioned);

	const guildID = message.guild.id;
        const Owner = message.guild.ownerID;

	const path = `database/guilds/${guildID}.json`;

	fs.access(path, fs.F_OK, (err) => {
		if(err) {
			console.error(red('File: ' + path + ' does not exist'));

			const nothing = new MessageEmbed()
			.setDescription(`No database found for this server, use ${prefix}set to create a database.`)
			.setColor('2F3136')
			message.channel.send(nothing)
		} else {
			const Info = require(`../../database/guilds/${guildID}.json`)

			const Trusted = Info.Data.TrustListedUserIDs.find((user) => user === `${message.author.id}`)

			if(Mentioned) {

				if(message.author.id === Owner) {
					 function UnTrustUser(ID) {
						const TrustedUserArray = Info.Data.TrustListedUsers;
                           			const TrustedUserIDArray = Info.Data.TrustListedUserIDs;

						if(isNaN(ID)) {
                                			return message.reply('Please Provide a valid ID.') || console.error(red('ERROR: PROVIDE VALID NUMBER'));
						}

							const FindID = TrustedUserIDArray.find((el) => el === ID);
							const InArray = TrustedUserIDArray.includes(FindID);
							const ElIndex = TrustedUserIDArray.indexOf(FindID);
							TrustedUserIDArray.splice(ElIndex, 1)

							const FindID2 = TrustedUserIDArray.find((el) => el === `<@${ID}>`);
							const ElIndex2 = TrustedUserIDArray.indexOf(FindID2);
							TrustedUserArray.splice(ElIndex2, 1);

							const content = JSON.stringify(Info, null ,2)

							if (InArray === false) {
								console.log(`User is not in the list!`.red)

								const ooof = new MessageEmbed()
								.setDescription(`Error! That user is not in the database.`)
								.setColor('2F3136')
								message.channel.send(ooof)
							} else {
								fs.writeFileSync(`database/guilds/${guildID}.json`, content, 'utf8');

								const ok = new MessageEmbed()
								.setDescription(`Removed trust from \`${GetMember.id}\``)
								.setColor('2F3136')
								message.channel.send(ok);
							}
					 }
					 UnTrustUser(GetMember.id);
				} else {
					const unauth = new MessageEmbed()
					.setDescription(`You are not authorized to use this command, server owner only.`)
					.setColor('2F3136')
					message.channel.send(unauth)
				}
			} else {
				const bruhareumad = new MessageEmbed()
				.setDescription(`No user mentioned!`)
				.setColor('2F3136')
				message.channel.send(bruhareumad)
			}
		}
	})
    }
}