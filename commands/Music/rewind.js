const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const ee = require('../../config.json')
const { format } = require('../../handlers/functions')
module.exports = {
    name: 'rewind',
    aliases: ['rw'],
    description: 'Rewind a song',
    usage: '<time>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const prefix = await client.prefix(message)
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
            if(!args[0])
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${config.femoji} | You didn't provide a Time you want to rewind to!`)
                .setDescription(`Usage: \`${prefix}rewind 10\``)
              )
      
            let queue = client.distube.getQueue(message);
            let seektime = queue.currentTime - Number(args[0]) * 1000;
            if(seektime < 0)
              seektime = 0;
            if(seektime >= queue.songs[0].duration * 1000 - queue.currentTime)
              seektime = 0;
      
            client.distube.seek(message, seektime);
      
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`👈 Rewinded for \`${args[0]} Seconds\` to: ${format(seektime)}`)
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