const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const ee = require('../../config.json')
module.exports = {
    name: 'loop',
    aliases: ['lop', 'lo'],
    description: 'Loops the current song',
    usage: '',
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
                .setTitle(`${config.femoji} | You didn't provide a Loop method`)
                .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
              );
            let loopstate = args[0].toString();
            if (loopstate.toLowerCase() === "song") loopstate = "1";
            if (loopstate.toLowerCase() === "queue") loopstate = "2";
            if (loopstate.toLowerCase() === "off") loopstate = "0";
            if (loopstate.toLowerCase() === "track") loopstate = "1";
            if (loopstate.toLowerCase() === "q") loopstate = "2";
            if (loopstate.toLowerCase() === "qu") loopstate = "2";
            if (loopstate.toLowerCase() === "disable") loopstate = "0";
            
            loopstate = Number(loopstate);
            loopstates = {
              "0": "off",
              "1" : "song",
              "2": "queue"
            }
            if( 0 <= loopstate && loopstate <= 2){
              client.distube.setRepeatMode(message, parseInt(loopstate));
              message.channel.send(new MessageEmbed()
                .setColor(ee.color)
                .setFooter(ee.footertext,ee.footericon)
                .setTitle(`🔁 Changed Repeat mode to: \`${loopstates[loopstate]}\``)
              ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
            }
            else{
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${config.femoji} | You didn't provide a Loop method`)
                .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
              );
            }
      
      
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