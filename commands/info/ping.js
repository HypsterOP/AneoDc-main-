const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Returns latency and API ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping <a:Success:821621580215877644>  ${client.ws.ping}MS\nMessage Edit ping <a:Success:821621580215877644> ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            .setColor('BLUE')
            await message.channel.send(embed)
            msg.delete()

    }
}
