const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Hello there, i see you do not have the permission to manage roles <a:warning:818327691052318731>')
        
        const target = message.mentions.members.first()
        if(!target) return message.channel.send('I couldn\'t find that member, or there was no member. <a:warning:818327691052318731> ') //when no member is pinged
        const role = message.mentions.roles.first() 
        if(!role) return message.channel.send('No role specified') 
        
        await target.roles.add(role)
        message.channel.send(`${target.user.username} has got a role! <:Hype_Role:821003023835987998>`)
    }
}