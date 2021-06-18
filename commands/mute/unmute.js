const { Message } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        try {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return;
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} is now unmuted`)
        } catch (e) {
            return message.channel.send(`An error has occured, please try again. If this keeps happening please dm HypsterOP#5687 his dms are always open`)
        }
    }
}