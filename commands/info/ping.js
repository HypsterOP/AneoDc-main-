const { MessageEmbed } = require("discord.js")
const pm = require('pretty-ms');
const cooldown = new Set();

module.exports = {
  name: 'ping',
  aliases: [],
  category: ['Info'],
  inVoiceChannel: false,
  utilisation: '{prefix}ping',


  run: async(client, message, args) => {

    if(cooldown.has(message.author.id)) {
      message.reply(`You are on a 1 second cooldown!`)
    } else {

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

      cooldown.add(message.author.id);
      setTimeout(() => {
        cooldown.delete(message.author.id)
      }, 1000);
    }
  }
}