const { Client, Message, MessageEmbed } = require('discord.js');
const Nekoyasui = require('nekoyasui')
const prettyms = require('pretty-ms')
module.exports = {
    name: 'lavalink',
    aliases: ['ll'],
    description: 'Get to know the info about lavalink running on Ayumu',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
	try {
		const nodes = [...client.manager.nodes.values()];
		const embed = new MessageEmbed()
		embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
		embed.setDescription(
			nodes.map(node => {
				const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
          const memUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);
          const uptime = prettyms(node.stats.uptime, { verbose: true, secondsDecimalDigits: 0 });

	return `\`\`\`asciidoc
		Node Host Name : ${node.options.identifier}
		Node Status    : ${node.connected ? "Connected" : "Disconnected"}
		${node.connected ? `
		CPU Load : ${cpuLoad}%
		Memory Usage : ${memUsage} MB
		Uptime : ${uptime}
		Players : ${node.stats.playingPlayers} of ${node.stats.players} playing` : ""}\`\`\``;
			})
		)
	embed.setColor(`#2F3136`)
			
		return message.channel.send("", { embed: embed })
	} catch (e){
		return message.channel.send(`An error Occured: ${String(e.stack)}`)
	}
    }
}