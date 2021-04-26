const { Client, Message, MessageEmbed } = require('discord.js');
const jokee = require('discord-jokes')
module.exports = {
    name: 'joke',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        jokee.getRandomDadJoke (function (joke) {
          message.channel.send(joke)
        })
    },
};