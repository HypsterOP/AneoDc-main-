const { Client, Message, MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
  name: 'slowmode',
  description: 'use h!slowmode again to remove the slow mode!',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
    if(!args[0]) {
        message.channel.setRateLimitPerUser(0);
        message.channel.send('The slow mode has been set to default aka 0s')

    }

    const raw = args[0];
    const milliseconds = ms(raw);

    if(isNaN(milliseconds)) return message.channel.send(`That is not a number!`)

    if(milliseconds < 1000) return message.channel.send(`The minimum slowmode time is 1 second.`);

    message.channel.setRateLimitPerUser(milliseconds / 1000);
    message.channel.send(
        `The slowmode for this channel is now set to ${ms(milliseconds, {
            long: true
        })}`
    )
  },
};