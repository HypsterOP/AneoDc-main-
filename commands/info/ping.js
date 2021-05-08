const { Client, Message, MessageEmbed } = require('discord.js');
const pm = require("pretty-ms")
module.exports = {
    name: 'ping',
    aliases: ['p'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const shardPing = pm(message.guild.shard.ping)
      message.lineReply("Please wait pinging the servers...").then(resultMessage => {
        const messagePing = resultMessage.createdTimestamp - message.createdTimestamp

        const eesfdsf = new MessageEmbed()
        .setTitle(`🏓 Pong!`)
        .addFields({
          name: " <a:Success:821621580215877644> Message Latency",
          value: `${messagePing} ms`
        }, {
          name: " <a:Discord:840220428025856030> API Ping",
          value: `${client.ws.ping} ms`
        }, {
          name: "<:discordjs:838285692676735007> Shard | #0 Ping",
          value: `${shardPing}`
        })
        .setColor('RANDOM')

        resultMessage.edit(eesfdsf)

        
      })
    }
}