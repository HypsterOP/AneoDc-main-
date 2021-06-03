const { Client, Message, MessageEmbed } = require('discord.js');
const { TicTacToe } = require('weky')
module.exports = {
    name: 'tictactoe',
    aliases: ['ttc'],
    description: 'Play a tictac toe game',
    usage: '@user',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const opponent = message.mentions.users.first();
        if(!opponent) return message.lineReply(`Whom do u wanna play with?`)
        const game = new TicTacToe({
            message: message,
            opponent: opponent, //opponent
            xColor: 'red', //x's color
            oColor: 'blurple', //zero's color
            xEmoji: '❌',  //the x emoji
            oEmoji: '0️⃣' ,//
        })

        game.start();
    }
}