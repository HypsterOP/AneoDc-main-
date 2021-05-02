const { Message } = require('discord.js')
const config = require("../../config.json")
module.exports = {
    name : 'removerole',
    run : async(client, message, args) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return;
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send(`I couldn\'t find that member, or there was no member ${config.femoji} `) //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send(`There was no role like that or not found! ${config.femoji}`) //when no role is specified or pinged
        //now the code!
        await target.roles.remove(role) // adding the role to the user
        message.channel.send(`${target.user.username}\'s role has been removed <:Hype_Role:821003023835987998>`)

        .catch(error => {
            message.channel.send(`An Error Occured Make sure my roles is above the role which you want to give!`)
        })
    }
}