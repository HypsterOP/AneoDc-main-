const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
const { delay } = require('../../handlers/functions')
module.exports = {
    name: 'resume',
    aliases: ['res', 're', 'resu'],
    description: 'Resumes the song',
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
                .setColor(`RANDOM`)
                
                .setTitle(`${config.femoji} | Please join a Channel first`)
              );
            if(!client.distube.getQueue(message))
              return message.channel.send(new MessageEmbed()
                .setColor(`RANDOM`)
                
                .setTitle(`${config.femoji} | I am not playing Something`)
                .setDescription(`The Queue is empty`)
              );
            if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
              return message.channel.send(new MessageEmbed()
                .setColor(`RANDOM`)
                
                .setTitle(`${config.femoji} | Please join **my** Channel first`)
                .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
              );
            if(client.distube.isPlaying(message))
              return message.channel.send(new MessageEmbed()
                .setColor(`RANDOM`)
                
                .setTitle(`${config.femoji} | Cannot resume the Song`)
                .setDescription(`It's not paused, so I cant!`)
              );
            message.channel.send(new MessageEmbed()
              .setColor(`RANDOM`)
              
              .setTitle("▶ Resumed the Song")
            ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
      
            client.distube.resume(message);
            //those 4 lines with the delay, fixes the bug that it doesnt resume by repausing and reresuming ;)
            await delay(100);
            client.distube.pause(message);
            await delay(100);
            client.distube.resume(message);
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send(new MessageEmbed()
                  .setColor(`RANDOM`)
                  
                  .setTitle(`${config.femoji} | An error occurred`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
    }
}