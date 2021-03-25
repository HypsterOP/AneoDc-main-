module.exports = {
    name: 'ban',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Hello there, i see you do not have the permission to ban members <a:warning:818327691052318731>')
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('Hello there! I see that i do not have the permission to ban members. Try giving it to me and trying again <a:warning:818327691052318731>')
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('I couldn\'t find that member, or there was no member. <a:warning:818327691052318731>')

        await Member.ban({ reason : args.slice(1).join(" ") })

        message.channel.send(`${Member.user.tag} has been banned from the server <a:eodTICK:820973048483151883>`)
    }
}