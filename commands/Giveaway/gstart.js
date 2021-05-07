const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require("ms")
const config = require("../../config.json")
module.exports = {
    name: 'gstart',
    aliases: ['start'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

        let giveawayChannel = message.mentions.channels.first();
        if(!giveawayChannel) return message.reply("You need to specify a channel!")

        let giveawayDuration = args[1];
        if(!giveawayDuration) return message.reply("You need to specify the duration of the giveaway!")

        let giveawayNumberWinners = args[2];
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return message.channel.send('You have to specify a valid number of winners!');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if(!giveawayPrize) return message.reply("You need to specify a prize!")

        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),

            prize: giveawayPrize,

            winnerCount: parseInt(giveawayNumberWinners),

            hostedBy: config.hostedBy ? message.author : null,

            messages: {
                giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })

        message.channel.send(`Giveaway started in ${giveawayChannel}!`);
    }
}