const { MessageEmbed } = require("discord.js")
const pm = require("pretty-ms")
const client = require("../index")
module.exports = {
    slash: true,
    testOnly: false,
    description: "Shows the bots ping!",
    callback: ({  }) => {
        const eesfdsf = new MessageEmbed()
        .setTitle(`🏓 Pong!`)
        .addFields({
          name: " <a:Discord:840220428025856030> Api Ping",
          value: `${client.ws.ping} ms`
        })
        .setColor('RANDOM')

        return eesfdsf
    }
}