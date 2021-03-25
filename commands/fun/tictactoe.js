const { tictactoe } = require('reconlx')

module.exports = {
    name: 'tictactoe',
    run : async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.channel.send('Please tell me the member with whom you want to play tictactoe.')

        new tictactoe({
            player_two: member,
            message: message
        })
    }
}