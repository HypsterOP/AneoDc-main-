const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require("ms")
const config = require("../../config.json")
module.exports = {
    name: 'gend',
    aliases: ['end'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

        if(!args[0]) return message.reply("You need to specify the message ID!")

        if(isNaN(args[0])) return message.reply(`Message id must be a number.`)

        let giveaway = client.giveawaysManager.giveaways.find(
            g => g.messageID === args[0] && g.guildID === message.guild.id
        );
if(!giveaway) return message.channel.send(`I was not able to find a message with that id in this server.`)
        client.giveawaysManager.edit(giveaway.args[0], {
            setEndTimestamp: Date.now()
        })
        // sfsd againb XDDDDD
        .then(() => {
            message.channel.send('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with message ID ${giveaway.args[0]} is already ended.`)){
                message.channel.send('This giveaway is already ended!');
            } else {
                // console.error(e);
            message.channel.send('An error occured...');
            }
        })

    }
}
