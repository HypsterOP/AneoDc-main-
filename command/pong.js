const { MessageEmbed } = require("discord.js")
const client = require("../index")

module.exports = {
    slash: true,
    testOnly: true,
    description: "TEST",
    callback: ({  }) => {
        let embed = new MessageEmbed()
        .setTitle("Pong!")
        .setColor("RANDOM")
        .setDescription(`Websocket Ping ${client.ws.ping}`)

        return embed
    }
}