const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name : 'prefix',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_SERVER')) return;
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please give me the new prefix for the server.')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**`)
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Custom prefix in this server is now set to **${res}**`)
            }
        })
    }
}