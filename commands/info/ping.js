const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment')
module.exports = {
    name: 'ping',
    aliases: ['p'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const dbping = await client.db.ping();
      const uptimed = moment
			.duration(client.uptime)
			.format('D [days], H [hours], m [minutes], s [seconds]');
      message.channel.send(
        new MessageEmbed()
        .setTitle(`Pong!`)
        .addFields({
          name: `Shard ${message.guild.shardID}`,
          value: `<:aneoTick:842630449200889856> Latency: ${message.guild.shard.ping}ms\n\n🕖 Uptime: ${uptimed}\n\n<:quickmongo:847767036314779708> Database Ping: ${dbping.average}ms\n\n<:shard:847781581635846175> Shard ${message.guild.shard.id} Ping: ${message.guild.shard.ping}ms`
        })
        .setColor('RANDOM')
      )
    }
}