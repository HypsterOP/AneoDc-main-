const { Client, Message, MessageEmbed } = require('discord.js');
let Discord = require('discord.js');
module.exports = {
    name: 'ytchannel-info',
    aliases: ['ytchinfo'],
    description: 'Get the information about a youtube channel.',
    usage: ' ',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let prefix = await client.prefix(message);
let ChannelLink = args[0];
        if(!ChannelLink) return message.reply(`:x: Usage: \`${prefix}channelinfo <LINK>\``)
        client.YTP.getChannelInfo(ChannelLink).then(Channel => {
            let embed = new Discord.MessageEmbed()
                .setTitle(Channel.name)
                .setURL(Channel.url)
                .setColor("RED")
                .addField("**Subsriber Count:**", "`" + Channel.subscribers + "`")
                .addField("**Tags:**", Channel.tags.map(t=>`\`${t}\``).join(",  "))
                .addField("**Unlisted:**", Channel.unlisted ? "✅" : "❌", true)
                .addField("**Family Safe:**", Channel.familySafe ? client.yes : client.error, true)
                .setFooter("ID: " + Channel.id)
                .setImage(Channel.bannerURL?.url)
                .setDescription(String(Channel.description).substr(0, 1500))
                //Send the Message
            message.channel.send({embed: embed}).then(msg=>msg.react("👍"))
        }).catch(e=>{
            console.log(e);
            message.reply(`${e.message ? e.message : e}`, {code: "js"})
        })
    }
}