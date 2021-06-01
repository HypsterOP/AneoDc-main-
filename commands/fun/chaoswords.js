const { Client, Message, MessageEmbed } = require('discord.js');
const { ChaosWords } = require('weky');
var randomwords = require('random-words');
module.exports = {
	name: 'chaos-words',
	aliases: ['chaos'],
	description: 'Guess the chaos word!',
	usage: '',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const randomw = randomwords(2);
        await new ChaosWords({
            message: message,
            maxTries: 5,
            charGenerated: 20,
            words: randomw, 
            embedTitle: 'Chaos words challenge!',
            embedFooter: 'Find the words in the sentence!',
            embedColor: 'RANDOM'
        }).start()
	},
};
