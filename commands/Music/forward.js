const { Client, Message, MessageEmbed } = require('discord.js');
const ee = require('../../config.json')
const config = require('../../config.json')
const { format } = require('../../handlers/functions')
module.exports = {
    name: 'forward',
    aliases: ['fwd', 'fw'],
    description: 'Skip the song forward',
    usage: '<time>',
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
                .setTitle(`${config.femoji} | I am not playing anything!`)
                .setDescription(`The Queue is empty`)
              );
            if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${config.femoji} | Please join **my** Channel first`)
                .setDescription(`I am in channel: \`${message.guild.me.voice.channel.name}\``)
              );
            if(!args[0])
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${config.femoji} | You didn't provided a Time you want to seek to!`)
                .setDescription(`Usage: \`${await client.prefix(message)}forward 10\``)
              )
      
            let queue = client.distube.getQueue(message);
            let seektime = queue.currentTime + Number(args[0]) * 1000;
            if(seektime < 0)
              seektime = queue.songs[0].duration * 1000;
            if(seektime >= queue.songs[0].duration * 1000)
              seektime = queue.songs[0].duration * 1000 - 1000;
      
            client.distube.seek(message, seektime);
      
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`⏩ Forwarded for \`${args[0]} Seconds\` to: ${format(seektime)}`)
            ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
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