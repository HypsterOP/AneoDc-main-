const { MessageEmbed } = require("discord.js")
const pm = require('pretty-ms');


module.exports = {
  name: 'ping',
  aliases: [],
  category: ['Info'],
  inVoiceChannel: false,
  utilisation: '{prefix}ping',


  run: async(client, message, args) => {

   const msg = await message.channel.send("Pinging...");

    const botLatency = pm(msg.createdTimestamp - message.createdTimestamp)
    const shardLatency = pm(message.guild.shard.ping);
    
    const embed = new MessageEmbed()
      .setAuthor('🏓Pong!')
      .addFields({
          name: 'Message Latency:',
          value: `${botLatency}`,
          inline: true
        }, {
          name: `Shard | ${message.guild.shard.id} Latency:`,
          value: `${shardLatency}`,
          inline: true
        }, {
            name: 'Websocket ping:',
            value: `${client.ws.ping}`,
            inline: true
        })
    .setColor('RANDOM')

    await msg.delete()
    message.channel.send(embed)
  }
}