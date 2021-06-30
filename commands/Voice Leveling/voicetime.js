const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require('ms')
module.exports = {
    name: 'voice-time',
    aliases: ['voicet'],
    description: 'Track your voice time ;)',
    usage: '<@member>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.users.first() || message.author; // Grab the target.

const user = await client.discordVoice.fetch(target.id, message.guild.id); // Selects the target from the database.

if (!user) return message.channel.send("Seems like this user does not have any Voice Activity so far..."); // If there isnt such user in the database, we send a message in general.

message.channel.send(`> **${target.tag}** currently has ${ms(user.data.voiceTime.total)} of Total Voice Time!`); // We show the voice time. (OPTIONAL: You can also use the ms package here if you want it to be more concise.)
    }
}