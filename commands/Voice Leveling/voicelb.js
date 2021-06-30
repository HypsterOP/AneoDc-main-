const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')

module.exports = {
    name: 'voice-leaderboard',
    aliases: ['voice-lb'],
    description: 'Look at the voice leaderboard!',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const rawLeaderboard = await client.discordVoice.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most voice time in the current server.

if (rawLeaderboard.length < 1) return message.reply("Nobody's in leaderboard yet.");

const leaderboard = await client.discordVoice.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

const lb = leaderboard.map(e => `${e.position}. **${e.username}#${e.discriminator}**\nVoice Time: \`${ms(e.voiceTime.total || "0m")}\``); // We map the outputs.

message.channel.send(
  new MessageEmbed().setTitle(`Voice Leader Board for ${message.guild.name} | Top #10`)
  .setColor('#2F3136')
  .setDescription(lb.join('\n\n'))
);
    }
}