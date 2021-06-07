const { Snake } = require('weky')
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snake',
    aliases: ['snk'],
    description: 'Play a snake game!',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        new Snake({
            message: message,
            embed: {
                title: "Snake Game",
                color: "#gt4668",
                gameOverTitle: "Game Over! You lost"
            },
            emojis: {
                empty: '◼',
                snakeBody: "🐍",
                food: '🍇',

                up: "⬆",
                down: "⬇",
                left: '⬅',
                right: '➡'
            },
        }).start()
    }
}