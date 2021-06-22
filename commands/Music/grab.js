const { Client, Message, MessageEmbed } = require('discord.js');
 const ms = require('pretty-ms')
module.exports = {
    name: 'grab',
    aliases: ['gra', 'grb'],
    description: 'Saves the current song in your dms.',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	    const pause = '⏸'
	    let playing = '▶'
	    const player = client.manager.players.get(message.guild.id);
	    if(!player) return message.channel.send(`No player for this guild.`)
	message.author.send(
		new MessageEmbed()
		.setAuthor(`Songs has been saved!`, message.author.displayAvatarURL({
			dynamic: true
		}))
		.setThumbnail((`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`))
		.setURL(player.queue.current.uri)
		.setColor('RANDOM')
		.setTitle(`${player.playing ? `${playing}` : `${pause}`} **${player.queue.current.title}**`)
		.addField(`⏱ Duration:`, `\`${ms(player.queue.current.duration)}\``, true)
		.addField(`🎷 Song By: `, `\`${player.queue.current.author}\``, true)
		.addField(`🖇 Queue length: `, `\`${player.queue.length} Songs\``, true)
		.addField(`${playing} Play it:`, `\`${await client.prefix(message)}play ${player.queue.current.uri}\``)
		.addField(`🔎 Saved in:`, `<#${message.channel.id}>`)
	).catch(e => {
		return message.channel.send(`${client.error} You're Dms are closed.`)
	})

	message.react(`${client.yes}`).catch(e => console.log(e))
    }
}