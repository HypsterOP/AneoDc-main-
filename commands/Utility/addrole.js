const { Message } = require('discord.js')
const config = require("../../config.json")
module.exports = {
    name : 'addrole',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        
        if(!message.member.hasPermission("MANAGE_ROLES")) return;
        
        const target = message.mentions.members.first()
        if(!target) return message.channel.send(`I couldn\'t find that member, or there was no member ${config.femoji} `) //when no member is pinged
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send('please mention a role')
        
        await target.roles.add(role)
        message.channel.send(`${target.user.username} has got a role! <:Hype_Role:821003023835987998>`)
    }
}