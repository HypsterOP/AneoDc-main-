const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const ee = require('../../config.json')
const filters = [
    "clear",
    "lowbass",
    "bassboost",
    "purebass",
    "8D",
    "vaporwave",
    "nightcore",
    "phaser",
    "tremolo",
    "vibrato",
    "reverse",
    "treble",
    "normalizer",
    "surrounding",
    "pulsator",
    "subboost",
    "karaoke",
    "flanger",
    "gate",
    "haas",
    "mcompand"
  ]
module.exports = {
    name: 'filter',
    aliases: [''],
    description: 'Add a filter',
    usage: '<filter>',
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
                .setTitle(`${config.femoji} | Please add a Filtertype`)
                .setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nExample: \`${prefix}filter bassboost\``)
              );
              if(!filters.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase()))
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setFooter(ee.footertext, ee.footericon)
                  .setTitle(`${config.femoji} | Not a valid Filtertype`)
                  .setDescription(`Usage: \`${prefix}filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
                );
            client.distube.setFilter(message, args[0]);
      
            message.channel.send(new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext,ee.footericon)
              .setTitle(`✅ Successfully set Filter to: \`${args[0]}\``)
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