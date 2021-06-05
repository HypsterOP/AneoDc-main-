const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
	name: 'owoify',
	aliases: ['owo'],
	description: 'Owoify youwe texew',
	usage: '<text>',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async(client, message, args) => {
    const text = args.join(' ')

    if(!text || text.length > 200) return message.channel.send(`oopsies, thats over the text limit or no text was provided uwu.`)

    if(text.includes('@')) return message.lineReply(`Owo, no pings`)

    const { owo } = await fetch(`https://nekos.life/api/v2/owoify?text=${encodeURIComponent(text)}`)
      .then(res => res.json())

      return message.channel.send(owo);
	}
}
