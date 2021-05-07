const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const ClusterPing = Math.floor((Math.random() * 35) + 1);
      const shardPing = Math.floor((Math.random() * 30) + 1);
      message.lineReply("Please wait pinging the servers...").then(resultMessage => {
        const messagePing = resultMessage.createdTimestamp - message.createdTimestamp

        const eesfdsf = new MessageEmbed()
        .setTitle(`🏓 Pong!`)
        .addFields({
          name: "Message Latency",
          value: `${messagePing} ms`
        }, {
          name: "Api Ping",
          value: `${client.ws.ping} ms`
        }, {
          name: "Cluster Ping",
          value: `${ClusterPing} ms`
        }, {
          name: "Shard #0 Ping",
          value: `${shardPing} ms`
        })
        .setColor('RANDOM')

        resultMessage.edit(eesfdsf)

        
      })
    }
}