module.exports = {
    name: 'purge',
    alias: ["clear"],
    run : async(client, message, args) => {
        const member = message.mentions.users.first();
        const messages = message.channel.messages.fetch()

        if(member) {
            const userMessages = (await messages).filter(
                (m) => m.author.id === member.author.id);
            await message.channel.bulkDelete(userMessages);
            message.channel.send(`${member} messages have been cleared`)
        } else {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Hello there, i see you do not have the permission to manage messages')
            if(!args[0]) return message.channel.send('Please give me a number of messages to delete/ purge.')
            if(isNaN(args[0])) return message.channel.send('Only number are allowed!')
            if(parseInt(args[0]) > 99) return message.channel.send('The amount max of messages i can delete are 99!')
    
                await message.channel.bulkDelete(parseInt(args[0]) + 1)
                    .catch(err => console.log(err))
                message.channel.send(`I have deleted ${args[0]} message(s)!`).then(m => m.delete({ timeout : 5000 }))
        }
    },
};