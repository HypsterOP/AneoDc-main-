const { Client, Message, MessageEmbed } = require('discord.js');
const panther = require('path')
const mv = require('mv')
const fs = require('fs')
const colors = require('colors')
module.exports = {
    name: 'set',
    aliases: [''],
    description: 'Setup a database for your server',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	const guildID = message.guild.id;
	const owner = message.guild.ownerID;

	const path = `database/guilds/${guildID}.json`;
	const path2 = `database/backup-guilds/${guildID}.json`;

	if(fs.existsSync(path2)){
		fs.access(path2, fs.F_OK, (err) => {
			if(err){

				if(message.author.id === owner) {

				} else {
					const unauth = new MessageEmbed()
					.setDescription(`Only the server owner can use this command`)
					.setColor(`2F3136`)
				message.channel.send(unauth)
				}
			} else {
				function backUpRet(){

					const guildID = message.guild.id;

					const currentPath = panther.join(__dirname, "../../database/backup-guilds/", `${guildID}.json`)
					const destination = panther.join(__dirname, "../../database/guilds/", `${guildID}.json`);

					mv(currentPath, destination, function (err){
						if (err){
							console.log(`Unable to move the file path: ` + currentPath + ' to guild database\n\n' + `${err}`.bgRed)
						} else {
							console.log(`Transferred data file to guild database\n`.bgGreen)
							const success = new MessageEmbed()
							.setDescription(`${client.yes} | Successfully transfered data to **GUILD** database`)
							.setColor(`2F3136`)
						return message.channel.send(success)
						}
					});
				}

				console.error('File: ' + path2 + ' already exists'.bgMagenta)

				const respond = new MessageEmbed()
				.setDescription(`Server already found in database. To get old data type in chat \`yes\``)
				.setColor('2F3136')

				const filter = m => m.author.id == owner;
				message.channel.send(respond).then(() => {
					message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
					.then(collected => {
						message = collected.first();
						if(message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
							backUpRet();
						} else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase == 'N') {
							const cancel = new MessageEmbed()
							.setDescription(`Process has been terminated.`)
							.setColor('2F3136')
						return message.channel.send(cancel);
						}
					}).catch(() => {
						console.log(`They ran out of time`.bgMagenta);
						const failXD = new MessageEmbed()
						.setDescription(`Error! You ran out of time`)
						.setColor('2F3136')
					return message.channel.send(failXD)
					});
				})
			}
		})
	} else {
		fs.access(path, fs.F_OK, (err) => {
			if(err) {

				if(message.author.id === owner) {

					function setGuildDB(id, name){
						id = message.guild.id;
						name = message.guild.name;

						const data = {
							guildID: id,
							guildName: name,
							Data: {
								Owner: message.guild.owner.user.tag,
								OwnerID: message.guild.ownerID,
								WhiteListedUserIDs: [],
								WhiteListedUsers: [],
								BlackListedUserIDs: [],
								BlackListedUsers: [],
								TrustListedUserIDs: [],
								TrustListedUsers: [],
							}
						}

						const content = JSON.stringify(data, null, 2)

						fs.writeFileSync(`./database/guilds/${id}.json`, content, 'utf8', function (err) {
							if(err){
								return console.error(err + " Unable to make file");
							} else {
								const yes = new MessageEmbed()
								.setDescription(`Successfully create the database for ${message.guild.name}!`)
								.setColor('2F3136')
							return message.channel.send(yes);
							}
						});
					}
					setGuildDB();
				} else {
					const unauth = new MessageEmbed()
					.setDescription(`401 | You are unauthorized to use this command. Only the owner of ${message.guild.name} can use it.`)
				}
			} else {
				console.error('Lol that server already exists')

				const err = new MessageEmbed()
				.setDescription(`${client.error} | This guild is already there in my database.`)
				.setColor('2F3136')
			message.channel.send(err);
			}
		})
	}
    }
}