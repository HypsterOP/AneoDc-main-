const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("../../models/mod-logs")
module.exports = {
    name: 'logs',
    aliases: ['log'],
    usage: "<disable>/<set>",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        const options = [
            "set",
            "disable"
        ]

        if(!args.length) return message.lineReply(`You need to provide an option! The valid options are - set, disable`)
        const opt = args[0].toLowerCase();
        if(!opt) return message.lineReply(`That is not a valid option!`)

        if (!options.includes(opt)) return message.lineReply('That is not a valid option!')

        if(opt === "set") {

            const channel = message.mentions.channels.first();
            if (!channel) return message.lineReply('Please provide the channel to set as!')

            db.findOne({
                guild: message.guild.id
            }, async(err , data) => {
                if(!data) {
                    data = new db({
                        guild: message.guild.id,
                        channel: channel.id
                    }).save();
                    return message.lineReply(`The logs channel has been set as <#${channel.id}>!`)
                } else {
                    return message.lineReply(`The logs channel has already been set as <#${data.channel}>!`)
                }
            })
        } else {
            db.findOne({
                guild: message.guild.id
            }, async(err ,data) => {
                if(!data) {
                    return message.lineReply(`The logs channel has not been set yet!`)
                } else {
                    await db.findOneAndDelete({ guild: message.guild.id }, data)
                    data.save();
                    return message.lineReply(`The logs channel has been reseted and the logs command has been disabled!`)
                }
            })
        }
    }
}