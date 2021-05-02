const { Client, Message, MessageEmbed } = require('discord.js');
const { FastType } = require("weky")
const txtgen = require('txtgen');
module.exports = {
    name: 'fast-type',
    aliases: ['fast'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const sentence = txtgen.sentence();
        const game = new FastType({
            message: message,
            winMessage: "Congrats you won",
            sentence: sentence,
            loseMessage: "You lost ;(",
            time: 50000,
            startMessage: "Good Luck Hope you win!"
        })

    game.start()
    }
}