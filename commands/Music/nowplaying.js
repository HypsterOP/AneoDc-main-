const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const ee = require('../../config.json')
const { createBar, format } = require('../../handlers/functions')
module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    description: 'Shows the currently playing song',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try{
            const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
            if(!channel)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${config.femoji} | Please join a Channel first`)
              );
            if(!client.distube.getQueue(message))
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${config.femoji} | I am not playing anything`)
                .setDescription(`The Queue is empty`)
              );
            if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${config.femoji} | Please join **my** Channel first`)
                .setDescription(`Im in channel: \`${message.guild.me.voice.channel.name}\``)
              );
            let queue = client.distube.getQueue(message);
            let track = queue.songs[0];
            console.log(track)
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`Now playing :notes: ${track.name}`.substr(0, 256))
              .setURL(track.url)
              .setThumbnail(track.thumbnail)
              .addField("Views", `▶ ${track.views.toString()}`,true)
              .addField("Dislikes", `:thumbsdown: ${track.dislikes.toString()}`,true)
              .addField("Likes", `:thumbsup: ${track.likes.toString()}`,true)
              .addField("Duration: ", createBar(queue.currentTime))
            )
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${config.femoji} | An error occurred`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
    }
}