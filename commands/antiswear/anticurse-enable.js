const db = require('../../reconDB');

module.exports = {
    name: 'antiswear-on',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('I do not have permission to delete messages.')

        if(await db.has(`swear-${message.guild.id}`) === false) {
            await db.set(`swear-${message.guild.id}`, true)
            message.channel.send('AntiSwear has been turned on!')

        } else return message.channel.send('AntiSwear has already been turned on!')
    }
}