const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../config.json')
module.exports = {
    name: 'stop',
    aliases: ['st', 'sto'],
    description: 'Stops the music',
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
                .setTitle(`${config.femoji} | I am not playing anything`)
                .setDescription(`The Queue is empty`)
              );
            if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
              return message.channel.send(new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle(`${config.femoji} | Please join **my** Channel first`)
                .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
              );
      
            message.channel.send(new MessageEmbed()
              .setColor(`RANDOM`)
              .setTitle("⏹ Stopped playing Music and left your Channel")
            ).then(msg=>msg.delete({timeout: 4000}).catch(e=>console.log(e.message)))
      
            client.distube.stop(message);
          } catch (e) {
              console.log(String(e.stack))
              return message.channel.send(new MessageEmbed()
                  .setColor(`RANDOM`)
                  .setTitle(`${config.femoji} | An error occurred`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
    }
}