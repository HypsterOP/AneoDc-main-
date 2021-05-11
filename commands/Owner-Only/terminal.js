const child = require("child_process")
const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json").owners
module.exports = {
    name: 'terminal',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!require("../../config.json").owners.includes(
            message.author.id
        )
        )
        return;

        const command = args.join(' ')
        if(!command) return message.reply(`Stubid, Hypster Or Tech freaking give me the cmd!`)

        child.exec(command, (err, res) => {
            if(err) return message.reply(`Lmao something bad happened`)
            message.channel.send(res.slice(0, 2048), {code: "js"})
        })
    }
}