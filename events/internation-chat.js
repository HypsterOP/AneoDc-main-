const client = require("../index")
const { MessageEmbed } = require("discord.js");
const db = require("../models/Interantionnal-chat")

client.on("message", (message) => {
    if(message.author.bot) return;
    db.findOne({ Channel: message.channel.id, Activated: true }, async(err, data) => {
        if(data) {
            db.find({ Activated: true }, async(err, data) => {
                data.map(({ Channel }) => {
                    if(Channel === message.channel.id) return;

                    client.channels.cache.get(Channel).send(
                        new MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(message.content)
                        .setFooter(`Message From ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                        .setColor("RANDOM")
                        .setTimestamp()
                    )
                })
            })
        }
    })
})