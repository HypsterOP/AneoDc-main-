const client = require('../index')
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
client.on('message', async(message) => {
	if(!message.guild || message.author.id === client.user.id) return;
	const pecentageLIMIT = await db.fetch(`anticaps_${message.guild.id}`)
	if(pecentageLIMIT === null) return;
	let contentstring = message.content;
	if(contentstring.split(" ").join(" ").length < 8) return;
	var uppercaselength = contentstring.replace(/[^A-Z]/g, "").length;
	var wholelength = contentstring.length;
	var percent = Math.ceil(uppercaselength/wholelength * 100);
	if(percent >= pecentageLIMIT){
		message.delete()
		message.channel.send(
			new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription(`${message.author.tag} Please do not send excessive capitals.`)
			.setFooter(`Capitals threshold exceeded`)
			.setColor('#2F3136')
		)
	}
})