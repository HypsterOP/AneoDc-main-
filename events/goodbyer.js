const client = require('../index')
const Schema = require('../models/goodbyeChannel')
const canvas = require('discord-canvas')
const { MessageAttachment } = require('discord.js')
const Discord = require('discord.js')

client.on('guildMemberRemove', async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(err, data) => {
        if(!data) return;
        const user = member.user;
        const image = await new canvas.Goodbye()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(user.displayAvatarURL({ format: "png" }))
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setBackground("https://st2.depositphotos.com/1265894/10726/i/950/depositphotos_107269762-stock-photo-winter-ice-frost-frozen-background.jpg")
        .toAttachment();

        const attachment = new Discord.MessageAttachment(
            (await image).toBuffer(),
             "googdbye-image.png"
             );

             const channel = member.guild.channels.cache.get(data.Channel);
             channel.send(attachment)
    })
})