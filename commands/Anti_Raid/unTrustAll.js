const { Client, Message, MessageEmbed } = require('discord.js');
const fs = require('fs')
const colors = require('colors')
module.exports = {
    name: 'untrust-all',
    aliases: ['ua'],
    description: 'Untrust all the users',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	    const prefix = await client.prefix(message)
	const guildId = message.guild.id;
	const owner = message.guild.ownerID;

	const path = `database/guilds/${guildId}.json`;

	fs.access(path, fs.F_OK, (err) => {
		if (err){
		console.error('File: ' + path + ' does not exist'.red);

                const nothing = new Discord.MessageEmbed()
                    .setDescription(`Error: Cannot Fetch Data, use \`${prefix}set\` to create a database`)
                    .setColor(0x36393E)
                message.channel.send(nothing)
		} else {
			const Info = require(`../../database/guilds/${guildId}.json`)

			if(message.author.id === owner){
				async function UnWhiteListAll(){
					const Array = Info.Data.TrustListedUserIDs;

					if(Array.length === 0){

						const none = new MessageEmbed()
						.setDescription(`No users found in the trust database to remove.`)
						.setColor('2F3136')
					message.channel.send(none)

					} else {

						Info.Data.TrustListedUserIDs.length = 0;
						Info.Data.TrustListedUsers.length = 0;

						const content = JSON.stringify(Info, null, 2)

						fs.writeFileSync(`database/guilds/${guildId}.json`, content, 'utf8')
						console.log(`Cleared trusted user database for ${message.guild.name}`)
						const eyss = new MessageEmbed()
						.setDescription(`Cleared trusted users database!`)
						.setColor('2F3136')
						message.channel.send(eyss).then((mshg) => mshg.react(`${client.yes}`))
					}
				}
				UnWhiteListAll();
			} else {
				message.channel.send(
					new MessageEmbed()
					.setDescription(`Only the owner of this server can use the command.`)
					.setColor('2F3136')
				)
			}
		}
	})
    }
}